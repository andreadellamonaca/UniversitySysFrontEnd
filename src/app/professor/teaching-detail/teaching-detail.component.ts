import { Component, OnInit } from '@angular/core';
import {Teaching} from '../../models/teaching';
import {ActivatedRoute} from '@angular/router';
import {TeachingService} from '../../services/teaching.service';
import {Lecture} from '../../models/lecture';
import {LectureService} from '../../services/lecture.service';
import {TeachingMaterial} from '../../models/teaching-material';
import {TeachingMaterialService} from '../../services/teaching-material.service';

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
              private lectureService: LectureService,
              private tmaterialService: TeachingMaterialService) { }

  ngOnInit() {
    const name: string = this.route.snapshot.paramMap.get('name');
    this.teachingService.getTeachingDetail(name).subscribe(teaching => {
      this.teaching = teaching;
      this.lectureService.getByIdTeaching(this.teaching.idTeaching).subscribe(lectures => {
        this.lectures = lectures;
      });
    });
  }

  toggleHide(l: Lecture) {
    l.hide_material = !l.hide_material;
    this.tmaterialService.getTMaterialByLectureId(l.idLecture).subscribe(tmaterials => {
      l.tmaterials = tmaterials;
    });
  }

}
