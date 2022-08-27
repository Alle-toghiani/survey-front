import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

import {TranslateModule} from "@ngx-translate/core";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDividerModule} from "ng-zorro-antd/divider";

import {WidgetContainerModule} from "@shared-components/src/app/widget-container/widget-container.module";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-moderators',
  templateUrl: './moderators.component.html',
  standalone: true,
  imports: [
    CommonModule,
    WidgetContainerModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzDividerModule
  ],
  styleUrls: ['./moderators.component.scss']
})
export class ModeratorsComponent implements OnInit {

  isLoadingWidget = false;

  isLoadingSubmitBtn = false;

  createdModLink: string;

  createModForm = new FormGroup({
    username: new FormControl(null, Validators.required)
  })

  subscriptions = new Subscription();

  constructor() { }

  ngOnInit(): void {
  }

  submitForm(): void{

  }

}
