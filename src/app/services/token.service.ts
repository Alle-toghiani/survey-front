import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { Subscription } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { NzNotificationService } from "ng-zorro-antd/notification";
import {TranslateService} from "@ngx-translate/core";

import {RoutesEnum} from "@enums";
import {MainLayoutService} from "./main-layout.service";

const enum LocalStorageKeys {
  CLIENT_TOKEN = 'client-token'
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  jwtService: JwtHelperService;
  subscriptions = new Subscription();

  constructor(
    private router: Router,
    private notificationService: NzNotificationService,
    private mainLayoutService: MainLayoutService
    // private translateService: TranslateService
  ) {
    this.jwtService = new JwtHelperService();
  }

  setToken(token: string): boolean{
    if (token){
      try {
        const decodedToken = this.jwtService.decodeToken(token);
        if (decodedToken.username){
          localStorage.setItem(LocalStorageKeys.CLIENT_TOKEN, token);
          this.mainLayoutService.headerConfigSubject.next({username: decodedToken.username, role: decodedToken.role})
          return true;
        }
      } catch (e) {
        return false;
      }

    }
    return false;
  }

  getToken(): string{
    const token = localStorage.getItem(LocalStorageKeys.CLIENT_TOKEN);
    if (token){
      if ( !this.jwtService.isTokenExpired(token)){
        const decodedToken = this.jwtService.decodeToken(token);
        this.mainLayoutService.headerConfigSubject.next({username: decodedToken.username, role: decodedToken.role})
        return token;
      } else {
        this.mainLayoutService.headerConfigSubject.next({username: null, role: 'VIEWER'})
        this.onTokenExpired();
      }
    } else {
      this.mainLayoutService.headerConfigSubject.next({username: null, role: 'VIEWER'})
    }
    return undefined;
  }

  isUserAdmin(): boolean{
    const token = this.getToken();
    const decodedToken = this.jwtService.decodeToken(token);
    return decodedToken.role === 'ADMIN';
  }

  isApiTokenValid(): boolean {
    const token = this.getToken();
    return this.jwtService.decodeToken(token).hasToken;
  }

  onTokenExpired(): void{
    // FIXME: injecting translateService causes Circular dependency;
    // this.notificationService.error(this.translator('auth.token-expired'), this.translator('auth.please-relogin'));
    this.notificationService.error('Token Expired', 'Please re-Login');

    this.onNavigateToLogin();
  }

  onNavigateToLogin(): void{
    localStorage.clear();
    this.router.navigate(['/'+ RoutesEnum.AUTH, RoutesEnum.LOGIN])
  }

  onSignOut(): void{
    this.mainLayoutService.headerConfigSubject.next({username: null, role: 'VIEWER'})
    this.onNavigateToLogin();
  }

  // translator(word: string): string{
  //   let translatedWord = "";
  //   this.subscriptions.add(this.translateService.get(word.toLowerCase()).subscribe(
  //     result => {
  //       translatedWord = result;
  //     }
  //   ));
  //   return translatedWord;
  // }

}
