import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendDevelopmentComponent } from './backend-development.component';

describe('BackendDevelopmentComponent', () => {
  let component: BackendDevelopmentComponent;
  let fixture: ComponentFixture<BackendDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendDevelopmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
