import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Teaching} from '../../../models/teaching';
import {TeachingService} from '../../../services/teaching.service';
import {LectureService} from '../../../services/lecture.service';
import {Lecture} from '../../../models/lecture';
import {Classroom} from '../../../models/classroom';
import {ClassroomService} from '../../../services/classroom.service';
import {Timestamp} from 'rxjs';
import {NotificationService} from '../../../services/notification.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {
  selecteddate: Date;
  selectedidteaching: number;
  tlist: Teaching[] = [];
  lectureslist: Lecture[] = [];
  classroommodel: Classroom = {};
  clslist: Classroom[] = [];
  datemodel: Date;
  starttimemodel: string;
  endtimemodel: string;
  lecturemodel: Lecture = {};
  showeditform: boolean = false;
  startdatemodel: Date;
  enddatemodel: Date;
  teachingmodel: Teaching = {};
  weeklist: Array<{name: string, checked: boolean}> = [
    {name: 'Monday', checked: false},
    {name: 'Tuesday', checked: false},
    {name: 'Wednesday', checked: false},
    {name: 'Thursday', checked: false},
    {name: 'Friday', checked: false}
    ];
  bufferdate: Date;

  showLectureForm: boolean = false;
  modalRef: NgbModalRef;

  constructor(private router: Router,
              private teachingService: TeachingService,
              private lectureService: LectureService,
              private classroomService: ClassroomService,
              private notifService: NotificationService,
              private modalService: NgbModal) {

    this.teachingService.getAll().subscribe(list => {
      this.tlist = list;
      console.log(this.tlist);
    });
    this.classroomService.getAll().subscribe(list => {
      this.clslist = list;
    });
  }

  ngOnInit() {
  }

  backEvent() {
    this.router.navigateByUrl('secretary/newelem');
  }

  showbydate() {
    if (this.selecteddate == null) {
      alert('Select a date!');
    } else {
      console.log(this.selecteddate);
      this.lectureService.getByDate(this.selecteddate).subscribe(list => {
        this.lectureslist = list;
      });
    }
  }

  showbyteaching() {
    if (this.selectedidteaching == null || this.selectedidteaching.toString() === '') {
      alert('Select a teaching!');
    } else {
      console.log(this.selectedidteaching);
      this.lectureService.getByIdTeaching(this.selectedidteaching).subscribe(list => {
        this.lectureslist = list;
      });
    }
  }

  editelem(l: Lecture, content) {
    this.showeditform = true;
    if (this.lecturemodel.idLecture === l.idLecture ) {
      this.lecturemodel.show_editform = !this.lecturemodel.show_editform;
    } else {
      this.lecturemodel = l;
      this.lecturemodel.show_editform = true;
    }
    this.classroommodel = l.classroom;
    this.datemodel = l.date;
    this.starttimemodel = l.starttime;
    this.endtimemodel = l.endtime;
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
      this.showeditform = false;
      if (result != null) {
        this.editlecture();
      } else {
        this.cleanform();
      }
    }, reason => {this.cleanform(); });
  }

  cleanform() {
    this.classroommodel = {};
    this.datemodel = new Date();
    this.starttimemodel = '';
    this.endtimemodel = '';
    this.startdatemodel = new Date();
    this.enddatemodel = new Date();
    this.teachingmodel = {};
    for (const i of this.weeklist) {
      i.checked = false;
    }
  }

  editlecture() {
    if (!this.verifycorrecttime()) {
      alert('Error! Modify Time Range');
    } else {
      this.lecturemodel.classroom = this.classroommodel;
      this.lecturemodel.date = this.datemodel;
      this.lecturemodel.starttime = this.starttimemodel;
      this.lecturemodel.endtime = this.endtimemodel;
      this.lectureService.save(this.lecturemodel).subscribe(data => {
        console.log(data);
        this.notifService.ModLectureNotification(this.lecturemodel).subscribe(not => {
          console.log(not);
        });
        this.cleanform();
        if (this.selecteddate != null) {
          this.lectureService.getByDate(this.selecteddate).subscribe(list => {
            this.lectureslist = list;
          });
        } else if (this.selectedidteaching != null && this.selectedidteaching.toString() !== '') {
          this.lectureService.getByIdTeaching(this.selectedidteaching).subscribe(list => {
            this.lectureslist = list;
          });
        }
        this.lecturemodel.show_editform = !this.lecturemodel.show_editform;
      });
    }
  }

  verifycorrecttime(): boolean {
    const startarray = this.starttimemodel.split('.');
    const endarray = this.endtimemodel.split('.');
    const startdate = new Date(null, null, null, parseInt(startarray[0], 10), parseInt(startarray[1], 10));
    const enddate = new Date(null, null, null, parseInt(endarray[0], 10), parseInt(endarray[1], 10));
    return !(startdate > enddate);
  }

  changestatus(w: any) {
    for (const i of this.weeklist) {
      if (i.name === w.name) {
        i.checked = !i.checked;
        console.log(i);
      }
    }
  }

  addlecture() {
    let count = 0;
    for (const i of this.weeklist) {
      if (i.checked === true) {
        count = count + 1;
      }
    }
    if (count === 0) {
      alert('Error! Choose at least a day!');
    } else {
      if (!(this.verifycorrecttime()) || (this.startdatemodel > this.enddatemodel)) {
        alert('Error! Modify Time Range Or Date Range');
      } else {
        this.lecturemodel.classroom = this.classroommodel;
        this.lecturemodel.starttime = this.starttimemodel;
        this.lecturemodel.endtime = this.endtimemodel;
        this.lecturemodel.teaching = this.teachingmodel;

        this.bufferdate = new Date(this.startdatemodel);
        const final = new Date(this.enddatemodel);
        while (this.bufferdate.getTime() <= final.getTime()) {
          const index = parseInt(this.bufferdate.getDay().toLocaleString('en-us'), 10) - 1;
          if (index < 5 && index !== -1) {
            if (this.weeklist[index].checked) {
              this.lecturemodel.date = this.bufferdate;
              this.lectureService.save(this.lecturemodel).subscribe(data => {
                console.log(data);
              });
            }
          }
          this.bufferdate = new Date(this.bufferdate.getTime() + (1000 * 60 * 60 * 24) );
        }
      }
    }
    this.cleanform();
  }

  showForm(content) {
    this.showLectureForm = !this.showLectureForm;
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
      if (result != null) {
        this.addlecture();
      }
    }, reason => {});
  }

}
