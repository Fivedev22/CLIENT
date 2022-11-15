import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClient } from './interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  CLIENT_URL = 'http://localhost:3000/api/client/'

  constructor(private readonly http: HttpClient) { }

  findAll(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.CLIENT_URL);
  }

  findOne(id: number): Observable<IClient> {
    return this.http.get<IClient>(`${this.CLIENT_URL}${+id}`)
  }

  create(client: IClient): Observable<IClient> {
    return this.http.post<IClient>(`${this.CLIENT_URL}create`, client);
  }

  update(id: number, client: IClient): Observable<IClient> {
    return this.http.patch<IClient>(`${this.CLIENT_URL}update/${+id}`, client);
  }

  remove(id: number): Observable<IClient> {
    return this.http.delete<IClient>(`${this.CLIENT_URL}remove/${+id}`);
  }
}
