import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from "@ngx-translate/core";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzButtonModule } from "ng-zorro-antd/button";

import { TablesModule } from "@shared-components/src/app/tables/tables.module";
import { WidgetContainerModule } from "@shared-components/src/app/widget-container/widget-container.module";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FoldersSurveysListComponent } from './components/folders-surveys-list/folders-surveys-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainLayoutModule} from "@shared-components/src/app/main-layout/main-layout.module";
import { ModeratorsComponent } from './components/moderators/moderators.component';
import {NzDividerModule} from "ng-zorro-antd/divider";


@NgModule({
  declarations: [
    DashboardComponent,
    FoldersSurveysListComponent,
    ModeratorsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    WidgetContainerModule,
    TranslateModule,
    NzCollapseModule,
    NzButtonModule,
    TablesModule,
    MainLayoutModule,
    NzDividerModule
  ]
})
export class DashboardModule { }
