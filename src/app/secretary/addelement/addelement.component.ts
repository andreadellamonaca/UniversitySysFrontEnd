import { Component, OnInit } from '@angular/core';
import { NewstudycourseComponent } from './newstudycourse/newstudycourse.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-addelement',
  templateUrl: './addelement.component.html',
  styleUrls: ['./addelement.component.css']
})
export class AddelementComponent implements OnInit {
  list: any = [];

  constructor(private router: Router) {
    this.list = [
      { title: 'Study Course', url: 'secretary/newelem/studycourse'},
      { title: 'User', address: null },
      { title: 'Teaching', address: null },
      { title: 'Lecture', address: null },
      { title: 'Classroom', address: null },
      { title: 'Exam', address: null }
    ];
  }

  ngOnInit() {
  }

  openForm(page) {
    this.router.navigateByUrl(page);
  }

}
