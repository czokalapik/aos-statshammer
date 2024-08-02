import { IArmy } from 'types/army';

import KRUELBOYZ from './Kruelboyz-SwampskulkaGang.json';
import OBR from './OssiarchBonereapers-Tithe-reaperEchelon.json';
import SCE_VB from './SCE-Vigilant Brotherhood.json';
import SERAPHON from './Seraphon-StarscaleWarhost.json';
import SKAVENS_GC from './Skavens-Gnawfeast Clawpack.json';
import STD from './SlavesToDarkness-BloodwindLegion.json';
import SYLVANETH from './Sylvaneth-BitterbarkCopse.json';

const SCEVigilantBrotherhood: IArmy = {
  ...SCE_VB,
  faction: 'Stormcast Eternals',
  label: 'Vigilant Brotherhood',
};

const SKAVENSGnawfeastClawpack: IArmy = {
  ...SKAVENS_GC,
  faction: 'Skavens',
  label: 'Gnawfeast Clawpack',
};

const KruelboyzSG: IArmy = {
  ...KRUELBOYZ,
  faction: 'Kruelboyz',
  label: 'Swampskulka Gang',
};

const SeraphonSW: IArmy = {
  ...SERAPHON,
  faction: 'Seraphon',
  label: 'Starscale Warhost',
};

const OssiarchTE: IArmy = {
  ...OBR,
  faction: 'Ossiarch Bonereapers',
  label: 'Tithe-reaper Echelon',
};

const STDBL: IArmy = {
  ...STD,
  faction: 'Slaves to Darkness',
  label: 'Bloodwind Legion',
};

const SylvanethBC: IArmy = {
  ...SYLVANETH,
  faction: 'Sylvaneth',
  label: 'Bitterbark Copse',
};

const SPEARHEADS: IArmy[] = [
  SCEVigilantBrotherhood,
  SKAVENSGnawfeastClawpack,
  KruelboyzSG,
  SeraphonSW,
  OssiarchTE,
  STDBL,
  SylvanethBC,
];

export default SPEARHEADS;
