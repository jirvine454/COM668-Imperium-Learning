import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseDevelopmentComponent } from './database-development.component';

describe('DatabaseDevelopmentComponent', () => {
  let component: DatabaseDevelopmentComponent;
  let fixture: ComponentFixture<DatabaseDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseDevelopmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
