import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TranslateModule} from "@ngx-translate/core";

import {WidgetContainerModule} from "@shared-components/src/app/widget-container/widget-container.module";
import {TokenService} from "@services";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonModule} from "ng-zorro-antd/button";
import {Subscription} from "rxjs";
import {DashboardHttpService} from "../../services/dashboard-http.service";

@Component({
  selector: 'app-api-token-page',
  standalone: true,
  imports: [
    CommonModule,
    WidgetContainerModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule
  ],
  templateUrl: './api-token-page.component.html',
  styleUrls: ['./api-token-page.component.scss']
})
export class ApiTokenPageComponent implements OnInit {

  isApiTokenValid: boolean;
  isLoadingSubmitBtn = false;

  apiTokenForm = new FormGroup({
    apiToken: new FormControl(null,
      [
        Validators.required,
        Validators.minLength(40),
        Validators.maxLength(48)])
  })

  subscriptions = new Subscription();

  constructor(
    private tokenService: TokenService,
    private dashboardService: DashboardHttpService
  ) { }

  ngOnInit(): void {
    this.getApiTokenStatus();
  }

  getApiTokenStatus(): void{
    this.isApiTokenValid = !!this.tokenService.isApiTokenValid();
  }

  submitForm(): void{
    const apiToken = this.apiTokenForm.value.apiToken;
    this.isLoadingSubmitBtn = true;
    this.subscriptions.add(
      this.dashboardService.setApiToken(apiToken).subscribe(
        {
          next: setTokenRes => {
            this.isLoadingSubmitBtn = false;
            if ( setTokenRes.success){
              console.log('success');
            }
          },
          error: err => {
            this.isLoadingSubmitBtn = false;
          }
        }
      )
    )
  }

}
