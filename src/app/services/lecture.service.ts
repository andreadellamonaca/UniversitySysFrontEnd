import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lecture} from '../models/lecture';
import {Variables} from '../Variables';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class LectureService {
  lectureurl = `${Variables.ServerURL}/lecture`;

  constructor(private http: HttpClient) { }

  getByIdTeaching(idTeaching: number): Observable<Lecture[]> {
    return this.http.get<Lecture[]>(this.lectureurl + '/getLecturesByIdTeaching/' + idTeaching);
  }

  getByDate(date: Date): Observable<Lecture[]> {
    return this.http.get<Lecture[]>(this.lectureurl + '/getLecturesByDate/' + date);
  }

  save(l: Lecture): Observable<Lecture> {
    return this.http.post(this.lectureurl + '/save', l, {headers});
  }
}
