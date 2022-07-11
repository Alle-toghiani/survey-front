import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageReportsRoutingModule } from './manage-reports-routing.module';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
import { WidgetContainerModule} from "@shared-components/src/app/widget-container/widget-container.module";
import { TablesModule} from "@shared-components/src/app/tables/tables.module";
import { TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ReportsListComponent
  ],
  imports: [
    CommonModule,
    ManageReportsRoutingModule,
    WidgetContainerModule,
    TablesModule,
    TranslateModule
  ]
})
export class ManageReportsModule { }
