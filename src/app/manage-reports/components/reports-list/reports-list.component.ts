import { Component, OnInit } from '@angular/core';
import {MainLayoutService} from "../../../services/main-layout.service";
import {HeaderModel} from "@shared-components/src/app/main-layout/models/header.model";
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {SurveyModel} from "../../../models/survey.model";
import {Subscription} from "rxjs";
import {ManageReportsHttpService} from "../../services/manage-reports-http.service";
import { RoutesEnum} from "../../../enums/routes.enum";

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {
  headerConfig: HeaderModel = {
    title : {value: 'مجموعه شماره یک'},
    subtitle: {value: 'نظرسنجی کارکنان'},
  }
  surveyId: string;
  survey: SurveyModel;
  subscriptions = new Subscription();

  constructor(
    private layoutService: MainLayoutService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: ManageReportsHttpService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.surveyId = params[RoutesEnum.SURVEY_ID_PARAM];
      this.isRouteValid(this.surveyId) ? this.getSurveyInfo(+this.surveyId) : this.redirectToNotFound();
    })
  }

  isRouteValid(id: string): boolean{
    return (!isNaN(+id) && id.length === 6)
  }

  redirectToNotFound():void{
    this.router.navigate(['/not-found'], {relativeTo: null});
  }

  getSurveyInfo(surveyId: number): void{
    this.subscriptions.add(
      this.httpService.getSurvey(surveyId).subscribe(
        res => {
          this.survey = res;
          this.headerConfig.subtitle.value = this.survey.name;
          this.layoutService.headerConfigSubject.next(this.headerConfig);
        },
        error => {
          console.log(error)
        }
      )
    )
  }

}
