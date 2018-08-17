import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-secrnavbar',
  templateUrl: './secrnavbar.component.html',
  styleUrls: ['./secrnavbar.component.css']
})
export class SecrnavbarComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

}
