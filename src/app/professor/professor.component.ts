import { Component, OnInit } from '@angular/core';
import {User} from '../models/User';
import {UserService} from '../services/user.service';

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

  constructor(private userService: UserService) { }

  ngOnInit() {
  }


}
