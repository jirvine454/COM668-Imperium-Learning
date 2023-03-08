import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdQuestionComponentComponent } from './fd-question-component.component';

describe('FdQuestionComponentComponent', () => {
  let component: FdQuestionComponentComponent;
  let fixture: ComponentFixture<FdQuestionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FdQuestionComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FdQuestionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
