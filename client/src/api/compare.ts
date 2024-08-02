import store from 'store';
import {
  getSanitizedActiveUnitsSelector,
  getSanitizedTargetSelector,
  statsPer100Points,
} from 'store/selectors';
import { statsStore } from 'store/slices';

import type { TDispatch } from './api.types';
import StatsController from './core/controllers/statsController';

export const fetchStatsCompare = () => async (dispatch: TDispatch) => {
  dispatch(statsStore.actions.fetchStatsPending());
  const state = store.getState();
  const units = getSanitizedActiveUnitsSelector(state)();
  const target = getSanitizedTargetSelector(state);
  const per100Points = statsPer100Points(state);
  if (!units) dispatch(statsStore.actions.fetchStatsSuccess({ results: [], effectiveHealthResults: [] }));
  const data = { units, target, per100Points };

  const statController = new StatsController();

  const res = statController.compareUnits(data);

  dispatch(
    statsStore.actions.fetchStatsSuccess({
      results: res.saveResults,
      effectiveHealthResults: res.healthResults,
    }),
  );
};
