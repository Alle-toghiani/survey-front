import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsListComponent} from "./components/reports-list/reports-list.component";
import { RoutesEnum} from "../enums/routes.enum";

const routes: Routes = [
  {path: ':' + RoutesEnum.SURVEY_ID_PARAM, component: ReportsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageReportsRoutingModule { }
