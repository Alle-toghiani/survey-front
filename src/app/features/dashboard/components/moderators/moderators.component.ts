import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moderators',
  templateUrl: './moderators.component.html',
  styleUrls: ['./moderators.component.scss']
})
export class ModeratorsComponent implements OnInit {

  isLoadingWidget = false;

  constructor() { }

  ngOnInit(): void {
  }

}
