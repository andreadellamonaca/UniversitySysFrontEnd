import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService,
              private localStorage: LocalStorage) { }

  ngOnInit() {
  }

  checkCred(mail, pwd) {
    this.userService.checkUserCredentials(mail, pwd).subscribe(user => {
      console.log(user);
      this.localStorage.setItem('professor', user).subscribe(() => {});
    });

  }


}
