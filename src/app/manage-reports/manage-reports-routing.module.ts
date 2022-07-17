import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutesEnum} from "../enums/routes.enum";
import { SurveyResolver} from "./services/survey.resolver";
import { ReportsListComponent} from "./components/reports-list/reports-list.component";
import { SurveyDetailsComponent} from "./components/survey-details/survey-details.component";

const routes: Routes = [
  { path: ':' + RoutesEnum.SURVEY_ID_PARAM,
    component: ReportsListComponent,
    resolve: { surveyData: SurveyResolver} },

  { path: ':' + RoutesEnum.SURVEY_ID_PARAM + '/details/:' + RoutesEnum.QUESTION_ID_PARAM,
    component: SurveyDetailsComponent,
    resolve: { surveyData: SurveyResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageReportsRoutingModule { }
