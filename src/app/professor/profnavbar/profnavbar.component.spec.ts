import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfnavbarComponent } from './profnavbar.component';

describe('ProfnavbarComponent', () => {
  let component: ProfnavbarComponent;
  let fixture: ComponentFixture<ProfnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
