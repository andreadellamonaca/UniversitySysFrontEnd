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
      { title: 'User', url: 'secretary/newelem/user' },
      { title: 'Teaching', url: 'secretary/newelem/teaching' },
      { title: 'Lecture', url: 'secretary/newelem/lecture' },
      { title: 'Classroom', url: 'secretary/newelem/classroom' },
      { title: 'Exam', url: 'secretary/newelem/exam' }
    ];
  }

  ngOnInit() {
  }

  openForm(page) {
    this.router.navigateByUrl(page);
  }

}
