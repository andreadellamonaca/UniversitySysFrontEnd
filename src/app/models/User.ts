import {UserType} from './user-type';
import {StudyCourse} from './study-course';

export interface User {

  email?: string;
  idUser?: number;
  name?: string;
  password?: string;
  studycourse?: StudyCourse;
  surname?: string;
  usertype?: UserType;

}
