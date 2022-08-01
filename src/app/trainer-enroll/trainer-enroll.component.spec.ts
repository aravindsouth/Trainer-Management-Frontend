import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerEnrollComponent } from './trainer-enroll.component';

describe('TrainerEnrollComponent', () => {
  let component: TrainerEnrollComponent;
  let fixture: ComponentFixture<TrainerEnrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerEnrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerEnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
