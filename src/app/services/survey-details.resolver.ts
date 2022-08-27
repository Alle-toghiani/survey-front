import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import {EMPTY, Observable} from 'rxjs';

import { RoutesEnum } from "@enums";
import { SharedModel, SurveyModel, SurveyQuestion } from "@models";
import { CustomValidatorsService, SurveyHttpService } from "@services";

@Injectable({
  providedIn: 'root'
})
export class SurveyDetailsResolver implements Resolve<SharedModel<SurveyModel | SurveyQuestion>> {
  constructor(
    private surveyHttpService: SurveyHttpService,
    private validatorService: CustomValidatorsService,
    private router: Router
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<SharedModel<any>> |
    Promise<SharedModel<any>> |
    SharedModel<any> {
    const sid = route.params[RoutesEnum.SURVEY_ID_PARAM];
    const qid = route.params[RoutesEnum.QUESTION_ID_PARAM];
    const reportCode = route.params[RoutesEnum.REPORT_PARAM];
    if ( reportCode && this.validatorService.isReportCodeValid(reportCode)){
      return this.surveyHttpService.getReport(reportCode)
    }
    else if ( sid && this.validatorService.isSurveyIdValid(sid)) {
    if (this.validatorService.isQuestionIdValid(qid)){
      return this.surveyHttpService.getQuestion(sid, qid);
    }
    return this.surveyHttpService.getSurvey(sid);
    //TODO handle error
    } else {
      this.router.navigate(['/' + RoutesEnum.DASHBOARD, RoutesEnum.NOT_FOUND_PAGE])
      return EMPTY;
    }
  }
}
