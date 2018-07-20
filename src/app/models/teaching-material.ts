import {Lecture} from './lecture';
import {User} from './User';

export interface TeachingMaterial {

  idTeachingMaterial: number;
  lecture: Lecture;
  prof: User;
  name: string;
  type: string;
  link: string;
}
