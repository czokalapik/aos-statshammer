import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { unitNamesSelector } from 'store/selectors';
import type { IStore } from 'types/store';

import Results from './Results';

interface IStatsProps {
  className?: string;
}

const Stats = ({ className }: IStatsProps) => {
  const stats = useSelector((state: IStore) => state.stats, _.isEqual);
  const unitNames = useSelector(unitNamesSelector, _.isEqual);

  return <Results stats={stats} unitNames={unitNames} className={className} />;
};

export default Stats;
