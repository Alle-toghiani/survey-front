import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FoldersSurveysListComponent } from './components/folders-surveys-list/folders-surveys-list.component';


@NgModule({
  declarations: [
    FoldersSurveysListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
