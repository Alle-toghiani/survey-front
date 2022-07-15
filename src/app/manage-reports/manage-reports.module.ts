import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageReportsRoutingModule } from './manage-reports-routing.module';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
import { WidgetContainerModule} from "@shared-components/src/app/widget-container/widget-container.module";
import { TablesModule} from "@shared-components/src/app/tables/tables.module";
import { TranslateModule} from "@ngx-translate/core";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SurveyDetailsComponent } from './components/survey-details/survey-details.component';

@NgModule({
  declarations: [
    ReportsListComponent,
    SurveyDetailsComponent
  ],
  imports: [
    CommonModule,
    ManageReportsRoutingModule,
    WidgetContainerModule,
    TablesModule,
    NzButtonModule,
    TranslateModule
  ]
})
export class ManageReportsModule { }
