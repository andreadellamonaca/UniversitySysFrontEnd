import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable()
export class UserService {
  loginurl = 'http://localhost:8080/Project_university/user/getUserByMail_Pwd';
  userurl = 'http://localhost:8080/Project_university/user';

  constructor(private http: HttpClient) {}

  checkUserCredentials(mail: string, password: string): Observable<User> {
    return this.http.get<User>(this.loginurl + '/' + mail + '/' + password);
  }

  getAllProfessors(): Observable<User[]> {
    return this.http.get<User[]>(this.userurl + '/getAllProfessors');
  }

  save(u: User): Observable<User> {
    return this.http.post(this.userurl + '/save', u, {headers});
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}
