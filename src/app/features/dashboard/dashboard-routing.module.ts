import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {RoutesEnum} from "@enums";
import {FoldersSurveysListComponent} from "./components/folders-surveys-list/folders-surveys-list.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {
        path: '', component: FoldersSurveysListComponent
      },
      {
        path: RoutesEnum.SURVEYS,
        loadChildren:() => import('../manage-reports/manage-reports.module').then(m => m.ManageReportsModule)
      },
      {
        path: RoutesEnum.NOT_FOUND_PAGE,
        loadComponent: () => import('../../common/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
