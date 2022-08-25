import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {RoutesEnum} from "@enums";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";

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
        return token;
      } else {
        this.onTokenExpired();
      }
    } else {
      this.onNavigateToLogin();
    }
    return undefined;
  }

  isUserAdmin(): boolean{
    const token = this.getToken();
    return !(this.jwtService.decodeToken(token).parentId);
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
