import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { SurveyQuestion, SharedModel } from "@models";

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.scss']
})
export class SurveyDetailsComponent implements OnInit {

  questionData: SurveyQuestion;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.questionData = (this.route.snapshot.data['surveyResolverData'] as SharedModel<SurveyQuestion>).data;
  }
}
