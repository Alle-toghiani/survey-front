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
    return this.http.get<SharedModel<FolderModel[]>>(environment.backendBaseUrl + 'folders');
  }

  getMockFolders(): Observable<FolderModel[]>{
    const mockUrl = 'assets/mock-jsons/mock-folders.json';
    return this.http.get<FolderModel[]>(mockUrl);
  }
}
