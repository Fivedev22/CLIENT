import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';
import { IRegisterUser } from '../models/register-user';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  AUTH_URL = 'http://localhost:3000/cliente/'


  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  public registerClient(body: IRegisterUser):  Observable<any> {
    return this.http.post(`${this.AUTH_URL}registrar`, body)
  }

 
}


