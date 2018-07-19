import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profnavbar',
  templateUrl: './profnavbar.component.html',
  styleUrls: ['./profnavbar.component.css']
})
export class ProfnavbarComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

}
