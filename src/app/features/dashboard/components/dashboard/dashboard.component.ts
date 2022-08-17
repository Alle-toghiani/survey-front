import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { DashboardHttpService } from "../../services/dashboard-http.service";
import { FolderModel } from "@models";
import {HeaderModel} from "@shared-components/src/app/main-layout/models/header.model";
import {ActionbarModel} from "@shared-components/src/app/main-layout/models/actionbar.model";
import {MainLayoutService} from "@services";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  headerConfig: HeaderModel;
  actionbarConfig: ActionbarModel;

  subscriptions = new Subscription();

  constructor(private layoutService: MainLayoutService) {
    this.subscriptions.add(
      this.layoutService.headerConfigSubject.subscribe(header => {
        this.headerConfig = header;
      })
    )
    this.subscriptions.add(
      this.layoutService.actionbarConfigSubject.subscribe(actionbar => {
        this.actionbarConfig = actionbar;
      })
    )
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
