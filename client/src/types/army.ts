import { IUnitParameter } from './unit';

export enum Faction {
  List = 'User defined', // used for compilation when not targeting a particular faction
  BoC = 'Beasts of Chaos', // index missing
  Khorne = 'Blades of Khorne',
  Bonesplitterz = 'Bonesplitterz', // index missing
  CoS = 'Cities of Sigmar', // index missing
  DoK = 'Daughters of Khaine',
  Tzeentch = 'Disciples of Tzeentch',
  FEC = 'Flesh-eater Courts',
  FS = 'Fyreslayers',
  Gitz = 'Gloomspite Gitz', // index missing
  Slaanesh = 'Hedonites of Slaanesh',
  Idoneth = 'Idoneth Deepkin',
  IJ = 'Ironjawz',
  KO = 'Kharadron Overlords',
  Kruleboyz = 'Kruleboyz',
  LRL = 'Lumineth Realm-lords',
  Nurgle = 'Maggotkin of Nurgle',
  NH = 'Nighthaunt',
  Ogor = 'Ogor Mawtribes',
  OBR = 'Ossiarch Bonereapers',
  Seraphon = 'Seraphon', // index missing
  Skaven = 'Skaven', // BT
  StD = 'Slaves to Darkness',
  SoB = 'Sons of Behemat',
  SbG = 'Soulblight Gravelords',
  SCE = 'Stormcast Eternals',
  Sylvaneth = 'Sylvaneth',
}

export interface IArmy {
  units: IUnitParameter[];
  faction: Faction;
  label: string;
}
