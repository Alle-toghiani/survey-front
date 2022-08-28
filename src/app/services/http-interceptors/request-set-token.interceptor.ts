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
  RoutesEnum.AUTH+'/'+RoutesEnum.LOGIN,
  RoutesEnum.AUTH+'/'+RoutesEnum.SIGNUP,
  'survey/r/'
]

@Injectable()
export class RequestSetTokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!(request instanceof HttpResponse)){
      if (
        !WhiteList.some(
          whiteListUrl =>
            request.url.startsWith(environment.backendBaseUrl + whiteListUrl) || request.url.includes('assets/')
        )
      ) {
        const token = this.tokenService.getToken();
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
      }
    }
    return next.handle(request);
  }
}
