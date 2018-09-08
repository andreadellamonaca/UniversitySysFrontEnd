import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Classroom} from '../models/classroom';
import {Variables} from '../Variables';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  classroomurl = `${Variables.ServerURL}/classroom`

  constructor(private http: HttpClient) { }

  getAll(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.classroomurl + '/getAll');
  }

  save(c: Classroom): Observable<Classroom> {
    return this.http.post(this.classroomurl + '/save', c, {headers});
  }
}
