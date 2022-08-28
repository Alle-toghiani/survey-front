import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {RoutesEnum} from "@enums";
import {TokenService} from "@services";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {
  }

  private guard(url?: string): boolean | Observable<boolean> | Promise<boolean> {
    const isUserAdmin = this.tokenService.isUserAdmin();
    if (isUserAdmin) {
      return true;
    }
    this.router.navigate(['/' + RoutesEnum.NOT_FOUND_PAGE]);
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.guard(state.url);
  }

}
