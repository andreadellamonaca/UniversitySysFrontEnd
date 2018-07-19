import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable()
export class UserService {
  loginurl = 'http://localhost:8080/Project_university/user/getUserByMail_Pwd';

  constructor(private http: HttpClient) {}

  checkUserCredentials(mail: string, password: string): Observable<User> {
    return this.http.get<User>(this.loginurl + '/' + mail + '/' + password);
}

  logout() {
    localStorage.removeItem('currentUser');
  }

}
