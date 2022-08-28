import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeTabComponent } from './welcome-tab.component';

describe('WelcomeTabComponent', () => {
  let component: WelcomeTabComponent;
  let fixture: ComponentFixture<WelcomeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
