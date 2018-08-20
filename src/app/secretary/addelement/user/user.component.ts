import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/User';
import {Router} from '@angular/router';
import {TeachingService} from '../../../services/teaching.service';
import {UserType} from '../../../models/user-type';

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

  constructor(private router: Router, private userService: UserService, private teachingService: TeachingService) {
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

  editelem(p: User) {
    this.usermodel = p;
  }

  addprof() {
    this.usermodel.usertype = this.usertypemodel;
    this.userService.save(this.usermodel).subscribe(data => {
      console.log(data);
      this.userService.getAllProfessors().subscribe(list => {
        this.professorslist = list;
        for (const i of this.professorslist) {
          this.teachingService.getTeachingsByIdProfessor(i.idUser).subscribe(list => {
            i.teachinglist = list;
          });
        }
      });
      this.cleanform();
    });
  }

}
