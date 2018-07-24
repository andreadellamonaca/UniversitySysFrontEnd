import {Component, OnInit, ViewChild} from '@angular/core';
import {Teaching} from '../../models/teaching';
import {ActivatedRoute} from '@angular/router';
import {TeachingService} from '../../services/teaching.service';
import {Lecture} from '../../models/lecture';
import {LectureService} from '../../services/lecture.service';
import {TeachingMaterial} from '../../models/teaching-material';
import {TeachingMaterialService} from '../../services/teaching-material.service';
import {Form} from '@angular/forms';
import {User} from '../../models/User';

@Component({
  selector: 'app-teaching-detail',
  templateUrl: './teaching-detail.component.html',
  styleUrls: ['./teaching-detail.component.css']
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
              private tmaterialService: TeachingMaterialService) { }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

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

  uploadFile(lectureid) {
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);
    formData.append('lectureid', lectureid);
    formData.append('userid', this.currentUser.idUser.toString());
    this.tmaterialService.saveFile(formData).subscribe(tm => {
      console.log(tm);
      alert('File uploaded correctly!');
    });
  }

  uploadLink(lectureid: number) {
    this.t_material.user.idUser = this.currentUser.idUser;
    this.t_material.lecture.idLecture = lectureid;
    console.log(this.t_material);
    this.tmaterialService.saveLink(this.t_material).subscribe(tm => {
      console.log(tm);
      alert('Link uploaded correctly!');
    });
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

}
