import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReportStatus} from '../models/report-status';
import {Variables} from '../Variables';

@Injectable({
  providedIn: 'root'
})
export class ReportstatusService {
  rsurl = `${Variables.ServerURL}/reportstatus`;

  constructor(private http: HttpClient) { }

  getReportStatusforMod(): Observable<ReportStatus[]> {
    return this.http.get<ReportStatus[]>(this.rsurl + '/getReportStatusforMod');
  }

}
