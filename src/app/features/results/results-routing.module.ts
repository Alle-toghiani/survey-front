import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResultsContainerComponent } from "./components/results-container/results-container.component";

const routes: Routes = [
  {path: '', component: ResultsContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
