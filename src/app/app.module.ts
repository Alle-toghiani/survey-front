import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from "@angular/common/http";

import { AngularSvgIconModule} from "angular-svg-icon";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutModule} from "@shared-components/src/app/main-layout/main-layout.module";

import { TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { TranslateHttpLoader} from "@ngx-translate/http-loader";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      MainLayoutModule,
      HttpClientModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
