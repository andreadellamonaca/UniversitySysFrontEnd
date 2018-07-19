import { Component, OnInit } from '@angular/core';
import {Teaching} from '../../models/teaching';
import {ActivatedRoute} from '@angular/router';
import {TeachingService} from '../../services/teaching.service';
import {Lecture} from '../../models/lecture';
import {LectureService} from '../../services/lecture.service';

@Component({
  selector: 'app-teaching-detail',
  templateUrl: './teaching-detail.component.html',
  styleUrls: ['./teaching-detail.component.css']
})
export class TeachingDetailComponent implements OnInit {
  teaching: Teaching;
  lectures: Lecture[];

  constructor(private route: ActivatedRoute,
              private teachingService: TeachingService,
              private lectureService: LectureService) { }

  ngOnInit() {
    const name: string = this.route.snapshot.paramMap.get('name');
    this.teachingService.getTeachingDetail(name).subscribe(teaching => {
      this.teaching = teaching;
      this.lectureService.getByIdTeaching(this.teaching.idTeaching).subscribe(lectures => {
        this.lectures = lectures;
      });
    });
  }

}
