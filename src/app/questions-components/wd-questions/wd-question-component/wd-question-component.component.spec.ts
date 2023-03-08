import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdQuestionComponentComponent } from './wd-question-component.component';

describe('WdQuestionComponentComponent', () => {
  let component: WdQuestionComponentComponent;
  let fixture: ComponentFixture<WdQuestionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdQuestionComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WdQuestionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
