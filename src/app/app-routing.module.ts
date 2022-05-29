import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent} from "../../shared-components/src/app/main-layout/main-layout.component";
import { MainLayoutModule} from "../../shared-components/src/app/main-layout/main-layout.module";

const routes: Routes = [
  {path: '', redirectTo:'manage-reports', pathMatch: 'full'},
  {path: 'manage-reports', loadChildren:() => import('./manage-reports/manage-reports.module').then(m => m.ManageReportsModule)},
  {path: '**', redirectTo: 'manage-reports'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MainLayoutModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
