import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdQuestionComponentComponent } from './bd-question-component.component';

describe('BdQuestionComponentComponent', () => {
  let component: BdQuestionComponentComponent;
  let fixture: ComponentFixture<BdQuestionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BdQuestionComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BdQuestionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
