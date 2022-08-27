import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

import {TranslateModule} from "@ngx-translate/core";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzAlertModule} from "ng-zorro-antd/alert";

import {WidgetContainerModule} from "@shared-components/src/app/widget-container/widget-container.module";
import {TablesModule} from "@shared-components/src/app/tables/tables.module";
import {Subscription} from "rxjs";
import {DashboardHttpService} from "../../services/dashboard-http.service";
import {RoutesEnum} from "@enums";
import {ClipboardService} from "ngx-clipboard";

@Component({
  selector: 'app-moderators',
  templateUrl: './moderators.component.html',
  standalone: true,
  imports: [
    CommonModule,
    WidgetContainerModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzDividerModule,
    NzAlertModule,
    TablesModule
  ],
  styleUrls: ['./moderators.component.scss']
})
export class ModeratorsComponent implements OnInit {

  subscriptions = new Subscription();
  createModForm = new FormGroup({
    username: new FormControl(null, Validators.required)
  })

  isLoadingWidget = false;
  isLoadingSubmitBtn = false;
  createdUser: {username: string, password: string, link: string}
  copyBtnText = 'common.copy';

  modsList: {username:string, surveys: string[]}[] = [];

  constructor(
    private dashboardHttpService: DashboardHttpService,
    private clipboardService: ClipboardService
  ) { }

  ngOnInit(): void {
    this.getModsList();
  }

  submitForm(): void{
    const modUsername = this.createModForm.value.username;
    this.isLoadingSubmitBtn = true;
    if (modUsername){
      this.subscriptions.add(
        this.dashboardHttpService.createMod(modUsername).subscribe(
          {
            next: (res) => {
              this.isLoadingSubmitBtn = false;
              if (res.success){
                this.createdUser = {...res.data, link: this.generateLink(res.data)};
                this.getModsList();
              }
            },
            error: err => {
              this.isLoadingSubmitBtn = false
            }
          }
        )
      )
    }
  }

  getModsList(): void{
    this.subscriptions.add(
      this.dashboardHttpService.getModsList().subscribe(
        {
          next: (modsListRes) => {
            if (modsListRes.success){
              this.modsList = modsListRes.data;
            }
          }
        }
      )
    )
  }

  generateLink(user){
    if (user.username && user.password){
      return window.origin + '/' + RoutesEnum.AUTH + '/' + RoutesEnum.LOGIN + '?username=' + user.username + '&password=' + user.password;
    } else return '';
  }

  onCopyLink(){
    this.clipboardService.copy(this.createdUser.link);
    this.copyBtnText = 'common.copied';
  }

}
