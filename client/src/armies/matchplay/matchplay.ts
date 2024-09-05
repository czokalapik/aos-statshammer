import { IArmy } from 'types/army';

import FS from './Fyreslayers.json';
import SLAANESH from './HedonitesOfSlaanesh.json';
import IDONETH from './IdonethDeepkin.json';
import KB from './Kruleboyz.json';
import NURGLE from './MaggotkinOfNurgle.json';
import OGOR from './OgorMawtribes.json';
import STD from './SlavesToDarkness.json';
import SOB from './SonsOfBehemath.json';
import SBG from './SoulblightGravelords.json';
import SCE from './Stormcast.json';
import SYLV from './Sylvaneth.json';

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

const MaggotkinOfNurgle: any = {
  ...NURGLE,
  faction: 'Maggotkin of Nurgle',
  label: '',
};

const OgorMawtribes: any = {
  ...OGOR,
  faction: 'Ogor Mawtribes',
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
  Fyreslayers,
  HedonitesOfSlaanesh,
  IdonethDeepkin,
  Kruleboyz,
  MaggotkinOfNurgle,
  OgorMawtribes,
  SlavesToDarkness,
  SonsOfBehemath,
  SoulblightGravelords,
  Stormcast,
  Sylvaneth,
];

export default MATCHPLAY;
