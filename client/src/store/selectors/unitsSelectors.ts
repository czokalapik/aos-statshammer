import _ from 'lodash';
import { createSelector } from 'reselect';
import { IModifierInstance, IModifierInstanceParameter } from 'types/modifiers';
import type { IStore } from 'types/store';
import type { IWeaponProfileParameter } from 'types/unit';

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

const sanitizeModifier = (modifier: IModifierInstance) => {
  const { id, active, options, uuid } = modifier;
  return { id, active, options, uuid };
};

const sanitizeWeaponProfile = (wp: IWeaponProfileParameter) => {
  const { active, attacks, damage, modifiers, num_models, rend, to_hit, to_wound, name } = wp;
  return {
    active,
    attacks,
    damage,
    modifiers: modifiers.map((m) => sanitizeModifier(m)),
    num_models: Number(num_models),
    rend: Number(rend),
    to_hit: Number(to_hit),
    to_wound: Number(to_wound),
    name,
  };
};

const sanitizeUnit = ({
  name,
  active,
  reinforced,
  points,
  weapon_profiles,
  health,
  models,
  save,
  modifiers,
}) => ({
  name,
  points: Number(points),
  health: Number(health),
  models: Number(models),
  save: Number(save),
  active,
  reinforced,
  modifiers: modifiers.map(sanitizeModifier),
  weapon_profiles: weapon_profiles.map(sanitizeWeaponProfile),
});

export interface ISanitizedUnit {
  name: string;
  points: number;
  health: number;
  models: number;
  save: number;
  active: boolean;
  reinforced: boolean;
  modifiers?: IModifierInstanceParameter[];
  weapon_profiles: IWeaponProfileParameter[];
}
export const getSanitizedActiveUnitsSelector = createSelector(activeUnitsSelector, (units) =>
  _.memoize((): ISanitizedUnit[] => units.map(sanitizeUnit)),
);
export const getSanitizedAllUnitsSelector = createSelector(unitsSelector, (units) =>
  _.memoize((): ISanitizedUnit[] => units.map(sanitizeUnit)),
);
