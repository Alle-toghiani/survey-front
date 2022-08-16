import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FoldersSurveysListComponent } from "./components/folders-surveys-list/folders-surveys-list.component";

const routes: Routes = [
  {path: '', component: FoldersSurveysListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
