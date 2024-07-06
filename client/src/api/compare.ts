import store from 'store';
import { getSanitizedTargetSelector, getSanitizedUnitsSelector } from 'store/selectors';
import { statsStore } from 'store/slices';

import type { TDispatch } from './api.types';
import StatsController from './core/controllers/statsController';

export const fetchStatsCompare = () => async (dispatch: TDispatch) => {
  dispatch(statsStore.actions.fetchStatsPending());
  const state = store.getState();
  const units = getSanitizedUnitsSelector(state)(true);
  const target = getSanitizedTargetSelector(state);
  if (!units) dispatch(statsStore.actions.fetchStatsSuccess({ results: [] }));
  const data = { units, target };

  const statController = new StatsController();

  const res = statController.compareUnits(data);

  dispatch(statsStore.actions.fetchStatsSuccess({ results: res.results }));
};
