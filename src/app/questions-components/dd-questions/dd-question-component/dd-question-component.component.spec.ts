import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdQuestionComponentComponent } from './dd-question-component.component';

describe('DdQuestionComponentComponent', () => {
  let component: DdQuestionComponentComponent;
  let fixture: ComponentFixture<DdQuestionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdQuestionComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DdQuestionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
