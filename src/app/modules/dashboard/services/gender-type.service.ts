import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGenderType } from './interfaces/gender-type.interface';


@Injectable({
  providedIn: 'root'
})
export class GenderTypeService {

  GENDER_TYPE_URL = 'http://localhost:3000/api/gender-type/'
  constructor(private readonly http: HttpClient) { }

  findAll(): Observable<IGenderType[]> {
    return this.http.get<IGenderType[]>(this.GENDER_TYPE_URL);
  }

  findOne(id: number): Observable<IGenderType> {
    return this.http.get<IGenderType>(`${this.GENDER_TYPE_URL}${id}`);
  }

}
