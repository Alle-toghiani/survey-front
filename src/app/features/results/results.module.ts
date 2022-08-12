import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzDividerModule } from "ng-zorro-antd/divider";
import { TranslateModule } from "@ngx-translate/core";

import { ViewChartModule } from "@shared-components/src/app/view-chart/view-chart.module";
import { ResultsRoutingModule } from './results-routing.module';
import { ResultsContainerComponent } from './components/results-container/results-container.component';
import { ResultItemComponent } from './components/result-item/result-item.component';

@NgModule({
  declarations: [
    ResultsContainerComponent,
    ResultItemComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    NzDividerModule,
    TranslateModule,
    ViewChartModule
  ]
})
export class ResultsModule { }
