import {Lecture} from './lecture';
import {User} from './User';

export interface TeachingMaterial {

  idTeachingMaterial?: number;
  lecture?: Lecture;
  user?: User;
  name: string;
  type: string;
  link: string;
}
