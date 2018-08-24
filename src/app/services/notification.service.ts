import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../models/notification';
import {Teaching} from '../models/teaching';
import {Lecture} from '../models/lecture';
import {Report} from '../models/report';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationurl = 'http://localhost:8080/Project_university/notification';

  constructor(private http: HttpClient) { }

  NewMaterialNotification(teaching: Teaching): Observable<Notification> {
    const notification: Notification = {
      head: teaching.name,
      body: 'New material available for: ' + teaching.name,
      token_topic: teaching.name,
    };
    return this.http.post<Notification>(this.notificationurl + '/toTopic', notification, {headers});
  }

  ModLectureNotification(l: Lecture): Observable<Notification> {
    const notification: Notification = {
      head: l.teaching.name,
      body: 'Lecture of' + l.date + ' (' + l.starttime + '-' + l.endtime + ') has changed!',
      token_topic: l.teaching.name,
    };
    return this.http.post<Notification>(this.notificationurl + '/toTopic', notification, {headers});
  }

  ModReportNotification(r: Report): Observable<Notification> {
    const notification: Notification = {
      head: 'Your report: ' + r.problemDescription,
      body: 'Classroom ' + r.classroom.name + ' has changed!',
      token_topic: r.userByProfessorIdProfessor.email,
    };
    return this.http.post<Notification>(this.notificationurl + '/toUser', notification, {headers});
  }
}
