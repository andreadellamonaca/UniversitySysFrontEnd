import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeachingMaterial} from '../models/teaching-material';
import {Variables} from '../Variables';

const headers = new HttpHeaders({'Content-Type' : 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class TeachingMaterialService {
  teachingmaterialurl = `${Variables.ServerURL}/teachingmaterial`;

  constructor(private http: HttpClient) { }

  getTMaterialByLectureId(idLecture: number): Observable<TeachingMaterial[]> {
    return this.http.get<TeachingMaterial[]>(this.teachingmaterialurl + '/getTeachingMaterialByIdLecture/' + idLecture);
  }

  saveFile(formData: FormData): Observable<TeachingMaterial> {
    return this.http.post<TeachingMaterial>(this.teachingmaterialurl + '/saveFile' , formData);
  }

  saveLink(tm: TeachingMaterial): Observable<TeachingMaterial> {
    return this.http.post<TeachingMaterial>(this.teachingmaterialurl + '/saveLink', tm, {headers});
  }

  removeMaterial(idTeachingmaterial: number): Observable<boolean> {
    return this.http.get<boolean>(this.teachingmaterialurl + '/delete/' + idTeachingmaterial);
  }
}
