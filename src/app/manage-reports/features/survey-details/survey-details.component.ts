import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute} from "@angular/router";

import Chart from 'chart.js/auto';
import { ChartTypeRegistry} from "chart.js";

import { SurveyModel, SurveyQuestion} from "../../../models/survey.model";
import { SharedModel} from "../../../models/shared.model";

const ChartTypes = {
  1: "bar",
  2: "pie",
  BAR : "bar",
  PIE : "pie",
  DOUGHNUT : "doughnut",
  LINE : "line",
  POLAR_AREA : "polarArea",
  RADAR : "radar",
}

type ChartTypes = typeof ChartTypes[keyof typeof ChartTypes];

const colors = [
  'rgb(255, 99, 132)',
  'rgb(54, 162, 235)',
  'rgb(75, 192, 192)',
  'rgb(255, 159, 64)',
  'rgb(153, 102, 255)',
  'rgb(255, 205, 86)',
  'rgb(201, 203, 207)'
]



@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.scss']
})
export class SurveyDetailsComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvasRef: ElementRef;
  ctx;
  chart;
  questionData: SurveyQuestion;
  isLoading = true;
  selectedChartType: ChartTypes;
  chartInvalidError = false;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.questionData = (this.route.snapshot.data['surveyResolverData'] as SharedModel<SurveyQuestion>).data;
  }

  ngAfterViewInit() {
    if (this.questionData){
      this.initChart();
    }
  }

  initChart(): void{
    const chartType = this.questionData.charts[0].type;
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

  get chartTypesValues(): string[]{
    return [... new Set(Object.values(ChartTypes))]
  }
}
