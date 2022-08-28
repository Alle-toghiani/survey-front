import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TranslateModule } from "@ngx-translate/core";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";

import { WidgetContainerModule} from "@shared-components/src/app/widget-container/widget-container.module";
import { TablesModule} from "@shared-components/src/app/tables/tables.module";
import { ManageReportsRoutingModule } from './manage-reports-routing.module';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
import { WelcomeTabComponent } from './components/welcome-tab/welcome-tab.component';
import {NzAlertModule} from "ng-zorro-antd/alert";
import { MultipleQuestionTabComponent } from './components/multiple-question-tab/multiple-question-tab.component';



@NgModule({
  declarations: [
    ReportsListComponent,
    WelcomeTabComponent,
    MultipleQuestionTabComponent
  ],
  imports: [
    CommonModule,
    ManageReportsRoutingModule,
    WidgetContainerModule,
    TablesModule,
    NzButtonModule,
    TranslateModule,
    NzTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzAlertModule,
    NzIconModule
  ]
})
export class ManageReportsModule { }
