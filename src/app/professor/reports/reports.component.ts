import {Component, OnInit} from '@angular/core';
import {Report} from '../../models/report';
import {User} from '../../models/User';
import {ReportService} from '../../services/report.service';
import {Classroom} from '../../models/classroom';
import {ClassroomService} from '../../services/classroom.service';

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
  reportsByCls: Report[] = [];
  postreport: Report = {
    classroom: {idClassroom: null},
    userByProfessorIdProfessor: {idUser: null},
    problemDescription: ''
  };

  showReportForm: boolean = false;
  showmyReports: boolean = false;
  showReportsByCls: boolean = true;

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
    this.showReportForm = !this.showReportForm;
  }

  eventmyReports() {
    this.showmyReports = false;
    this.showReportsByCls = true;
  }

  eventReportsByCls(cls) {
    if (cls === 'none') {
      alert('Invalid selection! Select a classroom!');
    } else {
      this.showmyReports = true;
      this.showReportsByCls = false;
      this.reportService.getReportsByIdClassroom(cls).subscribe(reportsbyidcls => {
        this.reportsByCls = reportsbyidcls;
      });
    }
  }

  addReport(classroom) {
    this.postreport.classroom.idClassroom = classroom;
    this.postreport.userByProfessorIdProfessor.idUser = this.currentUser.idUser;
    this.reportService.addnewReport(this.postreport).subscribe(rep => {
      alert('Report sent!');
    });
  }

}
