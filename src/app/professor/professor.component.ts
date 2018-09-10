import { Component, OnInit } from '@angular/core';
import {User} from '../models/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  newProf: User = null;


  constructor(private router: Router) {
    this.newProf = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  goto(link: string) {
    this.router.navigateByUrl(link);
  }
}
