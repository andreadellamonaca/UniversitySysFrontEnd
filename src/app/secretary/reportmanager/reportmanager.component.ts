import { Component, OnInit } from '@angular/core';
import {ReportService} from '../../services/report.service';
import {Report} from '../../models/report';
import {User} from '../../models/User';
import {ReportstatusService} from '../../services/reportstatus.service';
import {ReportStatus} from '../../models/report-status';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-reportmanager',
  templateUrl: './reportmanager.component.html',
  styleUrls: ['./reportmanager.component.css']
})
export class ReportmanagerComponent implements OnInit {
  currentUser: User;
  pendingReports: Report[] = [];
  myreports: Report[] = [];
  reportmodel: Report = {hide: true};
  rslist: ReportStatus[] = [];

  constructor(private reportService: ReportService, private rstatusService: ReportstatusService, private notService: NotificationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.reportService.getPendingReports().subscribe(list => {
      this.pendingReports = list;
    });

    this.reportService.getReportsByIdSecretary(this.currentUser.idUser).subscribe(list => {
      this.myreports = list;
    });

    this.rstatusService.getReportStatusforMod().subscribe(list => {
      this.rslist = list;
    });
  }

  ngOnInit() {
  }

  take(r: Report) {
    this.reportmodel.idReport = r.idReport;
    const rs: ReportStatus = {idreportStatus: 3};
    this.reportmodel.reportstatus = rs;
    this.reportmodel.userByProfessorIdProfessor = r.userByProfessorIdProfessor;
    this.reportmodel.classroom = r.classroom;
    this.reportmodel.problemDescription = r.problemDescription;
    this.reportmodel.userBySecretaryIdSecretary = this.currentUser;
    console.log(this.reportmodel);
    this.reportService.addnewReport(this.reportmodel).subscribe(data => {
      console.log(data);
      this.reportmodel = {hide: true};
      this.reportService.getPendingReports().subscribe(list => {
        this.pendingReports = list;
      });
      this.reportService.getReportsByIdSecretary(this.currentUser.idUser).subscribe(list => {
        this.myreports = list;
      });
    });
  }

  modify(r: Report) {
    if (this.reportmodel.idReport === r.idReport ) {
      this.reportmodel.hide = !this.reportmodel.hide;
    } else {
      this.reportmodel = r;
      this.reportmodel.hide = false;
    }
  }

  editreport() {
    this.reportService.addnewReport(this.reportmodel).subscribe(data => {
      console.log(data);
      this.notService.ModReportNotification(this.reportmodel).subscribe(notif => {
        console.log(notif);
      });
      this.reportService.getReportsByIdSecretary(this.currentUser.idUser).subscribe(list => {
        this.myreports = list;
      });
    });
  }

}
