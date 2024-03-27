import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _Router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(localStorage.getItem('userToken'));
    console.log(localStorage.getItem('userRole'));

    if (localStorage.getItem('userToken') !== null && localStorage.getItem('userRole') == 'SuperAdmin') {
      console.log('guard true');

      return true;

    }
    else {
      console.log('guard false');

      this._Router.navigate(['/auth/login'])
      return false;

    }
  }

}
