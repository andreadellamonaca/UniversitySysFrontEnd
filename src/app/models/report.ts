import {Classroom} from './classroom';
import {User} from './User';
import {ReportStatus} from './report-status';

export interface Report {

  idReport?: number;
  classroom?: Classroom;
  reportstatus?: ReportStatus;
  userBySecretaryIdSecretary?: User;
  userByProfessorIdProfessor?: User;
  problemDescription?: string;
  note?: string;
  hide?: boolean;
}
