import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../models/notification';
import {Teaching} from '../models/teaching';
import {Lecture} from '../models/lecture';
import {Report} from '../models/report';
import {Variables} from '../Variables';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationurl = `${Variables.ServerURL}/notification`;

  constructor(private http: HttpClient) { }

  NewMaterialNotification(teaching: Teaching, l: Lecture): Observable<Notification> {
    const notification: Notification = {
      head: teaching.name,
      body: 'New material available for: ' + teaching.name,
      token_topic: teaching.name,
      type: 'Teaching Material',
      extra: JSON.stringify(l)
    };
    return this.http.post<Notification>(this.notificationurl + '/toTopic', notification, {headers});
  }

  ModLectureNotification(l: Lecture): Observable<Notification> {
    const notification: Notification = {
      head: l.teaching.name,
      body: 'Lecture of' + l.date + ' (' + l.starttime + '-' + l.endtime + ') has changed!',
      token_topic: l.teaching.name,
      type: 'Lecture',
      extra: JSON.stringify(l.teaching)
    };
    return this.http.post<Notification>(this.notificationurl + '/toTopic', notification, {headers});
  }

  ModReportNotification(r: Report): Observable<Notification> {
    const notification: Notification = {
      head: 'Your report: ' + r.problemDescription,
      body: 'Report about classroom' + r.classroom.name + ' has changed!',
      token_topic: r.userByProfessorIdProfessor.email,
      type: 'Report',
      extra: ''
    };
    return this.http.post<Notification>(this.notificationurl + '/toUser', notification, {headers});
  }
}
