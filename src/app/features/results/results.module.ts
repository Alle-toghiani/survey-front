import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    ResultsRoutingModule
  ]
})
export class ResultsModule { }
