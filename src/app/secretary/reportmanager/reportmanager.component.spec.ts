import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportmanagerComponent } from './reportmanager.component';

describe('ReportmanagerComponent', () => {
  let component: ReportmanagerComponent;
  let fixture: ComponentFixture<ReportmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
