import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http";

import { AngularSvgIconModule} from "angular-svg-icon";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainLayoutModule} from "../../shared-components/src/app/main-layout/main-layout.module";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      MainLayoutModule,
      HttpClientModule,
      AngularSvgIconModule.forRoot()
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
