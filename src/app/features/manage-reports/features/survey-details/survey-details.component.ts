import { AfterViewInit, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Subscription} from "rxjs";
import { TranslateService} from "@ngx-translate/core";

import { ActionbarModel, ActionItem } from "@shared-components/src/app/main-layout/models/actionbar.model";
import { ManageReportsHttpService } from "../../services/manage-reports-http.service";
import { MainLayoutService } from "@services";
import { SurveyQuestion, SharedModel } from "@models";
import { RoutesEnum } from "@enums";

const ChartTypes = {
  1: "bar",
  2: "pie",
  bar : "bar",
  pie : "pie",
  doughnut : "doughnut",
  line : "line",
  polarArea : "polarArea",
  radar : "radar",
}

type ChartTypes = typeof ChartTypes[keyof typeof ChartTypes];

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.scss']
})
export class SurveyDetailsComponent implements OnInit, AfterViewInit {

  surveyId: string;
  questionData: SurveyQuestion;
  chartData: SurveyQuestion;
  isLoading = true;
  selectedChartType: ChartTypes;
  chartInvalidError = false;
  subscriptions = new Subscription();
  actionbarItems: ActionbarModel;
  actionbarSaveChanges: ActionItem;

  constructor(
    private route: ActivatedRoute,
    private layoutService: MainLayoutService,
    private translateService: TranslateService,
    private httpService: ManageReportsHttpService
  ) { }

  ngOnInit(): void {
    this.surveyId = this.route.snapshot.params[RoutesEnum.SURVEY_ID_PARAM];
    this.questionData = (this.route.snapshot.data['surveyResolverData'] as SharedModel<SurveyQuestion>).data;
    this.chartData = this.questionData;


    this.layoutService.actionbarClickEvent.subscribe(item => {
      this.onActionbarClicked(item);
    })
  }

  ngAfterViewInit() {
    if (this.questionData){
      this.initChartConfigSelects();
    }
    this.initActionbar();
  }

  initActionbar(): void{
    this.actionbarSaveChanges = {
      title: this.translator('survey-details.save-changes'),
      iconType: 'save',
      color: "green"
    }
    this.updateActionBar();
  }

  updateActionBar():void{
    this.layoutService.actionbarConfigSubject.next(
      {
        actions: [this.actionbarSaveChanges]
      }
    );
  }

  initChartConfigSelects(): void{
    const chartType = this.questionData.customChartSettings ? this.questionData.customChartSettings.type : this.questionData.charts[0].type;
    if (chartType && ChartTypes[chartType]) {
      this.selectedChartType = ChartTypes[chartType];
    } else {
      this.chartInvalidError = true;
    }
  }

  reloadChart(event):void{
    if (event !== this.selectedChartType){
      this.selectedChartType = event;
      const updatedCustomChartSettings = {...this.questionData.customChartSettings, type: event};
      this.chartData = { ...this.questionData, customChartSettings: updatedCustomChartSettings};
    }
  }

  onActionbarClicked(itemTitle: string){
    switch (itemTitle) {
      case this.translator('survey-details.save-changes'): {
        this.saveChartChanges();
      }break;
    }
  }

  saveChartChanges(): void {
    if (this.isChartSettingsChanged()){
      const chartUpdateData = {
        type: this.selectedChartType
      }
      this._setLoading(true);
      this.subscriptions.add(
        this.httpService.updateChartSettings(this.surveyId, this.questionData.id.toString(), chartUpdateData).subscribe(
          {
            next: updateRes => {
              this._setLoading(false);
              this.questionData.customChartSettings = chartUpdateData;
            },
            error: err => this._setLoading(false)
          }
        )
      )
    }

  }

  isChartSettingsChanged(): boolean{
    return !this.questionData.customChartSettings || this.questionData.customChartSettings.type !== this.selectedChartType;
  }

  get chartTypesValues(): string[]{
    return [... new Set(Object.values(ChartTypes))]
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

  private _setLoading(isLoading: boolean): void{
    this.actionbarSaveChanges.isLoading = isLoading;
    this.updateActionBar();
  }
}
