import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsListComponent} from "./components/reports-list/reports-list.component";
import { RoutesEnum} from "../enums/routes.enum";
import { SurveyDetailsComponent} from "./components/survey-details/survey-details.component";

const routes: Routes = [
  {path: ':' + RoutesEnum.SURVEY_ID_PARAM, component: ReportsListComponent },
  {path: ':' + RoutesEnum.SURVEY_ID_PARAM + '/details/:' + RoutesEnum.QUESTION_ID_PARAM, component: SurveyDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageReportsRoutingModule { }
