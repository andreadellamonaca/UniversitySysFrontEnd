import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lecture} from '../models/lecture';

@Injectable({
  providedIn: 'root'
})
export class LectureService {
  lectureurl = 'http://localhost:8080/Project_university/lecture';

  constructor(private http: HttpClient) { }

  getByIdTeaching(idTeaching: number): Observable<Lecture[]> {
    return this.http.get<Lecture[]>(this.lectureurl + '/getLecturesByIdTeaching/' + idTeaching);
  }
}
