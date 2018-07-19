import {Lecture} from './lecture';
import {User} from './User';

export interface TeachingMaterial {

  idTeachingMaterial: number;
  lecture: Lecture;
  prof: User;
  type: string;
  link: string;
}
