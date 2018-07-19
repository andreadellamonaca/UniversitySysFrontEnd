import { Component, OnInit } from '@angular/core';
import {Report} from '../../models/report';
import {User} from '../../models/User';
import {ReportService} from '../../services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: Report[];
  currentUser: User;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
