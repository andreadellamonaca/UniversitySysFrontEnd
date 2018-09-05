import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Classroom} from '../../../models/classroom';
import {ClassroomService} from '../../../services/classroom.service';

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
    for (const i of this.clslist) {
      if (i.name === this.clsmodel.name && this.clsmodel.idClassroom === undefined) {
        alert('Error! This Classroom already exists');
        return;
      }
    }
    this.clsService.save(this.clsmodel).subscribe(data => {
      console.log(data);
      this.clsService.getAll().subscribe(list => {
        this.clslist = list;
      });
      this.cleanform();
    });
  }

}
