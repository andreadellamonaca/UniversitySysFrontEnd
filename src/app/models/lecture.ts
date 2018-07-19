import {Teaching} from './teaching';
import {Classroom} from './classroom';

export interface Lecture {

  idLecture: number;
  classroom: Classroom;
  teaching: Teaching;
  date: Date;
  hour: string;
}
