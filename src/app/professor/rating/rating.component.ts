import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Lecture} from '../../models/lecture';
import {RatingService} from '../../services/rating.service';
import {Lecturerating} from '../../models/lecturerating';
import {TeachingMaterial} from '../../models/teaching-material';
import {Materialrating} from '../../models/materialrating';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  lecture: Lecture;
  tmaterial: TeachingMaterial;
  lectureratings: Lecturerating[] = [];
  tmaterialratings: Materialrating[] = [];

  constructor(private location: Location,
              private ratingService: RatingService) { }

  ngOnInit() {
    this.lecture = JSON.parse(localStorage.getItem('selectedLesson'));
    this.tmaterial = JSON.parse(localStorage.getItem('selectedMaterial'));
    if (this.lecture != null) {
      this.ratingService.getLectureSatisfactionsByIdLecture(this.lecture.idLecture).subscribe(list => {
        this.lectureratings = list;
      });
    }
    if (this.tmaterial != null) {
      this.ratingService.getMaterialSatisfactionByIdMaterial(this.tmaterial.idTeachingMaterial).subscribe(list => {
        this.tmaterialratings = list;
      });
    }
  }

  backEvent() {
    localStorage.removeItem('selectedLesson');
    localStorage.removeItem('selectedMaterial');
    this.location.back();
  }

}
