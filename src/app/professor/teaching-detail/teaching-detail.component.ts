import {Component, OnInit} from '@angular/core';
import {Teaching} from '../../models/teaching';
import {ActivatedRoute, Router} from '@angular/router';
import {TeachingService} from '../../services/teaching.service';
import {Lecture} from '../../models/lecture';
import {LectureService} from '../../services/lecture.service';
import {TeachingMaterial} from '../../models/teaching-material';
import {TeachingMaterialService} from '../../services/teaching-material.service';
import {User} from '../../models/User';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {RatingService} from '../../services/rating.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-teaching-detail',
  templateUrl: './teaching-detail.component.html',
  styleUrls: ['./teaching-detail.component.css'],
  providers: [NgbRatingConfig]
})
export class TeachingDetailComponent implements OnInit {
  teaching: Teaching;
  lectures: Lecture[] = [];

  currentUser: User;
  file: File;
  t_material: TeachingMaterial = {
    name: '',
    type: '',
    link: '',
    user: {idUser: null},
    lecture: {idLecture: null}
  };


  constructor(private route: ActivatedRoute,
              private teachingService: TeachingService,
              private lectureService: LectureService,
              private tmaterialService: TeachingMaterialService,
              private ratingService: RatingService,
              private notService: NotificationService) { }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const id: number = parseInt(this.route.snapshot.paramMap.get('idTeaching'), 10);
    this.teachingService.getTeachingDetail(id).subscribe(teaching => {
      this.teaching = teaching;
      this.lectureService.getByIdTeaching(this.teaching.idTeaching).subscribe(lectures => {
        this.lectures = lectures;
        for (const i of this.lectures) {
           this.ratingService.getAverageRatingByIdLecture(i.idLecture).subscribe(rating => {
             i.av_rating = rating;
          });
        }
      });
    });
  }

  toggleHide(l: Lecture) {
    l.hide_material = !l.hide_material;
    this.tmaterialService.getTMaterialByLectureId(l.idLecture).subscribe(tmaterials => {
      l.tmaterials = tmaterials;
      for (const i of l.tmaterials) {
        this.ratingService.getAverageRatingByIdMaterial(i.idTeachingMaterial).subscribe(rating => {
          i.av_rating = rating;
        });
      }
    });
  }

  uploadFile(l: Lecture) {
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);
    formData.append('lectureid', JSON.stringify(l.idLecture));
    formData.append('userid', this.currentUser.idUser.toString());
    this.tmaterialService.saveFile(formData).subscribe(tm => {
      console.log(tm);
      this.notService.NewMaterialNotification(this.teaching, l).subscribe(data => {
        console.log(data);
      });
      alert('File uploaded correctly!');
      this.tmaterialService.getTMaterialByLectureId(l.idLecture).subscribe(tmaterials => {
        l.tmaterials = tmaterials;
        for (const i of l.tmaterials) {
          this.ratingService.getAverageRatingByIdMaterial(i.idTeachingMaterial).subscribe(rating => {
            i.av_rating = rating;
          });
        }
      });
    });
  }

  uploadLink(l: Lecture) {
    this.t_material.user.idUser = this.currentUser.idUser;
    this.t_material.lecture.idLecture = l.idLecture;
    console.log(this.t_material);
    this.tmaterialService.saveLink(this.t_material).subscribe(tm => {
      console.log(tm);
      this.t_material = {
        name: '',
        type: '',
        link: '',
        user: {idUser: null},
        lecture: {idLecture: null}
      };
      this.notService.NewMaterialNotification(this.teaching, l).subscribe(data => {
        console.log(data);
      });
      alert('Link uploaded correctly!');
      this.tmaterialService.getTMaterialByLectureId(l.idLecture).subscribe(tmaterials => {
        l.tmaterials = tmaterials;
        for (const i of l.tmaterials) {
          this.ratingService.getAverageRatingByIdMaterial(i.idTeachingMaterial).subscribe(rating => {
            i.av_rating = rating;
          });
        }
      });
    });
  }

  setLect(l: Lecture) {
    this.t_material.lecture = l;
  }

  getFile(event) {
    this.file = event.target.files[0];
  }

  removematerial(l: Lecture, tm: TeachingMaterial) {
    this.tmaterialService.removeMaterial(tm.idTeachingMaterial).subscribe(result => {
      if (result) {
        const index = l.tmaterials.indexOf(tm);
        l.tmaterials.splice(index, 1);
        alert('The selected Teaching Material deleted!');
      } else {
        alert('Something went wrong! Try again!');
      }
    });
  }

  storeLecture(l: Lecture) {
    localStorage.setItem('selectedLesson', JSON.stringify(l));
  }

  storeTMaterial(tm: TeachingMaterial) {
    localStorage.setItem('selectedMaterial', JSON.stringify(tm));
  }

}
