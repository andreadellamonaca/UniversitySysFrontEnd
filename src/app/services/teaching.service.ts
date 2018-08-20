import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Teaching} from '../models/teaching';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

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

  getTeachingsByIdProfessor(idProf: number): Observable<Teaching[]> {
    return this.http.get<Teaching[]>(this.teachingurl + '/getTeachingByIdProfessor/' + idProf);
  }

  save(t: Teaching): Observable<Teaching> {
    return this.http.post(this.teachingurl + '/save', t, {headers});
  }
}
