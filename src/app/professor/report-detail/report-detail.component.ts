import { Component, OnInit } from '@angular/core';
import {Report} from '../../models/report';
import {ActivatedRoute} from '@angular/router';
import {ReportService} from '../../services/report.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {
  report: Report;

  constructor(private route: ActivatedRoute,
              private reportService: ReportService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.reportService.getReportDetail(id).subscribe(report => {
      this.report = report;
    });
  }

}
