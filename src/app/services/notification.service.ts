import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../models/notification';
import {Teaching} from '../models/teaching';

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
}
