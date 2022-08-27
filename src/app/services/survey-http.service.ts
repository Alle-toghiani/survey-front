import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { EMPTY, map, Observable } from "rxjs";

import { environment } from "@environments/environment";
import {
  CustomChartSettings, PorslineQuestion, SharedModel,
  SurveyReport, PorslineSurvey, PorslineReport
} from "@models";

@Injectable({
  providedIn: 'root'
})
export class SurveyHttpService {

  constructor(
    private http: HttpClient
  ) { }

  getReport(reportId: string): Observable<SharedModel<SurveyReport>>{
    const url = environment.backendBaseUrl + 'survey/r/' + reportId;
    return this.http.get<SharedModel<PorslineReport>>(url).pipe(map(
      report => (
        {
          ...report,
          data: {
            ...report.data,
            questions: Object.values(report.data.questions)
          }
        })
    ));
  }

  getSurvey(surveyId: number): Observable<SharedModel<PorslineSurvey>>{
    const url = environment.backendBaseUrl + 'survey/' + surveyId;

    return this.http.get<SharedModel<PorslineSurvey>>(url)
  }

  getQuestion(sid: string, qid: string): Observable<SharedModel<PorslineQuestion>>{
    return this.http.get<SharedModel<PorslineQuestion>>(environment.backendBaseUrl + 'survey/' + sid + '/details/' + qid)
  }

  getPreview(sid: string): Observable<SharedModel<PorslineQuestion[]>>{
    return this.http.get<SharedModel<PorslineQuestion[]>>(environment.backendBaseUrl + 'survey/' + sid + '/preview/')
  }

  updateChartSettings(sid: string, qid: string, data: CustomChartSettings): Observable<SharedModel<any>>{
    const url = environment.backendBaseUrl + 'survey/' + sid + '/details/' + qid
    return this.http.put<SharedModel<any>>(url, data);
  }
}
