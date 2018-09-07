import { Component, OnInit } from '@angular/core';
import {ReportService} from '../../services/report.service';
import {Report} from '../../models/report';
import {User} from '../../models/User';
import {ReportstatusService} from '../../services/reportstatus.service';
import {ReportStatus} from '../../models/report-status';
import {NotificationService} from '../../services/notification.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

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

  modalRef: NgbModalRef;

  constructor(private reportService: ReportService, private rstatusService: ReportstatusService,
              private notService: NotificationService, private modalService: NgbModal) {
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

  cleanform() {
    this.reportmodel = {};
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

  modify(r: Report, content) {
    this.reportmodel = r;
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
      if (result != null) {
        this.editreport();
      }
    });
  }

  editreport() {
    this.reportService.addnewReport(this.reportmodel).subscribe(data => {
      console.log(data);
      this.notService.ModReportNotification(this.reportmodel).subscribe(notif => {
        console.log(notif);
        this.cleanform();
      });
      this.reportService.getReportsByIdSecretary(this.currentUser.idUser).subscribe(list => {
        this.myreports = list;
      });
    });
  }

}
