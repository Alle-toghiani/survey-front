import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TranslateModule } from "@ngx-translate/core";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzAlertModule } from "ng-zorro-antd/alert";

import { MainLayoutModule} from "@shared-components/src/app/main-layout/main-layout.module";
import { WidgetContainerModule } from "@shared-components/src/app/widget-container/widget-container.module";
import { TablesModule } from "@shared-components/src/app/tables/tables.module";

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
    TranslateModule,
    NzCollapseModule,
    NzButtonModule,
    TablesModule,
    MainLayoutModule,
    NzModalModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzAlertModule
  ]
})
export class DashboardModule { }
