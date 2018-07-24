import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeachingMaterial} from '../models/teaching-material';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class TeachingMaterialService {
  teachingmaterialurl = 'http://localhost:8080/Project_university/teachingmaterial';

  constructor(private http: HttpClient) { }

  getTMaterialByLectureId(idLecture: number): Observable<TeachingMaterial[]> {
    return this.http.get<TeachingMaterial[]>(this.teachingmaterialurl + '/getTeachingMaterialByIdLecture/' + idLecture);
  }

  saveFile(formData: FormData): Observable<TeachingMaterial> {
    return this.http.post<TeachingMaterial>(this.teachingmaterialurl + '/saveFile' , formData);
  }
}
