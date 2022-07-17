import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";

import { SurveyModel} from "../../../models/survey.model";
import { SharedModel} from "../../../models/shared.model";

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {
  survey: SurveyModel;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.survey = (this.route.snapshot.data['surveyResolverData'] as SharedModel<SurveyModel>).data;
  }

}
