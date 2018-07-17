import { Component, OnInit } from '@angular/core';
import {User} from '../models/User';
import {UserService} from '../services/user.service';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  newProf: User = {
    idUser: null,
    studycourse: '',
    usertype: null,
    name: '',
    surname: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService,
              private localStorage: LocalStorage) { }

  ngOnInit() {

    this.localStorage.getItem<User>('professor').subscribe((user) => {

      this.newProf = user;
    });
  }


}
