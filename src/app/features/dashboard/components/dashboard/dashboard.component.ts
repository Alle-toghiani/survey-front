import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router} from "@angular/router";

import { Subscription } from "rxjs";

import { HeaderModel} from "@shared-components/src/app/main-layout/models/header.model";
import { ActionbarModel} from "@shared-components/src/app/main-layout/models/actionbar.model";

import { MainLayoutService, TokenService} from "@services";
import { RoutesEnum} from "@enums";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  headerConfig: HeaderModel;
  actionbarConfig: ActionbarModel = {
    isBackDisabled: true,
    actions: [
      {
        title: 'dashboard.actionbar.manage-apiKey',
        iconType: 'key',
        color:'green',
        link: ['/'+RoutesEnum.DASHBOARD, RoutesEnum.API_TOKEN]
      },
      {
        title:'mods.manage',
        iconType: 'crown',
        color:'orange',
        link: ['/'+RoutesEnum.DASHBOARD, RoutesEnum.ADMINS]
      }
    ]
  }

  subscriptions = new Subscription();

  constructor(
    private layoutService: MainLayoutService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && val.url === '/'+ RoutesEnum.DASHBOARD) {
        this.initDashboardActionbar();
      }
    });
  }

  ngOnInit() {
    this.initDashboardActionbar();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private initDashboardActionbar(): void{
    if (this.tokenService.isUserAdmin()){
      this.layoutService.actionbarConfigSubject.next(this.actionbarConfig);
    }
  }
}
