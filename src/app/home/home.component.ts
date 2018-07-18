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
      if (user) {
        switch (user.usertype.typeName) {
          case 'professor': {
            localStorage.setItem('professor', JSON.stringify(user));
            this.router.navigateByUrl('professor');
            break;
          }
          case 'secretary': {
            console.log('Sei un segretario');
            break;
          }
          default: {
            console.log('Utente assente');
          }
        }
      }
    },  err =>  {
      console.log('error');
    });

  }


}
