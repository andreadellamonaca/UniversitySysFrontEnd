import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Calendar} from '../../../models/calendar';
import {CalendarService} from '../../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  clist: Calendar[] = [];
  cmodel: Calendar = {};
  currentyear = (new Date()).getFullYear();
  startyearmodel: number = this.currentyear;
  endyearmodel: number = this.currentyear + 1;

  constructor(private router: Router, private calendarService: CalendarService) {
    this.calendarService.getAll().subscribe(list => {
      this.clist = list;
    });
  }

  ngOnInit() {
  }

  backEvent() {
    this.router.navigateByUrl('secretary/newelem');
  }

  cleanform() {
    this.cmodel = {};
    this.startyearmodel = this.currentyear;
    this.endyearmodel = this.currentyear + 1;
  }

  addcalendar() {
    if (this.startyearmodel > this.endyearmodel) {
      alert('Error! Modify the academic year field');
    } else {
      this.cmodel.academicYear = this.startyearmodel + '-' + this.endyearmodel;
      this.calendarService.save(this.cmodel).subscribe(data => {
        console.log(data);
        this.cleanform();
        this.calendarService.getAll().subscribe(list => {
          this.clist = list;
        });
      });
    }
  }

}
