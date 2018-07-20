import { Component, OnInit } from '@angular/core';
import {Report} from '../../models/report';
import {User} from '../../models/User';
import {ReportService} from '../../services/report.service';
import {ReportStatus} from '../../models/report-status';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [];
  currentUser: User;
  report: Report;
  reportStatus: ReportStatus = {
    idReport: null,
    name: ''
  };
  showReportForm: boolean = false;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.reportService.getReportsByIdProfessor(this.currentUser.idUser).subscribe(reports => {
      this.reports = reports;
    });
  }

  toggleHide(r: Report) {
    this.reportService.getReportDetail(r.idReport).subscribe(report => {
      this.report = report;
      this.reportService.getReportStatusById(this.report.idReportStatus).subscribe(reportstatus => {
        this.reportStatus = reportstatus;
      });
    });
    r.hide = !r.hide;
  }

  shownewReportForm() {
    this.showReportForm = true;
  }

}
