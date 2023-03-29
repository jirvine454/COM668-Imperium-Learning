import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WdQuestionsComponent } from './wd-questions.component';

describe('WdQuestionsComponent', () => {
  let component: WdQuestionsComponent;
  let fixture: ComponentFixture<WdQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WdQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WdQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
