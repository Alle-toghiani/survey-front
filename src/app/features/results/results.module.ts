import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { ResultsContainerComponent } from './components/results-container/results-container.component';


@NgModule({
  declarations: [
    ResultsContainerComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule
  ]
})
export class ResultsModule { }
