import { Component, OnInit } from '@angular/core';
import {MainLayoutService} from "../../../services/main-layout.service";
import {HeaderModel} from "../../../../../shared-components/src/app/main-layout/models/header.model";

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
  constructor(
    private layoutService: MainLayoutService
  ) { }

  ngOnInit(): void {
    this.layoutService.headerConfigSubject.next(this.headerConfig);
  }

}
