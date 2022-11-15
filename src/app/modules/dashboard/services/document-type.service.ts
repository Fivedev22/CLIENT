import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDocumentType } from './interfaces/document-type.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  DOCUMENT_TYPE_URL = 'http://localhost:3000/api/document-type/'
  constructor(private readonly http: HttpClient) { }

  findAll(): Observable<IDocumentType[]> {
    return this.http.get<IDocumentType[]>(this.DOCUMENT_TYPE_URL);
  }

  findOne(id: number): Observable<IDocumentType> {
    return this.http.get<IDocumentType>(`${this.DOCUMENT_TYPE_URL}${id}`);
  }
}
