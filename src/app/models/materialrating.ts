import {TeachingMaterial} from './teaching-material';
import {User} from './User';

export interface Materialrating {

  idMaterialSatisfaction: number;
  teachingmaterial: TeachingMaterial;
  user: User;
  level: number;
  note?: string;
}
