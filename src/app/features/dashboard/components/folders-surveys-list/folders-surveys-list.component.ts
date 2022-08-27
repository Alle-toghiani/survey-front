import {Component, OnInit} from '@angular/core';

import { Subscription } from "rxjs";

import { FolderModel } from "@models";
import { DashboardHttpService } from "../../services/dashboard-http.service";

@Component({
  selector: 'app-folders-surveys-list',
  templateUrl: './folders-surveys-list.component.html',
  styleUrls: ['./folders-surveys-list.component.scss']
})
export class FoldersSurveysListComponent implements OnInit {

  subscriptions = new Subscription();
  folders: FolderModel[] = [];
  isLoading = true;
  copyButtonTranslationKey = 'dashboard.table.copy-report-link';

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
          this.isLoading = false;
          if (response.success){
            this.folders = response.data;
          }
        }
      })
    )
  }

  onCopySurveyReportLink(reportCode: string): void{
    const url = 'https://survey.porsline.ir/r/' + reportCode;
    // this.clipboardService.copyFromContent(url);
    this.copyButtonTranslationKey = 'dashboard.table.copied';

  }
}
