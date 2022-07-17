import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {EMPTY, map, Observable, of} from 'rxjs';
import {SurveyModel, SurveyQuestion} from "../../models/survey.model";
import {RoutesEnum} from "../../enums/routes.enum";
import {ManageReportsHttpService} from "./manage-reports-http.service";
import {SharedModel} from "../../models/shared.model";
import {CustomValidatorsService} from "../../services/custom-validators.service";
interface SurveyResolverType {
  success: boolean,
  survey: SurveyModel,
  details: SurveyQuestion,
  errorMessage?: string
}
@Injectable({
  providedIn: 'root'
})
export class SurveyResolver implements Resolve<SharedModel<SurveyModel | SurveyQuestion>> {
  constructor(
    private surveyHttpService: ManageReportsHttpService,
    private validatorService: CustomValidatorsService,
    private router: Router
  ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SharedModel<SurveyModel | SurveyQuestion>> | Promise<SharedModel<SurveyModel | SurveyQuestion>> | SharedModel<SurveyModel | SurveyQuestion>{
    const sid = route.params[RoutesEnum.SURVEY_ID_PARAM];
    const qid = route.params[RoutesEnum.QUESTION_ID_PARAM];
    if ( this.validatorService.isSurveyIdValid(sid) && this.validatorService.isQuestionIdValid(qid) ) {
      return this.surveyHttpService.getSurveyQuestionDetails(sid, qid)
      //TODO handle error
    } else if (this.validatorService.isSurveyIdValid(sid)) {
      return this.surveyHttpService.getSurvey(sid);
    } else {
      this.router.navigate(['/'+RoutesEnum.NOT_FOUND_PAGE])
      return EMPTY;
    }
  }
}
