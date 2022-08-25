import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {EMPTY, Observable} from "rxjs";

import {environment} from "@environments/environment";
import {CustomChartSettings, SharedModel, SurveyModel, SurveyQuestion} from "@models";

@Injectable({
  providedIn: 'root'
})
export class SurveyHttpService {

  constructor(
    private http: HttpClient
  ) { }

  getSurveyReportData(reportId: string):Observable<any>{
    const url = environment.backendBaseUrl + 'survey/r/' + reportId;
    return this.http.get(url);
  }

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
