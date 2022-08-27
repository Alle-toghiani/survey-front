import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorsComponent } from './moderators.component';

describe('ModeratorsComponent', () => {
  let component: ModeratorsComponent;
  let fixture: ComponentFixture<ModeratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
