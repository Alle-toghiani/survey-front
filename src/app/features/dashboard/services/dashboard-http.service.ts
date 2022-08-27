import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { FolderModel, SharedModel} from "@models";
import { environment } from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardHttpService {

  constructor(
    private http: HttpClient
  ) { }

  getFoldersAndSurveys(): Observable<SharedModel<FolderModel[]>> {
    return this.http.get<SharedModel<FolderModel[]>>(environment.backendBaseUrl + 'survey/folders');
  }

  getMockFolders(): Observable<FolderModel[]>{
    const mockUrl = 'assets/mock-jsons/mock-folders.json';
    return this.http.get<FolderModel[]>(mockUrl);
  }

  setApiToken(apiToken: string): Observable<SharedModel<any>>{
    const url = environment.backendBaseUrl + 'auth/api-token';
    return this.http.post<SharedModel<any>>(url, {apiToken});
  }

  createMod(modUsername: string): Observable<SharedModel<any>>{
    const url = environment.backendBaseUrl + 'auth/mods/create';
    return this.http.post<SharedModel<any>>(url, { username: modUsername});
  }

  getModsList(): Observable<SharedModel<any>>{
    const url = environment.backendBaseUrl + 'auth/mods';
    return this.http.get<SharedModel<any>>(url);
  }

  deleteMod(modUsername: string): Observable<SharedModel<any>>{
    const url = environment.backendBaseUrl + 'auth/mods';
    return this.http.delete<SharedModel<any>>(url, {body: {username: modUsername}});
  }
}
