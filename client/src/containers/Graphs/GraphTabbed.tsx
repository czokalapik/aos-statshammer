import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SaveTooltip } from 'components/GraphTooltips';
import ListItem from 'components/ListItem';
import Tabbed from 'components/Tabbed';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { statsStore } from 'store/slices';
import type { IStatsStore } from 'types/store';

import GraphWrapper from './GraphWrapper';

const useStyles = makeStyles(() => ({
  tabs: {
    margin: '-1em -1em 0',
  },
  tab: {
    padding: '1em 1em 0',
  },
  content: {},
}));

interface GraphTabbedProps {
  stats: IStatsStore;
  unitNames: string[];
  graphMap: Map<string, any>;
}

const GraphTabbed: React.FC<GraphTabbedProps> = ({ stats, unitNames, graphMap }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const firstLoad = (!stats.payload || !stats.payload.length) && stats.pending;
  const xAxisFormatter = useCallback((value) => (value === 'None' ? '-' : `${value}+`), []);

  const handleStatsToggle = () => {
    dispatch(statsStore.actions.toggleStatsPer100Points());
  };

  return (
    <ListItem
      header="Graphs"
      checked={stats.per100Points}
      onToggle={handleStatsToggle}
      collapsible
      loading={stats.pending}
      loaderDelay={firstLoad ? 0 : 350}
    >
      <Tabbed
        className={classes.tabs}
        tabNames={[...graphMap.keys()]}
        tabContent={[...graphMap].map(([name, Graph]) => (
          <Paper square className={classes.tab}>
            <GraphWrapper
              loading={firstLoad}
              numUnits={unitNames.length}
              key={name}
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
          </Paper>
        ))}
      />
    </ListItem>
  );
};

export default GraphTabbed;
