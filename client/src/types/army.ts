import { IUnitParameter } from './unit';

export interface IArmy {
  units: IUnitParameter[];
  faction: string;
  label: string;
}
