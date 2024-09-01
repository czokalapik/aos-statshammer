import { IArmy } from 'types/army';

import SLAANESH from './HedonitesOfSlaanesh.json';
import IDONETH from './IdonethDeepkin.json';
import NURGLE from './MaggotkinOfNurgle.json';
import STD from './SlavesToDarkness.json';
import SOB from './SonsOfBehemath.json';
import SBG from './SoulblightGravelords.json';
import SCE from './Stormcast.json';
import SYLV from './Sylvaneth.json';
import OGOR from './OgorMawtribes.json';

const HedonitesOfSlaanesh: any = {
  ...SLAANESH,
  faction: 'Hedonites of Slaanesh',
  label: '',
};

const SonsOfBehemath: IArmy = {
  ...SOB,
  faction: 'Sons of Behemat',
  label: '',
};

const MaggotkinOfNurgle: any = {
  ...NURGLE,
  faction: 'Maggotkin of Nurgle',
  label: '',
};

const Sylvaneth: any = {
  ...SYLV,
  faction: 'Sylvaneth',
  label: '',
};

const Stormcast: any = {
  ...SCE,
  faction: 'Stormcast Eternals',
  label: 'incomplete',
};

const SoulblightGravelords: any = {
  ...SBG,
  faction: 'Soulblight Gravelords',
  label: '',
};

const SlavesToDarkness: any = {
  ...STD,
  faction: 'Slaves to Darkness',
  label: '',
};

const IdonethDeepkin: any = {
  ...IDONETH,
  faction: 'Idoneth Deepkin',
  label: '',
};

const OgorMawtribes: any = {
  ...OGOR,
  faction: 'Ogor Mawtribes',
  label: '',
};

const MATCHPLAY: IArmy[] = [
  HedonitesOfSlaanesh,
  IdonethDeepkin,
  MaggotkinOfNurgle,
  OgorMawtribes,
  SlavesToDarkness,
  SonsOfBehemath,
  SoulblightGravelords,
  Stormcast,
  Sylvaneth,
];

export default MATCHPLAY;
