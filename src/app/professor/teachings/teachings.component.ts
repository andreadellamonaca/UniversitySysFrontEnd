import { Component, OnInit } from '@angular/core';
import {Teaching} from '../../models/teaching';
import {TeachingService} from '../../services/teaching.service';

@Component({
  selector: 'app-teachings',
  templateUrl: './teachings.component.html',
  styleUrls: ['./teachings.component.css']
})
export class TeachingsComponent implements OnInit {
  teachings: Teaching[];

  constructor(private teachingService: TeachingService) { }

  ngOnInit() {
    this.teachingService.getAll().subscribe(teachings => {
      this.teachings = teachings;
    });
  }

}
