import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";

import { TranslateModule} from "@ngx-translate/core";

import { SurveyDetailsComponent} from "./survey-details.component";
import { WidgetContainerModule} from "@shared-components/src/app/widget-container/widget-container.module";

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule} from "@angular/forms";
import { AngularSvgIconModule} from "angular-svg-icon";

const routes: Routes = [
  {
    path: '',
    component: SurveyDetailsComponent
  }
];

@NgModule({
  declarations: [
    SurveyDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    WidgetContainerModule,
    NzButtonModule,
    NzDropDownModule,
    NzToolTipModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
    FormsModule,
    AngularSvgIconModule
  ]
})
export class SurveyDetailsModule { }
