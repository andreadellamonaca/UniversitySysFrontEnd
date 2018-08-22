import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Classroom} from '../../../models/classroom';
import {ClassroomService} from '../../../services/classroom.service';
import {User} from '../../../models/User';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  clslist: Classroom[] = [];
  clsmodel: Classroom = {};

  constructor(private router: Router, private clsService: ClassroomService) {
    this.clsService.getAll().subscribe(list => {
      this.clslist = list;
    });
  }

  ngOnInit() {
  }

  backEvent() {
    this.router.navigateByUrl('secretary/newelem');
  }

  cleanform() {
    this.clsmodel = {};
  }

  editelem(c: Classroom) {
    this.clsmodel = c;
  }

  addcls() {
    this.clsService.save(this.clsmodel).subscribe(data => {
      console.log(data);
      this.clsService.getAll().subscribe(list => {
        this.clslist = list;
      });
      this.cleanform();
    });
  }

}
