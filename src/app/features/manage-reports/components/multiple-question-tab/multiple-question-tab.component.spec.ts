import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleQuestionTabComponent } from './multiple-question-tab.component';

describe('MultipleQuestionTabComponent', () => {
  let component: MultipleQuestionTabComponent;
  let fixture: ComponentFixture<MultipleQuestionTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleQuestionTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleQuestionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
