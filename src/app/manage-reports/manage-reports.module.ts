import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule} from "@ngx-translate/core";
import { NzButtonModule } from 'ng-zorro-antd/button';

import { WidgetContainerModule} from "@shared-components/src/app/widget-container/widget-container.module";
import { TablesModule} from "@shared-components/src/app/tables/tables.module";
import { ManageReportsRoutingModule } from './manage-reports-routing.module';
import { ReportsListComponent } from './components/reports-list/reports-list.component';

@NgModule({
  declarations: [
    ReportsListComponent
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
