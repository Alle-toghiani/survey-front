import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from "@ngx-translate/core";

import { WidgetContainerModule } from "@shared-components/src/app/widget-container/widget-container.module";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FoldersSurveysListComponent } from './components/folders-surveys-list/folders-surveys-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent,
    FoldersSurveysListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    WidgetContainerModule,
    TranslateModule
  ]
})
export class DashboardModule { }
