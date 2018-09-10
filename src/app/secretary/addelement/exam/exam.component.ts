import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Exam} from '../../../models/exam';
import {ExamService} from '../../../services/exam.service';
import {Classroom} from '../../../models/classroom';
import {TeachingService} from '../../../services/teaching.service';
import {Teaching} from '../../../models/teaching';
import {ClassroomService} from '../../../services/classroom.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

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

  showExamForm: boolean = false;
  modalRef: NgbModalRef;

  displayedColumns: string[] = ['position', 'teaching', 'classroom', 'date', 'hour', 'edit'];

  constructor(private router: Router, private examService: ExamService, private teachingService: TeachingService, private clsService: ClassroomService, private modalService: NgbModal) {
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

  editelem(e: Exam, content) {
    this.exammodel = e;
    this.teachingmodel = e.teaching;
    this.classroommodel = e.classroom;
    this.showExamForm = !this.showExamForm;
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
      if (result != null) {
        this.addexam();
      }
    }, reason => {});
  }

  showForm(content) {
    this.cleanform();
    this.showExamForm = !this.showExamForm;
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
      if (result != null) {
        this.addexam();
      }
    }, reason => {});
  }
}
