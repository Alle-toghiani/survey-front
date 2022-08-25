import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {EMPTY, Observable} from "rxjs";

import {environment} from "@environments/environment";
import {SurveyModel} from "@models";

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
}
