import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdQuestionsComponent } from './dd-questions.component';

describe('DdQuestionsComponent', () => {
  let component: DdQuestionsComponent;
  let fixture: ComponentFixture<DdQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DdQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
