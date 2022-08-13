import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutesEnum} from "@enums";
import { MainLayoutModule} from "@shared-components/src/app/main-layout/main-layout.module";

const routes: Routes = [
  {path: '', redirectTo:RoutesEnum.SURVEYS, pathMatch: 'full'},
  {path: RoutesEnum.DASHBOARD, redirectTo: RoutesEnum.SURVEYS, },
  {path: RoutesEnum.SURVEYS, loadChildren:() => import('./features/manage-reports/manage-reports.module').then(m => m.ManageReportsModule)},
  {path: RoutesEnum.NOT_FOUND_PAGE, loadComponent: () => import('./common/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent)},
  {path: '**', redirectTo: RoutesEnum.NOT_FOUND_PAGE}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MainLayoutModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
