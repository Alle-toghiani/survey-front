import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { SharedModel } from "@models";
import { environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardHttpService {

  constructor(
    private http: HttpClient
  ) { }

  getFoldersAndSurveys(): Observable<SharedModel<any>> {
    return this.http.get<SharedModel<any>>(environment.backendBaseUrl + 'folders');
  }
}
