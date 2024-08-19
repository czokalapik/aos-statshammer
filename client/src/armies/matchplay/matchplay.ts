import { IArmy } from 'types/army';

import SLAANESH from './HedonitesOfSlaanesh.json';
import NURGLE from './MaggotkinOfNurgle.json';
import SOB from './SonsOfBehemath.json';
import SCE from './Stormcast.json';
import SYLV from './Sylvaneth.json';

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

const MATCHPLAY: IArmy[] = [SonsOfBehemath, MaggotkinOfNurgle, Sylvaneth, Stormcast, HedonitesOfSlaanesh];

export default MATCHPLAY;
