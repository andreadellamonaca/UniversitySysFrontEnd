import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Exam} from '../../../models/exam';
import {ExamService} from '../../../services/exam.service';
import {Classroom} from '../../../models/classroom';
import {TeachingService} from '../../../services/teaching.service';
import {Teaching} from '../../../models/teaching';
import {ClassroomService} from '../../../services/classroom.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  exammodel: Exam = {};
  examslist: Exam[] = [];
  tlist: Teaching[] = [];
  clslist: Classroom[] = [];
  teachingmodel: Teaching = {};
  classroommodel: Classroom = {};

  constructor(private router: Router, private examService: ExamService, private teachingService: TeachingService, private clsService: ClassroomService) {
    this.examService.getAll().subscribe(list => {
      this.examslist = list;
    });
    this.teachingService.getAll().subscribe(list => {
      this.tlist = list;
      console.log(this.tlist);
    });
    this.clsService.getAll().subscribe(list => {
      this.clslist = list;
      console.log(this.clslist);
    });
  }

  ngOnInit() {
  }

  backEvent() {
    this.router.navigateByUrl('secretary/newelem');
  }

  cleanform() {
    this.exammodel = {};
    this.teachingmodel = {};
    this.classroommodel = {};
  }

  editelem(e: Exam) {
    this.exammodel = e;
    this.teachingmodel = e.teaching;
    this.classroommodel = e.classroom;
  }

  addexam() {
    this.exammodel.teaching = this.teachingmodel;
    this.exammodel.classroom = this.classroommodel;
    this.examService.save(this.exammodel).subscribe(data => {
      console.log(data);
      this.examService.getAll().subscribe(list =>  {
        this.examslist = list;
      });
    });
    this.cleanform();
  }
}
