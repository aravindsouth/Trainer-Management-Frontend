import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAllocationComponent } from './course-allocation.component';

describe('CourseAllocationComponent', () => {
  let component: CourseAllocationComponent;
  let fixture: ComponentFixture<CourseAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseAllocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
