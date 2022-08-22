import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';

import { Observable } from 'rxjs';

import {TokenService} from "@services";
import {RoutesEnum} from "@enums";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {
  }

  private guard(url?: string): boolean | Observable<boolean> | Promise<boolean> {
    const isTokenValid = this.tokenService.getToken();
    if (isTokenValid) {
      return true;
    }
    this.router.navigate(['/' + RoutesEnum.AUTH, RoutesEnum.LOGIN]);

    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.guard(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.guard(state.url);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.guard();
  }
}
