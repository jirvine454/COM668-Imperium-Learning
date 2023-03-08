import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSectionComponentComponent } from './student-section-component.component';

describe('StudentSectionComponentComponent', () => {
  let component: StudentSectionComponentComponent;
  let fixture: ComponentFixture<StudentSectionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentSectionComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSectionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
