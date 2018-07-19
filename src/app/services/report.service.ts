import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Report} from '../models/report';
import {Teaching} from '../models/teaching';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  reporturl = 'http://localhost:8080/Project_university/report';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Report[]> {
    return this.http.get<Report[]>(this.reporturl + '/getAll');
  }

  getReportsByIdProfessor(idProf: number): Observable<Report[]> {
    return this.http.get<Report[]>(this.reporturl + '/getReportsByIdProfessor/' + idProf);
  }

  getReportDetail(idReport: number): Observable<Report> {
    return this.http.get<Report>(this.reporturl + '/getReportById/' + idReport);
  }
}
