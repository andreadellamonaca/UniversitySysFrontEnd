import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lecturerating} from '../models/lecturerating';
import {Materialrating} from '../models/materialrating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  lessonratingurl = 'http://localhost:8080/Project_university/lecturesatisfaction/';
  materialratingurl = 'http://localhost:8080/Project_university/materialsatisfaction/';

  constructor(private http: HttpClient) { }

  getAverageRatingByIdLecture(idLecture: number): Observable<number> {
    return this.http.get<number>(this.lessonratingurl + 'getAverageRatingByIdLecture/' + idLecture);
  }

  getLectureSatisfactionsByIdLecture(idLecture: number): Observable<Lecturerating[]> {
    return this.http.get<Lecturerating[]>(this.lessonratingurl + 'getLectureSatisfactionsByIdLecture/' + idLecture);
  }

  getAverageRatingByIdMaterial(idMaterial: number): Observable<number> {
    return this.http.get<number>(this.materialratingurl + 'getAverageRatingByIdMaterial/' + idMaterial);
  }

  getMaterialSatisfactionByIdMaterial(idMaterial: number): Observable<Materialrating[]> {
    return this.http.get<Materialrating[]>(this.materialratingurl + 'getMaterialSatisfactionByIdMaterial/' + idMaterial);
  }
}
