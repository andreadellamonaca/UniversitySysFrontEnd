import { Component, OnInit } from '@angular/core';
import {User} from '../models/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css']
})
export class SecretaryComponent implements OnInit {

  newSecr: User = null;

  constructor(private router: Router) {
    this.newSecr = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  goto(link: string) {
    this.router.navigateByUrl(link);
  }

}
