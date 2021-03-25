import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import firebase from 'firebase/app';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate{
  constructor(
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(
      (resolve, reject)=>{
      firebase.auth().onAuthStateChanged(
        (user) => {
          if(user) {
            resolve(true);
          } else {
            this.router.navigate(['/auth', 'signin']);
            resolve(false);
          }
        }
      )
    });
  }

}
