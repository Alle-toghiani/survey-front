import { Component, OnDestroy} from '@angular/core';
import { Subscription } from "rxjs";

import { MainLayoutService } from "./services/main-layout.service";
import { HeaderModel } from "@shared-components/src/app/main-layout/models/header.model";
import { ActionbarModel } from "@shared-components/src/app/main-layout/models/actionbar.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'survey-front';
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
