import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { TranslateModule} from "@ngx-translate/core";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { RoutesEnum } from "@enums";

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  imports: [NzButtonModule,TranslateModule,NzIconModule]
})
export class NotFoundPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onRedirectClicked(): void{
    this.router.navigate(['/'+RoutesEnum.DASHBOARD]);
  }
}
