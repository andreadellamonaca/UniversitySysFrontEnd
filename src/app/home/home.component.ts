import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/User';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  checkCred(mail, pwd) {

    this.userService.checkUserCredentials(mail, pwd).subscribe((user: User) => {
      console.log(user);
      localStorage.setItem('professor', JSON.stringify(user));
      this.router.navigateByUrl('professor');
    });

  }


}
