import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { SharedModel } from "@models";
import { environment } from "@environments/environment";
import {SignInReqModel, SignupReqModel} from "../models/auth-shared.model";

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  constructor(
    private http: HttpClient
  ) { }

  signup(data: SignupReqModel): Observable<SharedModel<any>>{
    const url = environment.backendBaseUrl + 'auth/signup';
    return this.http.post<SharedModel<any>>(url, data);
  }

  signIn(data: SignInReqModel): Observable<SharedModel<any>>{
    const url = environment.backendBaseUrl + 'auth/signin';
    return this.http.post<SharedModel<any>>(url, data);
  }
}
