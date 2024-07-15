import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SaveTooltip } from 'components/GraphTooltips';
import ListItem from 'components/ListItem';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { statsStore } from 'store/slices';
import type { IStatsStore } from 'types/store';

import GraphWrapper from './GraphWrapper';

const useStyles = makeStyles(() => ({
  content: {},
}));

interface GraphListProps {
  stats: IStatsStore;
  unitNames: string[];
  graphMap: Map<string, any>;
}

const GraphList: React.FC<GraphListProps> = ({ stats, unitNames, graphMap }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const firstLoad = (!stats.payload || !stats.payload.length) && stats.pending;
  const xAxisFormatter = useCallback((value) => (value === 'None' ? '-' : `${value}+`), []);

  const handleStatsToggle = () => {
    dispatch(statsStore.actions.toggleStatsPer100Points());
  };

  return (
    <Typography component="div">
      {[...graphMap].map(([name, Graph]) => (
        <ListItem
          key={name}
          header={name}
          checked={stats.per100Points}
          onToggle={handleStatsToggle}
          collapsible
          loading={stats.pending}
          loaderDelay={firstLoad ? 0 : 350}
        >
          <GraphWrapper
            loading={(!stats.payload || !stats.payload.length) && stats.pending}
            numUnits={unitNames.length}
            error={Boolean(stats.error)}
          >
            <Graph
              title={`Average Damage ${stats.per100Points ? 'per 100 points' : ''}`}
              className={classes.content}
              data={stats.payload}
              series={unitNames}
              xAxis={{
                dataKey: 'save',
                tickFormatter: xAxisFormatter,
              }}
              yAxisLabel={{
                value: 'Average Damage',
                position: 'insideLeft',
              }}
              tooltip={<SaveTooltip />}
            />
          </GraphWrapper>
        </ListItem>
      ))}
    </Typography>
  );
};

export default GraphList;
