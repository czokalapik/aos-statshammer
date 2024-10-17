import { createSlice } from '@reduxjs/toolkit';
import { IArmy } from 'types/army';
import type { IBattletomesStore } from 'types/store';

const INITIAL_STATE: IBattletomesStore = {
  battletomes: [],
};

const addBattletome = (state: IBattletomesStore, action: { payload: { battletome: IArmy } }) => {
  state.battletomes = [
    ...state.battletomes.filter((army) => army.faction !== action.payload.battletome.faction),
    action.payload.battletome,
  ];
};

export const battletomesStore = createSlice({
  name: 'battletomes',
  initialState: INITIAL_STATE,
  reducers: {
    addBattletome,
  },
});
