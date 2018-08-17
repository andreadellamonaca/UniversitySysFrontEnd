import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecrnavbarComponent } from './secrnavbar.component';

describe('SecrnavbarComponent', () => {
  let component: SecrnavbarComponent;
  let fixture: ComponentFixture<SecrnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecrnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecrnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
