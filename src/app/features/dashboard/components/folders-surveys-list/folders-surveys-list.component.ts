import {Component, Input, OnInit} from '@angular/core';

import {FolderModel} from "@models";
import {Subscription} from "rxjs";
import {DashboardHttpService} from "../../services/dashboard-http.service";

@Component({
  selector: 'app-folders-surveys-list',
  templateUrl: './folders-surveys-list.component.html',
  styleUrls: ['./folders-surveys-list.component.scss']
})
export class FoldersSurveysListComponent implements OnInit {

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
