import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTokenPageComponent } from './api-token-page.component';

describe('ApiTokenPageComponent', () => {
  let component: ApiTokenPageComponent;
  let fixture: ComponentFixture<ApiTokenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ApiTokenPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiTokenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
