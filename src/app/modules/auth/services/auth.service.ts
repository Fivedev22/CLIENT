import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { IIngresar, IRestablecerContrasenia, ISolicitarRestablecerContrasenia } from '../models/index'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  AUTH_URL = 'http://localhost:3000/usuario/'


  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  public ingresar(body: IIngresar) {
    return this.http.post(`${this.AUTH_URL}ingreso`, body)
  }

  public restablecerContrasenia(body: IRestablecerContrasenia) {
    return this.http.put(`${this.AUTH_URL}restablecer-contrasenia`, body)
  }

  public solicitarRestablecerContrasenia(body: ISolicitarRestablecerContrasenia) {
    return this.http.put(`${this.AUTH_URL}restablecer-contrasenia`, body)
  }

  private isAuth(): boolean {
    const token: any = localStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
      return false;
    }
    return true;
  }
}


