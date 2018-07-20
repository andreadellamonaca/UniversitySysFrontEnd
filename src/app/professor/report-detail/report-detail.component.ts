import { Component, OnInit } from '@angular/core';
import {Report} from '../../models/report';
import {ActivatedRoute} from '@angular/router';
import {ReportService} from '../../services/report.service';
import {ReportStatus} from '../../models/report-status';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {
  report: Report;
  reportStatus: ReportStatus = {
    idReport: null,
    name: ''
  };

  constructor(private route: ActivatedRoute,
              private reportService: ReportService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.reportService.getReportDetail(id).subscribe(report => {
      this.report = report;
      this.reportService.getReportStatusById(this.report.idReportStatus).subscribe(reportstatus => {
        this.reportStatus = reportstatus;
      });
    });


  }

}
