import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';

import {TokenService} from "@services";
import {RoutesEnum} from "@enums";
import {environment} from "@environments/environment";

const WhiteList = [
  'assets',
  RoutesEnum.AUTH+'/'+RoutesEnum.LOGIN,
  RoutesEnum.AUTH+'/'+RoutesEnum.SIGNUP,
  'r/'
]

@Injectable()
export class RequestSetTokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!(request instanceof HttpResponse)){
      if (!WhiteList.some( whiteListUrl => request.url.startsWith(environment.backendBaseUrl + '/' + whiteListUrl))) {
        const token = this.tokenService.getToken();
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
      }
    }
    return next.handle(request);
  }
}
