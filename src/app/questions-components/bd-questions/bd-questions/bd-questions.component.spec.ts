import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdQuestionsComponent } from './bd-questions.component';

describe('BdQuestionsComponent', () => {
  let component: BdQuestionsComponent;
  let fixture: ComponentFixture<BdQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BdQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BdQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
