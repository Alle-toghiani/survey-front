import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from "@ngx-translate/core";
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from "ng-zorro-antd/input";
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzRadioModule,
    NzCheckboxModule
  ]
})
export class AuthModule { }
