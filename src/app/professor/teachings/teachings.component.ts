import { Component, OnInit } from '@angular/core';
import {Teaching} from '../../models/teaching';
import {TeachingService} from '../../services/teaching.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-teachings',
  templateUrl: './teachings.component.html',
  styleUrls: ['./teachings.component.css']
})
export class TeachingsComponent implements OnInit {
  teachings: Teaching[];
  currentUser: User;

  constructor(private teachingService: TeachingService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.teachingService.getTeachingsByIdProfessor(this.currentUser.idUser).subscribe(teachings => {
      this.teachings = teachings;
    });
  }

}

