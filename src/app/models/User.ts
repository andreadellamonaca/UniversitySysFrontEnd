import {UserType} from './user-type';
import {StudyCourse} from './study-course';
import {Teaching} from './teaching';

export interface User {

  email?: string;
  idUser?: number;
  name?: string;
  password?: string;
  studycourse?: StudyCourse;
  surname?: string;
  usertype?: UserType;
  courseYear?: number;
  teachinglist?: Teaching[];
}
