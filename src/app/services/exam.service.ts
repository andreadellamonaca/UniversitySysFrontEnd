import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Exam} from '../models/exam';
import {Observable} from 'rxjs';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  examurl = 'http://localhost:8080/Project_university/exam';

  constructor(private http: HttpClient) { }

  save(e: Exam): Observable<Exam> {
    return this.http.post(this.examurl + '/save', e, {headers});
  }

  getAll(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.examurl + '/getAll');
  }
}
