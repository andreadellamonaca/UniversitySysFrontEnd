import { Component, OnInit } from '@angular/core';
import {User} from '../models/User';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css']
})
export class SecretaryComponent implements OnInit {

  newSecr: User = null;

  constructor() {
    this.newSecr = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

}
