import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RoutesEnum} from "@enums";
import {AuthGuard} from "./guards/auth.guard";
import {SurveyDetailsResolver} from "@services";

const routes: Routes = [
  {
    path: 'r/:'+RoutesEnum.REPORT_PARAM,
    loadChildren: () => import('./features/results/results.module').then(m => m.ResultsModule),
    resolve: { surveyResolverData: SurveyDetailsResolver}
  },
  {
    path: '',
    redirectTo: RoutesEnum.DASHBOARD,
    pathMatch: 'full'
  },
  {
    path: RoutesEnum.DASHBOARD,
    loadChildren: ()=> import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: RoutesEnum.AUTH,
    loadChildren: ()=> import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: RoutesEnum.NOT_FOUND_PAGE,
    loadComponent: () => import('./common/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent)
  },
  {
    path: '**',
    redirectTo: RoutesEnum.NOT_FOUND_PAGE
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
