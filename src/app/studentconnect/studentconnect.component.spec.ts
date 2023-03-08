import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentConnectComponent } from './studentconnect.component';

describe('StudentsComponent', () => {
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
