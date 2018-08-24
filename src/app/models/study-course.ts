import {Calendar} from './calendar';

export interface StudyCourse {

  idStudyCourse?: number;
  name?: string;
  description?: string;
  editform?: boolean;
  checked?: boolean;
  calendars?: Calendar[];
}
