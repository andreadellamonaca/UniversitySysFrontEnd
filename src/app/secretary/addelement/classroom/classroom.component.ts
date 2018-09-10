import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Classroom} from '../../../models/classroom';
import {ClassroomService} from '../../../services/classroom.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  clslist: Classroom[] = [];
  clsmodel: Classroom = {};

  showClassroomForm: boolean = false;
  modalRef: NgbModalRef;

  displayedColumns: string[] = ['position', 'name', 'description', 'coordinates', 'edit'];

  constructor(private router: Router, private clsService: ClassroomService, private modalService: NgbModal) {
    this.clsService.getAll().subscribe(list => {
      this.clslist = list;
    });
  }

  ngOnInit() {
  }

  backEvent() {
    this.router.navigateByUrl('secretary/newelem');
  }

  cleanform() {
    this.clsmodel = {};
  }

  editelem(c: Classroom, content) {
    this.clsmodel = c;
    this.showClassroomForm = !this.showClassroomForm;
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
      if (result != null) {
        this.addcls();
      }
    }, reason => {});
  }

  addcls() {
    for (const i of this.clslist) {
      if (i.name === this.clsmodel.name && this.clsmodel.idClassroom === undefined) {
        alert('Error! This Classroom already exists');
        return;
      }
    }
    this.clsService.save(this.clsmodel).subscribe(data => {
      console.log(data);
      this.clsService.getAll().subscribe(list => {
        this.clslist = list;
      });
      this.cleanform();
    });
  }

  showForm(content) {
    this.cleanform();
    this.showClassroomForm = !this.showClassroomForm;
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
      if (result != null) {
        this.addcls();
      }
    }, reason => {});
  }

}
