import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, Subscription, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslateService} from "@ngx-translate/core";

@Injectable()
export class ResponseConfigInterceptor implements HttpInterceptor {
  subscriptions = new Subscription();
  constructor(
    private notification: NzNotificationService,
    private translateService: TranslateService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Unauthorized) {
          // this.logoutService.logout();
        }
        if (error.error && error.status !== HttpStatusCode.Forbidden && error.status !== 0) {
          if (error.error.errors && Array.isArray(error.error.errors)) {
            error.error.errors.forEach(element => {
              this.createErrorNotification(element);
            });
          }
          if (error.error.errors && typeof error.error.errors === 'string') {
            this.createErrorNotification(error.error.errors);
          } else if (!error.error.errors) {
            this.createErrorNotification(error.error.message || error.message)
          }
        }
        return throwError(error);
      })
    );
  }

  createErrorNotification(errorMessage: string): void{
    this.notification.create(
      "error",
      this.translator("notification.type.error"),
      errorMessage
    )
  }

  translator(word: string) {
    let translatedWord = "";
    this.subscriptions.add(this.translateService.get(word.toLowerCase()).subscribe(
      result => {
        translatedWord = result;
      }
    ));
    return translatedWord;
  }
}
