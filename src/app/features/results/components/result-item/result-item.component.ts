import { Component, OnInit, Input } from '@angular/core';

import { SurveyQuestion } from "@models";

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss']
})
export class ResultItemComponent implements OnInit {

  @Input() data: SurveyQuestion;
  
  constructor() { }

  ngOnInit(): void {
  }

}
