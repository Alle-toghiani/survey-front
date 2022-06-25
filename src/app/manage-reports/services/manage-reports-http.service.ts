import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { environment} from "../../../environments/environment";
import { SurveyModel} from "../../models/survey.model";
import {Observable, from} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManageReportsHttpService {

  constructor(private http: HttpClient) { }

  getSurvey(surveyId: number): Observable<SurveyModel>{
    return this.http.get<SurveyModel>(environment.backendBaseUrl + 'survey/' + surveyId);
  }
}
