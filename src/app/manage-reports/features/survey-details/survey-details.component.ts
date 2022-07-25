import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";

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

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.scss']
})
export class SurveyDetailsComponent implements OnInit {

  questionData: SurveyQuestion;

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
      this.selectedChartType = ChartTypes[chartType]
    } else {
      this.chartInvalidError = true;
    }
  }

  get chartTypesValues(): string[]{
    return [... new Set(Object.values(ChartTypes))]
  }
}
