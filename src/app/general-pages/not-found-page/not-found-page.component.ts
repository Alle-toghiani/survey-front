import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule} from "@ngx-translate/core";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';
import {Router} from "@angular/router";
import {RoutesEnum} from "../../enums/routes.enum";

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
