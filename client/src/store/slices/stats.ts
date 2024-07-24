import { createSlice } from '@reduxjs/toolkit';
import type { StatsResults, TResults } from 'types/stats';
import type { IStatsStore, TError } from 'types/store';
import { saveLabel } from 'utils/texts';

const INITIAL_STATE: IStatsStore = {
  pending: false,
  payload: [],
  damageResults: [],
  effectiveHealthResults: [],
  per100Points: false,
  error: null,
};

const fetchStatsPending = (state: IStatsStore) => {
  state.pending = true;
  state.error = null;
};

const fetchStatsSuccess = (
  state: IStatsStore,
  action: { payload: { results: TResults; effectiveHealthResults: StatsResults } },
) => {
  const { results, effectiveHealthResults } = action.payload;
  state.pending = false;
  state.error = null;
  state.payload = results;
  state.damageResults = results.map((result) => {
    return { label: saveLabel(result.save), ...result };
  });
  state.effectiveHealthResults = effectiveHealthResults;
};

const fetchStatsError = (state: IStatsStore, action: { payload: { error: TError } }) => {
  const { error } = action.payload;
  state.pending = false;
  state.error = error;
};

export const toggleStatsPer100Points = (state: IStatsStore) => {
  state.per100Points = !state.per100Points;
};

export const statsStore = createSlice({
  name: 'stats',
  initialState: INITIAL_STATE,
  reducers: {
    fetchStatsPending,
    fetchStatsSuccess,
    fetchStatsError,
    toggleStatsPer100Points,
  },
});
