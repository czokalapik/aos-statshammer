import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { StatsErrorCard } from 'components/ErrorCards';
import TableSkeleton from 'components/Skeletons/TableSkeleton';
import React from 'react';
import { ChartsLabels } from 'types/charts';
import { StatsResults } from 'types/stats';
import type { TError } from 'types/store';

const useStyles = makeStyles((theme) => ({
  table: {
    background: theme.palette.background.nested,
  },
  skeleton: {},
  container: {
    overflowX: 'auto',
  },
  sticky: {
    position: 'sticky',
    left: 0,
    zIndex: 11,
    backgroundColor: theme.palette.background.nested,
  },
  header: {
    fontWeight: theme.typography.fontWeightBold,
  },
  cell: {
    background: theme.palette.background.nested,
  },
  error: {
    width: 'auto',
    height: theme.spacing(30),
  },
}));

interface IResultsTableProps {
  loading: boolean;
  results: StatsResults;
  error: TError;
  unitNames: string[];
  chartsLabels: ChartsLabels;
  className?: string;
}

const ResultsTable: React.FC<IResultsTableProps> = ({
  error,
  loading,
  results,
  unitNames,
  chartsLabels,
  className,
}) => {
  const classes = useStyles();
  if (error) {
    return <StatsErrorCard className={classes.error} />;
  }
  if (loading) {
    return (
      <TableSkeleton
        dense
        rows={6}
        cols={unitNames && unitNames.length ? unitNames.length + 1 : 2}
        className={classes.skeleton}
      />
    );
  }
  const total = 'total';
  const unitNamesWithTotal = [...unitNames, total];
  const sum = (a,b) => a+b;
  const resultsWithTotal = results.map((result) => {
    return {...result, total:unitNames.map(name => result[name]).reduce(sum, 0).toFixed(2)};
  });
  return (
    <Paper className={classes.container}>
      <Table size="small" className={clsx(classes.table, className)}>
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell className={clsx(classes.sticky, classes.header)}>{chartsLabels.axisLabel}</TableCell>
            {unitNamesWithTotal.map((name) => (
              <TableCell align="right" key={name} className={classes.header}>
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {resultsWithTotal.map((result) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <TableRow key={result.label}>
                <TableCell className={clsx(classes.sticky, classes.cell)}>{result.label}</TableCell>
                {unitNamesWithTotal.map((name) => (
                  <TableCell key={name} align="right">
                    {result[name]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ResultsTable;
