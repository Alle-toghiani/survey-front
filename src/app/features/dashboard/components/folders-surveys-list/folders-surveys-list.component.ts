import {Component, OnInit} from '@angular/core';

import { Subscription } from "rxjs";
import { ClipboardService } from 'ngx-clipboard'

import { FolderModel } from "@models";
import { DashboardHttpService } from "../../services/dashboard-http.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-folders-surveys-list',
  templateUrl: './folders-surveys-list.component.html',
  styleUrls: ['./folders-surveys-list.component.scss']
})
export class FoldersSurveysListComponent implements OnInit {

  subscriptions = new Subscription();
  createSurveyForm = new FormGroup({
    name: new FormControl(null,Validators.required)
  })
  folders: FolderModel[] = [];
  selectedFolderId: number;
  isLoading = true;

  isVisibleModal = false;
  isLoadingModalSubmitBtn = false;
  surveyCreatedSuccessfully = false;

  copiedReportCode: string;

  constructor(
    private dashboardService: DashboardHttpService,
    private clipboardService: ClipboardService
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
    const url = window.origin + '/r/' + reportCode;
    this.clipboardService.copy(url);
    this.copiedReportCode = reportCode;
  }

  onShowCreateModal(folderId, event): void{
    event.stopPropagation();
    this.selectedFolderId = folderId;
    this.isVisibleModal = true;
  }

  onModalCancel(){
    this.surveyCreatedSuccessfully = false;
    this.selectedFolderId = undefined;
    this.isVisibleModal = false;
    this.createSurveyForm.reset();
  }

  onModalSubmit(){
    const newSurveyTitle = this.createSurveyForm.value.name;
    if (newSurveyTitle && this.selectedFolderId){
      const createSurveyData = {
        folder : this.selectedFolderId,
        name: newSurveyTitle
      }
      this.isLoadingModalSubmitBtn = true;
      this.subscriptions.add(
        this.dashboardService.initializeSurvey(createSurveyData).subscribe(
          {
            next: initRes => {
              this.isLoadingModalSubmitBtn = false;
              if (initRes.success){
                this.getFoldersData();
                this.surveyCreatedSuccessfully = true;
                setTimeout( () => {
                  this.onModalCancel();
                }, 3000);

              }
            },
            error: err => {
              this.isLoadingModalSubmitBtn = false;
            }
          }
        )
      )
    }
  }
}
