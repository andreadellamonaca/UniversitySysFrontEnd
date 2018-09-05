///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StudycourseService} from '../../../services/studycourse.service';
import {StudyCourse} from '../../../models/study-course';
import {CalendarService} from '../../../services/calendar.service';
import {Calendar} from '../../../models/calendar';

@Component({
  selector: 'app-newstudycourse',
  templateUrl: './newstudycourse.component.html',
  styleUrls: ['./newstudycourse.component.css']
})
export class NewstudycourseComponent implements OnInit {
  sclist: StudyCourse[] = [];
  scmodel: StudyCourse = {
    calendars: []
  };
  calendarsmodel: Calendar[] = [];
  clist: Calendar[] = [];

  constructor(private router: Router, private scService: StudycourseService, private calendarService: CalendarService) {
    this.scService.getAll().subscribe(list => {
      this.sclist = list;
      for (const i of this.sclist) {
        i.editform = false;
        this.calendarService.getCalendarsByIdStudyCourse(i.idStudyCourse).subscribe(calendarslist => {
          i.calendars = calendarslist;
        });
      }
    });
    this.calendarService.getAll().subscribe(list => {
      this.clist = list;
      for (const i of this.clist) {
        i.checked = false;
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
    for (const i of this.clist) {
      for (const j of this.scmodel.calendars) {
        if (i.idCalendar === j.idCalendar) {
          i.checked = true;
        } else {
          i.checked = false;
        }
      }
    }
  }

  addsc() {
    for (const i of this.sclist) {
      if (i.name === this.scmodel.name && this.scmodel.idStudyCourse === undefined) {
        alert('Error! This StudyCourse already exists');
        return;
      }
    }
    let count = 0;
    for (const i of this.clist) {
      if (i.checked === true) {
        count = count + 1;
      }
    }
    if (count === 0) {
      alert('Error! Choose at least an academic year!');
    } else {
      for (const i of this.clist) {
        if (i.checked === true) {
          this.scmodel.calendars.push(i);
        }
      }
      this.scService.save(this.scmodel).subscribe(data => {
        console.log(data);
        this.scService.getAll().subscribe(list => {
          this.sclist = list;
          for (const i of this.sclist) {
            i.editform = false;
            this.calendarService.getCalendarsByIdStudyCourse(i.idStudyCourse).subscribe(calendarslist => {
              i.calendars = calendarslist;
            });
          }
        });
        this.cleanform();
      });
    }
  }

  cleanform() {
    this.scmodel = {};
    for (const i of this.clist) {
      i.checked = false;
    }
  }

  changestatus(c: Calendar) {
    for (const i of this.clist) {
      if (c.idCalendar === i.idCalendar) {
        i.checked = !i.checked;
      }
    }
  }

}
