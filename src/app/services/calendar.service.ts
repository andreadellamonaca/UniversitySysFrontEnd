import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Calendar} from '../models/calendar';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  calendarurl = 'http://localhost:8080/Project_university/calendar';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(this.calendarurl + '/getAll');
  }

  save(c: Calendar): Observable<Calendar> {
    return this.http.post(this.calendarurl + '/save', c, {headers});
  }

  getCalendarsByIdStudyCourse(id: number): Observable<Calendar[]> {
    return this.http.get<Calendar[]>(this.calendarurl + '/getCalendarsByIdStudycourse/' + id);
  }
}
