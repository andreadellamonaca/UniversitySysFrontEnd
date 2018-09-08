import { Component, OnInit } from '@angular/core';
import {TeachingService} from '../../../services/teaching.service';
import {Teaching} from '../../../models/teaching';
import {User} from '../../../models/User';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {StudycourseService} from '../../../services/studycourse.service';
import {StudyCourse} from '../../../models/study-course';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-teaching',
  templateUrl: './teaching.component.html',
  styleUrls: ['./teaching.component.css']
})
export class TeachingComponent implements OnInit {
  tlist: Teaching[] = [];
  plist: User[] = [];
  teachingmodel: Teaching = {};
  profmodel: User = {};
  sclist: StudyCourse[] = [];

  showForm: boolean = false;
  modalRef: NgbModalRef;

  constructor(private router: Router,
              private teachingService: TeachingService,
              private userService: UserService,
              private scService: StudycourseService,
              private modalService: NgbModal) {
    this.teachingService.getAll().subscribe(list => {
      this.tlist = list;
      for (const i of this.tlist) {
        this.scService.getStudyCoursesByIdTeaching(i.idTeaching).subscribe(sclist => {
          i.studycourses = sclist;
        });
      }
    });
    this.userService.getAllProfessors().subscribe(proflist => {
      this.plist = proflist;
    });
    this.scService.getAll().subscribe(list => {
      this.sclist = list;
      for (const i of this.sclist) {
        i.checked = false;
      }
    });
  }

  ngOnInit() {
  }

  backEvent() {
    this.router.navigateByUrl('secretary/newelem');
  }

  cleanform() {
    this.teachingmodel = {};
    this.profmodel = {};
    for (const i of this.sclist) {
      i.checked = false;
    }
  }

  changestatus(sc: StudyCourse) {
    for (const i of this.sclist) {
      if (sc.idStudyCourse === i.idStudyCourse) {
        i.checked = !i.checked;
      }
    }
  }

  editelem(t: Teaching, content) {
    this.teachingmodel = t;
    this.profmodel = this.teachingmodel.user;
    for (const i of this.sclist) {
      for (const j of this.teachingmodel.studycourses) {
        if (i.idStudyCourse === j.idStudyCourse) {
          i.checked = true;
          break;
        } else {
          i.checked = false;
        }
      }
    }
    this.showForm = !this.showForm;
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
      if (result != null) {
        this.addteaching();
      }
    }, reason => {});
  }

  addteaching() {
    this.teachingmodel.studycourses = [];
    let count = 0;
    for (const i of this.sclist) {
      if (i.checked === true) {
        count = count + 1;
      }
    }
    if (count === 0) {
      alert('Error! Choose at least one study course!');
    } else {
      this.teachingmodel.user = this.profmodel;
      this.teachingmodel.studycourses = [];
      for (const i of this.sclist) {
        if (i.checked === true) {
          this.teachingmodel.studycourses.push(i);
        }
      }
      this.teachingService.save(this.teachingmodel).subscribe(data => {
        console.log(data);
        this.teachingService.getAll().subscribe(list => {
          this.tlist = list;
          for (const i of this.tlist) {
            this.scService.getStudyCoursesByIdTeaching(i.idTeaching).subscribe(sclist => {
              i.studycourses = sclist;
            });
          }
        });
        this.userService.getAllProfessors().subscribe(proflist => {
          this.plist = proflist;
        });
        this.cleanform();
      });
    }
  }

  showTeachingForm(content) {
    this.cleanform();
    this.showForm = !this.showForm;
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
      if (result != null) {
        this.addteaching();
      }
    }, reason => {});
  }
}
