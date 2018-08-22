import {Classroom} from './classroom';
import {Teaching} from './teaching';

export interface Exam {

  idExam?: number;
  classroom?: Classroom;
  teaching?: Teaching;
  date?: Date;
  hour?: String;
}
