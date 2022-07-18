import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";

import { TranslateModule} from "@ngx-translate/core";

import { SurveyDetailsComponent} from "./survey-details.component";
import { WidgetContainerModule} from "@shared-components/src/app/widget-container/widget-container.module";

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
    WidgetContainerModule
  ]
})
export class SurveyDetailsModule { }
