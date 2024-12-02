import MATCHPLAY from 'armies/matchplay/matchplay';
import SPEARHEADS from 'armies/spearheads/spearheads';
import { createSelector } from 'reselect';
import type { IStore } from 'types/store';
import { activeUnit } from './unitsSelectors';

const compareString = (a, b) => 0 - (a < b ? 1 : -1);
const compareArmy = (a, b) =>
  a.faction === b.faction ? compareString(a.label, b.label) : compareString(a.faction, b.faction);

/** Get the current target state */
export const battletomesSelector = (state: IStore) => state.battletomes;

export const mergedBattletomesSelector = createSelector(battletomesSelector, ({ battletomes }) =>
  [
    ...MATCHPLAY.filter((army) => !battletomes.find((btArmy) => army.faction === btArmy.faction)),
    ...battletomes,
  ].sort(compareArmy),
);

export const getAllFactionsUnits = createSelector(mergedBattletomesSelector, (armies) => armies
  .flatMap(army => army.units)
  .map(activeUnit)
);

export const spearheadSelector = createSelector(battletomesSelector, () => [...SPEARHEADS].sort(compareArmy));
