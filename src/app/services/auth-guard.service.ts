import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Verifico si el usuario logeo
    if (localStorage.getItem('token')) {
      return state.url.startsWith('/profile')
        ? true
        : (this.router.navigate['/'], false);
    } else {
      return state.url.startsWith('/profile')
        ? (this.router.navigate['/'], false)
        : true;
    }
  }
}
