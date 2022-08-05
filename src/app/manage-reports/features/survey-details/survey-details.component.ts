import { Component, OnInit} from '@angular/core';
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

const colors = [
  'rgb(255, 99, 132)',
  'rgb(54, 162, 235)',
  'rgb(75, 192, 192)',
  'rgb(255, 159, 64)',
  'rgb(153, 102, 255)',
  'rgb(255, 205, 86)',
  'rgb(201, 203, 207)'
]

interface ChartData {
  labels: string[];
  datasets: ChartDataset[]
}
interface ChartDataset {
  type?: ChartTypes;
  label?: string;
  backgroundColor: string | string[];
  data: number[]
}

type ChartTypes = typeof ChartTypes[keyof typeof ChartTypes];

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.scss']
})
export class SurveyDetailsComponent implements OnInit {

  chart;
  questionData: SurveyQuestion;
  isLoadedChart = false;
  selectedChartType: ChartTypes;
  chartInvalidError = false;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadDataInit();
  }

  loadDataInit(): void{
    this.questionData = (this.route.snapshot.data['surveyResolverData'] as SharedModel<SurveyQuestion>).data;
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

    this.chart = new Chart('canvas', {
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
    this.isLoadedChart = true;
  }

  reloadChart(event):void{
    if (event !== this.selectedChartType){
      this.selectedChartType = event;
      this.chart.destroy();
      this.isLoadedChart = false;
      this.generateChartData();
    }
  }

  get chartTypesValues(): string[]{
    return [... new Set(Object.values(ChartTypes))]
  }
}
