import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable, from} from "rxjs";

import { environment} from "../../../../environments/environment";
import { SharedModel} from "../../../models/shared.model";
import { SurveyModel, SurveyQuestion, CustomChartSettings} from "../../../models/survey.model";

@Injectable({
  providedIn: 'root'
})
export class ManageReportsHttpService {

  constructor(private http: HttpClient) { }

  getSurvey(surveyId: number): Observable<SharedModel<SurveyModel>>{
    return this.http.get<SharedModel<SurveyModel>>(environment.backendBaseUrl + 'survey/' + surveyId);
  }

  getSurveyQuestionDetails(sid: string, qid: string): Observable<SharedModel<SurveyQuestion>>{
    return this.http.get<SharedModel<SurveyQuestion>>(environment.backendBaseUrl + 'survey/' + sid + '/details/' + qid)
  }

  updateChartSettings(sid: string, qid: string, data: CustomChartSettings): Observable<SharedModel<any>>{
    const url = environment.backendBaseUrl + 'survey/' + sid + '/details/' + qid
    return this.http.put<SharedModel<any>>(url, data);
  }
}
