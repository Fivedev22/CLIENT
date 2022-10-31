import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/index';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  canActivate(): boolean {
    if (!this.authService.isAuth()) {
      this.router.navigate([''])
      return false
    }
    return true;
  }
}