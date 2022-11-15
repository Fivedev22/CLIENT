import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { IRegisterUser } from '../models/register-user';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  AUTH_URL = 'http://localhost:3000/api/client/';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  public getAllClient(): Observable<any> {
    return this.http.get(`${this.AUTH_URL}`);
  }

  public registerClient(body: IRegisterUser): Observable<any> {
    return this.http.post(`${this.AUTH_URL}create`, body);
  }

  public deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.AUTH_URL}remove/ ${id}`);
  }

  public getIOneClient(id: number): Observable<any> {
    return this.http.get(`${this.AUTH_URL}${id} `);
  }
}
