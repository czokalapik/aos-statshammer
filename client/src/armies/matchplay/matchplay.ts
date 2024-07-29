import { IArmy } from 'types/army';

import SOB from './SonsOfBehemath.json';

const SonsOfBehemath: IArmy = {
  ...SOB,
  faction: 'Sons of Behemat',
  label: '',
};

const MATCHPLAY: IArmy[] = [SonsOfBehemath];

export default MATCHPLAY;
