import {Component, Input, OnInit} from '@angular/core';

import {FolderModel} from "@models";

@Component({
  selector: 'app-folders-surveys-list',
  templateUrl: './folders-surveys-list.component.html',
  styleUrls: ['./folders-surveys-list.component.scss']
})
export class FoldersSurveysListComponent implements OnInit {

  @Input('data') folderData: FolderModel[];

  constructor() { }

  ngOnInit(): void {
  }
  
}
