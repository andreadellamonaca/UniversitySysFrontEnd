import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstudycourseComponent } from './newstudycourse.component';

describe('NewstudycourseComponent', () => {
  let component: NewstudycourseComponent;
  let fixture: ComponentFixture<NewstudycourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewstudycourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstudycourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
