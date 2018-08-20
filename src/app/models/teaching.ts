import {User} from './User';
import {StudyCourse} from './study-course';

export interface Teaching {

  idTeaching?: number;
  user?: User;
  name?: string;
  cfu?: number;
  studycourses?: StudyCourse[];
}
