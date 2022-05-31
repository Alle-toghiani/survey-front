import { Injectable } from '@angular/core';
import {HeaderModel} from "../../../shared-components/src/app/main-layout/models/header.model";
import {Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainLayoutService {

  headerConfigSubject = new Subject<HeaderModel>();


  constructor() {

  }

}
