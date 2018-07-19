import {Classroom} from './classroom';
import {User} from './User';

export interface Report {

  idReport: number;
  classroom: Classroom;
  userBySecretaryIdSecretary: User;
  userByProfessorIdProfessor: User;
  state: string;
}
