import {Teaching} from './teaching';
import {Classroom} from './classroom';
import {TeachingMaterial} from './teaching-material';

export interface Lecture {

  idLecture?: number;
  classroom?: Classroom;
  teaching?: Teaching;
  date?: Date;
  starttime?: string;
  endtime?: string;
  description?: string;
  tmaterials?: TeachingMaterial[];
  hide_material?: boolean;
  av_rating?: number;
}
