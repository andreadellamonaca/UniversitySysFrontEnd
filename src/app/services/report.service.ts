import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Report} from '../models/report';
import {Teaching} from '../models/teaching';
import {ReportStatus} from '../models/report-status';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  reporturl = 'http://localhost:8080/Project_university/report';
  reportstatusurl = 'http://localhost:8080/Project_university/reportstatus';

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

  getReportStatusById(idReportStatus: number): Observable<ReportStatus> {
    return this.http.get<ReportStatus>(this.reportstatusurl + '/getReportStatusById/' + idReportStatus);
  }
}
