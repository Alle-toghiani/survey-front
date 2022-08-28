import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";

import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

import { SharedModel, PorslineSurvey } from "@models";
import {MainLayoutService, SurveyHttpService} from "@services";
import { RoutesEnum } from "@enums";
import {ManageReportsHttpService} from "../../services/manage-reports-http.service";

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit, AfterViewInit, OnDestroy {

  survey: PorslineSurvey;
  subscriptions = new Subscription();
  surveyId;
  questionSubmittedSuccessfully = false;
  submitISLoading = false;
  isLoadingList = false;

  constructor(
    private route: ActivatedRoute,
    private mainLayoutService: MainLayoutService,
    private translateService: TranslateService,
    private httpService: ManageReportsHttpService,
    private surveyHttpService: SurveyHttpService
  ) {}

  ngOnInit(): void {
    this.surveyId = this.route.snapshot.params[RoutesEnum.SURVEY_ID_PARAM];
    this.getQuestions();
  }

  ngAfterViewInit() {
    this.initActionbar();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getQuestions() {
    this.isLoadingList = true;
    this.subscriptions.add(
      this.surveyHttpService.getSurvey(this.surveyId).subscribe(
        {
          next: surveyRes => {
            this.isLoadingList = false;
            if (surveyRes.success){
              this.survey = surveyRes.data;
            }
          },
          error: err => {
            this.isLoadingList = false;
          }
        }
      )
    )
  }

  getQuestionType(qtype: number, answerType):string{
    if (qtype === 3) return 'survey-details.create.multipleChoice';
    else if (qtype === 2) {
      if (answerType === 1){
        return 'survey-details.create.text-questions-long';
      } else return 'survey-details.create.text-questions-short'
    }
    else return qtype.toString();
  }

  initActionbar(): void{
    this.mainLayoutService.actionbarConfigSubject.next(
      {
        actions: [{
          title: this.translator('reports-list.view-preview'),
          iconType: 'group',
          color: 'orange',
          link: ['/' + RoutesEnum.DASHBOARD, RoutesEnum.SURVEYS, this.surveyId, RoutesEnum.SURVEY_PREVIEW]
        }]
      }
    )
  }

  translator(word: string): string{
    let translatedWord = "";
    this.subscriptions.add(this.translateService.get(word.toLowerCase()).subscribe(
      result => {
        translatedWord = result;
      }
    ));
    return translatedWord;
  }

  deleteQuestion(qid: string): void{
    this.subscriptions.add(
      this.httpService.deleteQuestion(this.surveyId, qid).subscribe(
        {
          next: (deleteRes) => {
            if (deleteRes.success){
              this.getQuestions();
            }
          }
        }
      )
    )
  }

  submitQuestion(data: any, qUrl: string){
    this.submitISLoading = true;
    this.subscriptions.add(
      this.httpService.postQuestion(this.surveyId, data, qUrl).subscribe(
        {
          next: postQuestionRes => {
            this.submitISLoading = false;
            if (postQuestionRes.success){
              this.questionSubmittedSuccessfully = true;
              this.getQuestions();
            }
          },
          error: err => {
            this.submitISLoading = false;
            console.log(err);
          }
        }
      )
    )
  }
}
