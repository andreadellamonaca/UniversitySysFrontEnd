import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Classroom} from '../models/classroom';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  classroomurl = 'http://localhost:8080/Project_university/classroom';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.classroomurl + '/getAll');
  }
}
