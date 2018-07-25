import {Lecture} from './lecture';
import {User} from './User';

export interface Lecturerating {

  idlectureSatisfaction: number;
  lecture: Lecture;
  user: User;
  level: number;
  note: String;
}
