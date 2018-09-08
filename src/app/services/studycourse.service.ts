import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Report} from '../models/report';
import {StudyCourse} from '../models/study-course';
import {Variables} from '../Variables';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class StudycourseService {
  scurl = `${Variables.ServerURL}/studycourse`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<StudyCourse[]> {
    return this.http.get<StudyCourse[]>(this.scurl + '/getAll');
  }

  save(sc: StudyCourse): Observable<StudyCourse> {
    return this.http.post(this.scurl + '/save', sc, {headers});
  }

  getStudyCoursesByIdTeaching(id: number): Observable<StudyCourse[]> {
    return this.http.get<StudyCourse[]>(this.scurl + '/getStudycoursesByIdTeaching/' + id);
  }
}
