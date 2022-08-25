import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";

import { JwtModule} from "@auth0/angular-jwt";
import { TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import { TranslateHttpLoader} from "@ngx-translate/http-loader";
import { AngularSvgIconModule} from "angular-svg-icon";
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzButtonModule } from 'ng-zorro-antd/button';

import {RequestSetTokenInterceptor, ResponseNotificationInterceptor} from "@services";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function translateFactory(translate: TranslateService) {
  return async () => {
    translate.setDefaultLang('fa');
    translate.use('fa');
    return new Promise<void>(resolve => {
      translate.onLangChange.subscribe(() => {
        resolve();
      });
    });
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      NzNotificationModule,
      NzButtonModule,
      JwtModule,
      AngularSvgIconModule.forRoot(),
      TranslateModule.forRoot({
        defaultLanguage: 'fa',
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        }
      })
    ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseNotificationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestSetTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
