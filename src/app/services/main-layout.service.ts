import {EventEmitter, Injectable} from '@angular/core';
import { Subject } from "rxjs";

import { HeaderModel } from "@shared-components/src/app/main-layout/models/header.model";
import { ActionbarModel } from "@shared-components/src/app/main-layout/models/actionbar.model";

@Injectable({
  providedIn: 'root'
})
export class MainLayoutService {

  headerConfigSubject = new Subject<HeaderModel>();

  actionbarConfigSubject = new Subject<ActionbarModel>();

  actionbarClickEvent = new EventEmitter<string>();

  constructor() {
  }

}
