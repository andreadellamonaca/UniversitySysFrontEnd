import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Teaching} from '../models/teaching';

@Injectable({
  providedIn: 'root'
})
export class TeachingService {
  teachingurl = 'http://localhost:8080/Project_university/teaching';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Teaching[]> {
    return this.http.get<Teaching[]>(this.teachingurl + '/getAll');
  }

  getTeachingDetail(name: string): Observable<Teaching> {
    return this.http.get<Teaching>(this.teachingurl + '/getTeachingByName/' + name);
  }
}
