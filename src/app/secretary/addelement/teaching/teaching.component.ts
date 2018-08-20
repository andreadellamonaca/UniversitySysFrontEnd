import { Component, OnInit } from '@angular/core';
import {TeachingService} from '../../../services/teaching.service';
import {Teaching} from '../../../models/teaching';
import {User} from '../../../models/User';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {StudycourseService} from '../../../services/studycourse.service';
import {StudyCourse} from '../../../models/study-course';

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

  constructor(private router: Router, private teachingService: TeachingService, private userService: UserService, private scService: StudycourseService) {
    this.teachingService.getAll().subscribe(list => {
      this.tlist = list;
      for (const i of this.tlist) {
        this.scService.getStudyCoursesByIdTeaching(i.idTeaching).subscribe(sclist => {
          i.studycourses = sclist;
          console.log(i.studycourses);
        });
      }
    });
    this.userService.getAllProfessors().subscribe(proflist => {
      this.plist = proflist;
    });
    this.scService.getAll().subscribe(list => {
      this.sclist = list;
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
  }

  editelem(t: Teaching) {
    this.teachingmodel = t;
    this.profmodel = this.teachingmodel.user;
    for (const i of this.sclist) {
      for (const j of this.teachingmodel.studycourses) {
        if (i.idStudyCourse === j.idStudyCourse) {
          i.checked = true;
        } else {
          i.checked = false;
        }
      }
    }
    console.log(this.sclist);
  }

  addteaching() {
    this.teachingmodel.user = this.profmodel;
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
