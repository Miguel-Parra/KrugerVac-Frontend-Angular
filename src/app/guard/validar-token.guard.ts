import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {


  constructor(
    private authService: AuthService,
    private _router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot): Observable<boolean> | boolean {
  const path = route.url[0].path
  console.log("Guard canActivate");
  
  return this.authService.validarToken(path!)
  .pipe(
    tap(valid => {
      if (!valid) {
        this._router.navigateByUrl('/auth/')
      }
    })
    );
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    const path = route.path
    console.log("Guard canLoad");
    return this.authService.validarToken(path!)
      .pipe(
        tap(valid => {
          if (!valid) {
            this._router.navigateByUrl('/auth/')
          } 
        })
      );
  }
}