import { IArmy } from 'types/army';

import KHORNE from './BladesOfKhorne.json';
import DOK from './DaughtersOfKhaine.json';
import FS from './Fyreslayers.json';
import SLAANESH from './HedonitesOfSlaanesh.json';
import IDONETH from './IdonethDeepkin.json';
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

const SonsOfBehemath: IArmy = {
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
  Fyreslayers,
  HedonitesOfSlaanesh,
  IdonethDeepkin,
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
