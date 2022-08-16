import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldersSurveysListComponent } from './folders-surveys-list.component';

describe('FoldersSurveysListComponent', () => {
  let component: FoldersSurveysListComponent;
  let fixture: ComponentFixture<FoldersSurveysListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoldersSurveysListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoldersSurveysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
