import { makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from 'components/ListItem';
import Tabbed from 'components/Tabbed';
import ResultsTable from 'containers/Stats/ResultsTable';
import React, { useEffect, useState } from 'react';
import { statsStore } from 'store/slices';
import { useDispatch, useSelector } from 'react-redux';
import { statsSelector } from 'store/selectors';
import { averageDamageTitle, healthTitle } from 'utils/texts';
import { ChartsLabels } from 'types/charts';
import { fetchStatsCompare } from 'api';
import { Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import { useReadFromFile } from 'hooks';

const useStyles = makeStyles((theme: Theme) => ({
  app: {
    fontFamily: '"Roboto", sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.default,
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  tabs: {
    marginTop: 0,
    maxWidth: '100vw',
  },
  tab: {
    padding: theme.spacing(2),
    maxWidth: '1366px',
    margin: '0 auto',

    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      padding: theme.spacing(1),
    },
  },
}));

const Rankings = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const disclaimer = useReadFromFile('rankings-disclaimer.md')

  const stats = useSelector(statsSelector);
  const firstLoad = !stats?.payload?.length && stats?.pending;
  const top =50;
  const [sortByDamage, setSortByDamage] = useState('3+');
  const [sortByHealth, setSortByHealth] = useState('2');
  const damageResults = stats.rankingDamageResults && stats.rankingDamageResults.length>0 ? stats.rankingDamageResults.filter(result => result.label === sortByDamage)[0] : {};
  const unitNamesDamage = Object.keys(damageResults).filter(name => name!=='label').sort((a,b)=>Number(damageResults[b])-Number(damageResults[a]));
  const healthResults = stats.rankingEffectiveHealthResults && stats.rankingEffectiveHealthResults.length>0 ? stats.rankingEffectiveHealthResults.filter(result => result.label === sortByHealth)[0]: {};
  const unitNamesHealth = Object.keys(healthResults).filter(name => name!=='label').sort((a,b)=>Number(healthResults[b])-Number(healthResults[a]));

  useEffect(() => {
    dispatch(fetchStatsCompare(true));
  }, [dispatch]);

  const handleStatsToggle = () => {
    dispatch(statsStore.actions.toggleStatsPer100Points());
    dispatch(fetchStatsCompare(true));
  };
  
  const damageChartsLabel = (per100Points: boolean): ChartsLabels => {
    return {
      title: averageDamageTitle(per100Points),
      axisLabel: 'Save',
      valueLabel: 'Average Damage',
    };
  };

  const healthChartsLabel = (per100Points: boolean): ChartsLabels => {
    return {
      title: healthTitle(per100Points),
      axisLabel: 'Rend',
      valueLabel: 'Effective health',
    };
  };

  return (
    <div className={classes.app} id="rankings">
      <div className={classes.container}>
        <ReactMarkdown source={disclaimer}></ReactMarkdown>
        <Typography>Total units ranked: {unitNamesDamage.length}</Typography>
        {unitNamesDamage.length>0 &&(
        <Tabbed
          className={classes.tabs}
          tabNames={['Damage', 'Health']}
          tabContent={[
            <ListItem
            header={damageChartsLabel(stats.per100Points).title}
            collapsible
            loading={stats.pending}
            checked={stats.per100Points}
            onToggle={handleStatsToggle}
            loaderDelay={firstLoad ? 0 : 350}
          >
            <ResultsTable
              loading={stats.pending}
              error={stats.error}
              results={stats.rankingDamageResults}
              unitNames={unitNamesDamage}
              chartsLabels={damageChartsLabel(stats.per100Points)}
              showTotal={false}
              maxUnits={top}
              sortBy={sortByDamage}
              changeSort={(sort) => setSortByDamage(sort)}
            />
          </ListItem>,
            <ListItem
            header={healthChartsLabel(stats.per100Points).title}
            collapsible
            loading={stats.pending}
            checked={stats.per100Points}
            onToggle={handleStatsToggle}
            loaderDelay={firstLoad ? 0 : 350}
          >
            <ResultsTable
              loading={stats.pending}
              error={stats.error}
              results={stats.rankingEffectiveHealthResults}
              unitNames={unitNamesHealth}
              chartsLabels={healthChartsLabel(stats.per100Points)}
              showTotal={false}
              maxUnits={top}
              sortBy={sortByHealth}
              changeSort={(sort)=> setSortByHealth(sort)}
            />
          </ListItem>
          ]}
        />
      ) }
      </div>
    </div>
  );
};

export default Rankings;
