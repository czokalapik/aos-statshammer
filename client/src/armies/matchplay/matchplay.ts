import { IArmy } from 'types/army';

import NURGLE from './MaggotkinOfNurgle.json';
import SOB from './SonsOfBehemath.json';
import SYLV from './Sylvaneth.json';

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

const MATCHPLAY: IArmy[] = [SonsOfBehemath, MaggotkinOfNurgle, Sylvaneth];

export default MATCHPLAY;
