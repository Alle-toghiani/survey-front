import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { EMPTY, Observable } from 'rxjs';

import { RoutesEnum } from "@enums";
import { SharedModel, SurveyModel, SurveyQuestion } from "@models";
import { ManageReportsHttpService } from "../features/manage-reports/services/manage-reports-http.service";
import { CustomValidatorsService } from "./custom-validators.service";

@Injectable({
  providedIn: 'root'
})
export class SurveyDetailsResolver implements Resolve<SharedModel<SurveyModel | SurveyQuestion>> {
  constructor(
    private surveyHttpService: ManageReportsHttpService,
    private validatorService: CustomValidatorsService,
    private router: Router
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SharedModel<SurveyModel | SurveyQuestion>> | Promise<SharedModel<SurveyModel | SurveyQuestion>> | SharedModel<SurveyModel | SurveyQuestion>{
    const sid = route.params[RoutesEnum.SURVEY_ID_PARAM];
    const qid = route.params[RoutesEnum.QUESTION_ID_PARAM];
    if ( this.validatorService.isSurveyIdValid(sid)) {
      if (this.validatorService.isQuestionIdValid(qid)){
        return this.surveyHttpService.getSurveyQuestionDetails(sid, qid);
      }
      return this.surveyHttpService.getSurvey(sid);
      //TODO handle error
    } else {
      this.router.navigate(['/' + RoutesEnum.DASHBOARD, RoutesEnum.NOT_FOUND_PAGE])
      return EMPTY;
    }
  }
}
