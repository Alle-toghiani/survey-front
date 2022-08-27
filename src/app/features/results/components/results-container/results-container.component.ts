import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { MainLayoutService } from "@services";
import { PorslineQuestion, SharedModel, SurveyReport } from "@models";
import { RoutesEnum } from "@enums";
import { Question } from "../../../../models/porsline-models/porsline-reports.model";
import { SurveyHttpService } from "../../../../services/survey-http.service";

@Component({
  selector: 'app-results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.scss']
})
export class ResultsContainerComponent implements OnInit {

  questionsArray: Question[] | PorslineQuestion[];
  singleQuestion: PorslineQuestion;

  isListMode = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mainLayoutService: MainLayoutService,
    private surveyHttpService: SurveyHttpService
  ) { }

  ngOnInit(): void {
    const sid = this.route.snapshot.params[RoutesEnum.SURVEY_ID_PARAM];
    if (sid){
      this.surveyHttpService.getPreview(sid).subscribe(
        res => {
          if (res.success){
            this.questionsArray = res.data;
          }
        }
      )
    }

    if (this.route.snapshot.params[RoutesEnum.REPORT_PARAM]){
      this.isListMode = false;
      this.questionsArray = (this.route.snapshot.data['surveyResolverData'] as SharedModel<SurveyReport>).data.questions;
      this.mainLayoutService.actionbarConfigSubject.next(
        {
          isBackDisabled: true,
          actions: [{
            title: 'results.actionbar.users-login',
            iconType: 'user',
            color: 'orange',
            link: ['/' + RoutesEnum.AUTH, RoutesEnum.LOGIN]
          }]
        }
      )
    }
  }
}
