import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProvince } from './interfaces/province.interface';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  PROVINCE_URL = 'http://localhost:3000/api/province/'

  constructor(private readonly http: HttpClient) { }

  findAll(): Observable<IProvince[]> {
    return this.http.get<IProvince[]>(this.PROVINCE_URL);
  }

  findOne(id: number): Observable<IProvince> {
    return this.http.get<IProvince>(`${this.PROVINCE_URL}${id}`);
  }

}
