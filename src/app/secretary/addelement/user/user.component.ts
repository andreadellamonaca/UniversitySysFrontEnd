import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/User';
import {Router} from '@angular/router';
import {TeachingService} from '../../../services/teaching.service';
import {UserType} from '../../../models/user-type';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  professorslist: User[] = [];
  usermodel: User = {};
  usertypemodel: UserType = {
    idUserType: 2,
    typeName: 'professor'
  };

  showuserForm: Boolean = false;
  modalRef: NgbModalRef;

  constructor(private router: Router, private userService: UserService, private teachingService: TeachingService, private modalService: NgbModal) {
    this.userService.getAllProfessors().subscribe(list => {
      this.professorslist = list;
      for (const i of this.professorslist) {
        this.teachingService.getTeachingsByIdProfessor(i.idUser).subscribe(tlist => {
          i.teachinglist = tlist;
        });
      }
    });
  }

  ngOnInit() {
  }

  backEvent() {
    this.router.navigateByUrl('secretary/newelem');
  }

  cleanform() {
    this.usermodel = {};
  }

  addprof() {
    this.usermodel.usertype = this.usertypemodel;
    for (const i of this.professorslist) {
      if (i.email === this.usermodel.email && i.idUser === undefined) {
        alert('Error! This email already exists!');
        return;
      }
    }
    this.userService.save(this.usermodel).subscribe(data => {
      console.log(data);
      this.userService.getAllProfessors().subscribe(list => {
        this.professorslist = list;
        for (const i of this.professorslist) {
          this.teachingService.getTeachingsByIdProfessor(i.idUser).subscribe(tlist => {
            i.teachinglist = tlist;
          });
        }
      });
      this.cleanform();
    });
  }


  showForm(content) {
    this.showuserForm = !this.showuserForm;
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
      if (result != null) {
        this.addprof();
      }
    });
  }
}
