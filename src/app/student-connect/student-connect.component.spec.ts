import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentConnectComponent } from './student-connect.component';

describe('StudentConnectComponent', () => {
  let component: StudentConnectComponent;
  let fixture: ComponentFixture<StudentConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentConnectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
