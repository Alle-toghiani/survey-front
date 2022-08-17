import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { DashboardHttpService } from "../../services/dashboard-http.service";
import { FolderModel } from "@models";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscriptions = new Subscription();
  folders: FolderModel[] = [];

  constructor(
    private dashboardService: DashboardHttpService
  ) { }

  ngOnInit(): void {
    this.getFoldersData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getFoldersData(): void {
    this.subscriptions.add(
      this.dashboardService.getFoldersAndSurveys().subscribe({
        next: (response) => {
          if (response.success){
            this.folders = response.data;
          }
        }
      })
    )
  }
}
