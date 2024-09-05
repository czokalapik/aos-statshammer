import { IArmy } from 'types/army';

import COS_CC from './CitiesOfSigmar-CasteliteCompany.json';
import DOK_HT from './DaughterOfKhaine-HeartflayerTroupe.json';
import FEC_CR from './FleshEaterCourts-CarrionRetainers.json';
import FYRESLAYERS_SA from './Fyreslayers-SagaAxeband.json';
import GLOOM_BMM from './GlomspiteGitz-BadMoonMadmob.json';
import IDONETH_SH from './IdonethDeepkin-SoulraidHunt.json';
import KHORNE_BGP from './Khorne-BloodboundGorePilgrims.json';
import KRUELBOYZ from './Kruelboyz-SwampskulkaGang.json';
import OBR from './OssiarchBonereapers-Tithe-reaperEchelon.json';
import SCE_VB from './SCE-Vigilant Brotherhood.json';
import SERAPHON from './Seraphon-StarscaleWarhost.json';
import SKAVENS_GC from './Skavens-Gnawfeast Clawpack.json';
import SLAANESH_BotLD from './Slaanesh-BladesOfTheLuridDream.json';
import STD from './SlavesToDarkness-BloodwindLegion.json';
import SYLVANETH from './Sylvaneth-BitterbarkCopse.json';
import TZEENCH_FC from './Tzeentch-FluxbladeCoven.json';

const Tzeentch_FluxbladeCoven: IArmy = {
  ...TZEENCH_FC,
  faction: 'Tzeentch',
  label: 'Fluxblade Coven',
};

const Fyreslayers_SagaAxeband: IArmy = {
  ...FYRESLAYERS_SA,
  faction: 'Fyreslayers',
  label: 'Saga Axeband',
};

const FleshEaterCourts_CarrionRetainers: IArmy = {
  ...FEC_CR,
  faction: 'Flesh Eater Courts',
  label: 'Carrion Retainers',
};

const Khorne_BloodboundGorePilgrims: IArmy = {
  ...KHORNE_BGP,
  faction: 'Blades of Khorne',
  label: 'Bloodbound Gore Pilgrims',
};

const DaughterOfKhaine_HeartflayerTroupe: any = {
  ...DOK_HT,
  faction: 'Daughter of Khaine',
  label: 'Heartlayer Troupe',
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

const IdonethSH: IArmy = {
  ...IDONETH_SH,
  faction: 'Idoneth Deepkin',
  label: 'Soulraid Hunt',
};

const GloomspiteBMM: IArmy = {
  ...GLOOM_BMM,
  faction: 'Gloomspite Gitz',
  label: 'Bad Moon Madmob',
};

const SPEARHEADS: IArmy[] = [
  Cos_CasteliteCompany,
  DaughterOfKhaine_HeartflayerTroupe,
  FleshEaterCourts_CarrionRetainers,
  Fyreslayers_SagaAxeband,
  GloomspiteBMM,
  IdonethSH,
  Khorne_BloodboundGorePilgrims,
  KruelboyzSG,
  OssiarchTE,
  SCEVigilantBrotherhood,
  SKAVENSGnawfeastClawpack,
  STDBL,
  SeraphonSW,
  Slaanesh_BladesOfTheLuridDream,
  SylvanethBC,
  Tzeentch_FluxbladeCoven,
];

export default SPEARHEADS;
