import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";

import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

import { SharedModel, PorslineSurvey } from "@models";
import { MainLayoutService } from "@services";
import { RoutesEnum } from "@enums";

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit, AfterViewInit, OnDestroy {

  survey: PorslineSurvey;
  subscriptions = new Subscription();
  surveyId;

  constructor(
    private route: ActivatedRoute,
    private mainLayoutService: MainLayoutService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.surveyId = this.route.snapshot.params[RoutesEnum.SURVEY_ID_PARAM];
    this.survey = (this.route.snapshot.data['surveyResolverData'] as SharedModel<PorslineSurvey>).data;
  }

  ngAfterViewInit() {
    this.initActionbar();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
}
