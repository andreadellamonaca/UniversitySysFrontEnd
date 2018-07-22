import { Component, OnInit } from '@angular/core';
import {Report} from '../../models/report';
import {User} from '../../models/User';
import {ReportService} from '../../services/report.service';
import {Classroom} from '../../models/classroom';
import {ClassroomService} from '../../services/classroom.service';
import {ReportDTO} from '../../models/report-dto';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [];
  currentUser: User;
  report: Report;
  classrooms: Classroom[] = [];
  reportDTO: ReportDTO = {
    idclassroom: null,
    userByProfessorIdProfessor: null,
    problemDescription: ''
  };

  showReportForm: boolean = false;

  constructor(private reportService: ReportService,
              private classroomService: ClassroomService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.reportService.getReportsByIdProfessor(this.currentUser.idUser).subscribe(reports => {
      this.reports = reports;
    });
    this.classroomService.getAll().subscribe(classrooms => {
      this.classrooms = classrooms;
    });
  }

  toggleHide(r: Report) {
    r.hide = !r.hide;
    this.reportService.getReportDetail(r.idReport).subscribe(report => {
      this.report = report;
    });
  }

  shownewReportForm() {
    this.showReportForm = true;
  }

  addReport(classroom) {
    this.reportDTO.idclassroom = classroom;
    this.reportDTO.userByProfessorIdProfessor = this.currentUser.idUser;
    this.reportService.addnewReport(this.reportDTO).subscribe(rep => {
      console.log(rep);
      alert('Report sent!');
    });
  }

}
