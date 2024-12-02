import store from 'store';
import {
  getAllFactionsUnits,
  getSanitizedActiveUnitsSelector,
  getSanitizedTargetSelector,
  statsPer100Points,
} from 'store/selectors';
import { statsStore } from 'store/slices';

import type { TDispatch } from './api.types';
import StatsController from './core/controllers/statsController';

export const fetchStatsCompare = (rankings:boolean) => async (dispatch: TDispatch) => {
  dispatch(statsStore.actions.fetchStatsPending());
  const state = store.getState();
  const units = rankings ? getAllFactionsUnits(state) : getSanitizedActiveUnitsSelector(state)();
  const target = getSanitizedTargetSelector(state);
  const per100Points = statsPer100Points(state);
  if (!units) dispatch(statsStore.actions.fetchStatsSuccess({ results: [], effectiveHealthResults: [], rankings }));
  const data = { units, target, per100Points };

  const statController = new StatsController();

  const res = statController.compareUnits(data);
  console.log(`Units to compare:${data.units.length}`);

  dispatch(
    statsStore.actions.fetchStatsSuccess({
      results: res.saveResults,
      effectiveHealthResults: res.healthResults,
      rankings
    }),
  );
};
