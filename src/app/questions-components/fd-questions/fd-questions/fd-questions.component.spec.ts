import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdQuestionsComponent } from './fd-questions.component';

describe('FdQuestionsComponent', () => {
  let component: FdQuestionsComponent;
  let fixture: ComponentFixture<FdQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FdQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FdQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
