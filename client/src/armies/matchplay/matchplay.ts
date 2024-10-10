import { IArmy } from 'types/army';

import KHORNE from './BladesOfKhorne.json';
import DOK from './DaughtersOfKhaine.json';
import TZEENCH from './DisciplesOfTzeentch.json';
import FEC from './Flesh-EaterCourts.json';
import FS from './Fyreslayers.json';
import SLAANESH from './HedonitesOfSlaanesh.json';
import IDONETH from './IdonethDeepkin.json';
import IJ from './Ironjaws.json';
import KO from './KharadronsOverlord.json';
import KB from './Kruleboyz.json';
import LRL from './LuminethRealm-Lords.json';
import NURGLE from './MaggotkinOfNurgle.json';
import NH from './NightHaunt.json';
import OGOR from './OgorMawtribes.json';
import OBR from './OssiarchBonereapers.json';
import STD from './SlavesToDarkness.json';
import SOB from './SonsOfBehemath.json';
import SBG from './SoulblightGravelords.json';
import SCE from './Stormcast.json';
import SYLV from './Sylvaneth.json';

const BladesOfKhorne: any = {
  ...KHORNE,
  faction: 'Blades of Khorne',
  label: '',
};

const DaughtersOfKhaine: any = {
  ...DOK,
  faction: 'Daughters of Khaine',
  label: '',
};

const DisciplesOfTzeentch: any = {
  ...TZEENCH,
  faction: 'Disciples of Tzeentch',
  label: '',
};

const FleshEaterCourts: any = {
  ...FEC,
  faction: 'Flesh-Eater Courts',
  label: '',
};

const Fyreslayers: any = {
  ...FS,
  faction: 'Fyreslayers',
  label: '',
};

const HedonitesOfSlaanesh: any = {
  ...SLAANESH,
  faction: 'Hedonites of Slaanesh',
  label: '',
};

const IdonethDeepkin: any = {
  ...IDONETH,
  faction: 'Idoneth Deepkin',
  label: '',
};

const Ironjaws: any = {
  ...IJ,
  faction: 'Iron Jaws',
  label: '',
};

const KharadronsOverlord: any = {
  ...KO,
  faction: 'Kharadrons Overlord',
  label: '',
};

const Kruleboyz: any = {
  ...KB,
  faction: 'Kruleboyz',
  label: '',
};

const LuminethRealmLords: any = {
  ...LRL,
  faction: 'Lumineth Realm-Lords',
  label: '',
};

const MaggotkinOfNurgle: any = {
  ...NURGLE,
  faction: 'Maggotkin of Nurgle',
  label: '',
};

const NightHaunt: any = {
  ...NH,
  faction: 'Nighthaunt',
  label: '',
};

const OgorMawtribes: any = {
  ...OGOR,
  faction: 'Ogor Mawtribes',
  label: '',
};

const OssiarchBonereapers: any = {
  ...OBR,
  faction: 'Ossiarch Bonereapers',
  label: '',
};

const SlavesToDarkness: any = {
  ...STD,
  faction: 'Slaves to Darkness',
  label: '',
};

const SonsOfBehemath: any = {
  ...SOB,
  faction: 'Sons of Behemat',
  label: '',
};

const SoulblightGravelords: any = {
  ...SBG,
  faction: 'Soulblight Gravelords',
  label: '',
};

const Stormcast: any = {
  ...SCE,
  faction: 'Stormcast Eternals',
  label: 'incomplete',
};

const Sylvaneth: any = {
  ...SYLV,
  faction: 'Sylvaneth',
  label: '',
};

const MATCHPLAY: IArmy[] = [
  BladesOfKhorne,
  DaughtersOfKhaine,
  DisciplesOfTzeentch,
  FleshEaterCourts,
  Fyreslayers,
  HedonitesOfSlaanesh,
  IdonethDeepkin,
  Ironjaws,
  KharadronsOverlord,
  Kruleboyz,
  LuminethRealmLords,
  MaggotkinOfNurgle,
  NightHaunt,
  OgorMawtribes,
  OssiarchBonereapers,
  SlavesToDarkness,
  SonsOfBehemath,
  SoulblightGravelords,
  Stormcast,
  Sylvaneth,
];

export default MATCHPLAY;
