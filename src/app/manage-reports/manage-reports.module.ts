import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageReportsRoutingModule } from './manage-reports-routing.module';
import { ReportsListComponent } from './components/reports-list/reports-list.component';


@NgModule({
  declarations: [
    ReportsListComponent
  ],
  imports: [
    CommonModule,
    ManageReportsRoutingModule
  ]
})
export class ManageReportsModule { }
