import { Component, OnInit } from '@angular/core';
import {User} from '../models/User';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  newProf: User = null;


  constructor() {
    this.newProf = JSON.parse(localStorage.getItem('professor'));
  }

  ngOnInit() {
  }
}
