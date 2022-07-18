import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SurveyModel, SurveyQuestion} from "../../../models/survey.model";
import {SharedModel} from "../../../models/shared.model";

enum ChartType {
  BAR = "bar",
  PIE = "pie",
  DOUGHNUT = "doughnut",
  LINE = "line",
  POLAR_AREA = "polarArea",
  RADAR = "RADAR"
}

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.scss']
})
export class SurveyDetailsComponent implements OnInit {

  questionData: SurveyQuestion;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.questionData = (this.route.snapshot.data['surveyResolverData'] as SharedModel<SurveyQuestion>).data;
  }


}
