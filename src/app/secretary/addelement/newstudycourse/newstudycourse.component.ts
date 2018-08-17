///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StudycourseService} from '../../../services/studycourse.service';
import {StudyCourse} from '../../../models/study-course';

@Component({
  selector: 'app-newstudycourse',
  templateUrl: './newstudycourse.component.html',
  styleUrls: ['./newstudycourse.component.css']
})
export class NewstudycourseComponent implements OnInit {
  sclist: StudyCourse[] = [];
  scmodel: StudyCourse = {};

  constructor(private router: Router, private scService: StudycourseService) {
    this.scService.getAll().subscribe(list => {
      this.sclist = list;
      for (const i of this.sclist) {
        i.editform = false;
      }
    });
  }

  ngOnInit() {
  }

  backEvent() {
    this.router.navigateByUrl('secretary/newelem');
  }

  editelem(sc: StudyCourse) {
    sc.editform = !sc.editform;
    this.scmodel = sc;
  }

  addsc() {
    this.scService.save(this.scmodel).subscribe(data => {
      console.log(data);
      this.scService.getAll().subscribe(list => {
        this.sclist = list;
        for (const i of this.sclist) {
          i.editform = false;
        }
      });
      this.cleanform();
    });
  }

  cleanform() {
    this.scmodel = {};
  }

}
