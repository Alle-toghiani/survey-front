import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { SharedModel, SurveyModel } from "@models";

@Component({
  selector: 'app-results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.scss']
})
export class ResultsContainerComponent implements OnInit {

  survey: SurveyModel;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.survey = (this.route.snapshot.data['surveyResolverData'] as SharedModel<SurveyModel>).data;
  }
}
