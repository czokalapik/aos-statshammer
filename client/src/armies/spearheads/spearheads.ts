import { IArmy } from 'types/army';

import KRUELBOYZ from './Kruelboyz-SwampskulkaGang.json';
import OBR from './OssiarchBonereapers-Tithe-reaperEchelon.json';
import SCE_VB from './SCE-Vigilant Brotherhood.json';
import SERAPHON from './Seraphon-StarscaleWarhost.json';
import SKAVENS_GC from './Skavens-Gnawfeast Clawpack.json';
import STD from './SlavesToDarkness-BloodwindLegion.json';
import SYLVANETH from './Sylvaneth-BitterbarkCopse.json';
import COS_CC from './CitiesOfSigmar-CasteliteCompany.json';
import SLAANESH_BotLD from './Slaanesh-BladesOfTheLuridDream.json';
import DOK_HT from './DaughterOfKhaine-HeartflayerTroupe.json';
import KHORNE_BGP from './Khorne-BloodboundGorePilgrims.json';

const Khorne_BloodboundGorePilgrims: IArmy = {
  ...KHORNE_BGP,
  faction: 'Blades of Khorne',
  label: 'Bloodbound Gore Pilgrims',
};

const DaughterOfKhaine_HeartflayerTroupe: any = {
  ...DOK_HT,
  faction: 'Daughter of Khaine',
  label:'Heartlayer Troupe',
};

const Slaanesh_BladesOfTheLuridDream: any = {
  ...SLAANESH_BotLD,
  faction: 'Hedonites of Slaanesh',
  label: 'Blades of the Lurid Dream',
};

const Cos_CasteliteCompany: IArmy = {
  ...COS_CC,
  faction: 'Cities of Sigmar',
  label: 'Castelite Company',
};

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
  Khorne_BloodboundGorePilgrims,
  DaughterOfKhaine_HeartflayerTroupe,
  Slaanesh_BladesOfTheLuridDream,
  Cos_CasteliteCompany,
  SCEVigilantBrotherhood,
  SKAVENSGnawfeastClawpack,
  KruelboyzSG,
  SeraphonSW,
  OssiarchTE,
  STDBL,
  SylvanethBC,
];

export default SPEARHEADS;
