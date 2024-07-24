import _ from 'lodash';
import { createSelector } from 'reselect';
import { IModifierInstanceParameter } from 'types/modifiers';
import type { IStore } from 'types/store';
import type { IWeaponProfile } from 'types/unit';

/** Get the current units state */
export const unitsSelector = (state: IStore) => state.units;

/** Retrieve a unit by its index in the array */
export const unitByIndexSelector = createSelector(unitsSelector, (units) =>
  _.memoize((index: number) => units[index]),
);

/** Retrieve the number of units in the current state */
export const numUnitsSelector = createSelector(unitsSelector, (units) => units.length);

/** Retrieve a units index by its UUID field */
export const unitIndexByUuidSelector = createSelector(unitsSelector, (units) =>
  _.memoize((uuid: string) => units.findIndex((unit) => unit.uuid === uuid)),
);

/** Retrieve a unit by its UUID field */
export const unitByUuidSelector = createSelector(unitsSelector, unitIndexByUuidSelector, (units, findIndex) =>
  _.memoize((uuid: string) => units[findIndex(uuid)]),
);

export const activeUnitsSelector = createSelector(unitsSelector, (units) =>
  units
    .filter((unit) => unit.active)
    .map((unit) => ({
      ...unit,
      weapon_profiles: unit.weapon_profiles
        .filter((profile) => profile.active)
        .map((profile) => ({
          ...profile,
          modifiers: (profile.modifiers ?? []).filter((mod) => mod.active ?? true),
        })),
      modifiers: unit.modifiers.filter((mod) => mod.active),
    }))
    .filter(({ weapon_profiles }) => weapon_profiles && weapon_profiles?.length),
);

/** Retrieve a list of the unit names */
export const unitNamesSelector = createSelector(activeUnitsSelector, (units) =>
  units.map(({ name }) => name),
);

export interface ISanitizedUnit {
  name: string;
  points: number;
  health: number;
  models: number;
  save: number;
  modifiers?: IModifierInstanceParameter[];
  weapon_profiles: IWeaponProfile[];
}
export const getSanitizedUnitsSelector = createSelector(activeUnitsSelector, (units) =>
  _.memoize((useUuidAsName: boolean): ISanitizedUnit[] =>
    units.map(({ uuid, name, points, weapon_profiles, health, models, save, modifiers }) => ({
      name: useUuidAsName ? uuid : name,
      points,
      health,
      models,
      save,
      modifiers,
      weapon_profiles,
    })),
  ),
);
