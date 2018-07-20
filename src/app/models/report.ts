import {Classroom} from './classroom';
import {User} from './User';

export interface Report {

  idReport: number;
  classroom: Classroom;
  userBySecretaryIdSecretary: User;
  userByProfessorIdProfessor: User;
  problemDescription: string;
  note?: string;
  idReportStatus: number;
  hide?: boolean;
}
