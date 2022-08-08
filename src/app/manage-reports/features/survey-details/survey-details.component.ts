import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import Chart from 'chart.js/auto';
import { ChartTypeRegistry } from "chart.js";
import { Subscription} from "rxjs";
import { TranslateService} from "@ngx-translate/core";

import { ActionbarModel, ActionItem } from "@shared-components/src/app/main-layout/models/actionbar.model";
import { ManageReportsHttpService } from "../../services/manage-reports-http.service";
import { MainLayoutService } from "../../../services/main-layout.service";
import { SurveyQuestion } from "../../../models/survey.model";
import { SharedModel } from "../../../models/shared.model";
import { RoutesEnum } from "../../../enums/routes.enum";

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

const colors = [
  'rgb(255, 99, 132)',
  'rgb(54, 162, 235)',
  'rgb(75, 192, 192)',
  'rgb(255, 159, 64)',
  'rgb(153, 102, 255)',
  'rgb(255, 205, 86)',
  'rgb(201, 203, 207)',
  '#00ff00',
  '#ff00ff',
  '#00ffff',
  '#ffa500'
]

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.scss']
})
export class SurveyDetailsComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvasRef: ElementRef;
  surveyId: string;
  ctx;
  chart;
  questionData: SurveyQuestion;
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

    this.layoutService.actionbarClickEvent.subscribe(item => {
      this.onActionbarClicked(item);
    })
  }

  ngAfterViewInit() {
    if (this.questionData){
      this.initChart();
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

  initChart(): void{
    const chartType = this.questionData.customChartSettings ? this.questionData.customChartSettings.type : this.questionData.charts[0].type;
    if (chartType && ChartTypes[chartType]) {
      this.selectedChartType = ChartTypes[chartType];
      this.generateChartData();
    } else {
      this.chartInvalidError = true;
    }
  }

  generateChartData(): void {
    let chartLabels: string[] = [];
    let datasetFrequecy: number[] = [];
    this.questionData.choices.forEach(choice => {
      chartLabels.push(choice.title);
      datasetFrequecy.push(choice.frequency)
    })

    this.isLoading = false;
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: this.selectedChartType as keyof ChartTypeRegistry,
      data: {
        labels: chartLabels,
        datasets: [
          {
            data: datasetFrequecy,
            fill: colors,
            backgroundColor: colors,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            title:{
              text: this.questionData.title
            }
          }
        }
      }
    });
    this.isLoading = false;
  }

  reloadChart(event):void{
    if (event !== this.selectedChartType){
      this.selectedChartType = event;
      this.chart.destroy();
      this.isLoading = true;
      this.generateChartData();
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
