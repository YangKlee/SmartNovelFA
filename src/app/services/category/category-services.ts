import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../env';
@Injectable({
  providedIn: 'root'
})
export class CategoryServices {
  private  URL_CATEGORY: string = `${environment.apiUrl}/Categories`;

  constructor(private httpClient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json"
    }),
  };
  public getAllActiveCategory(): Observable<any>{
    return this.httpClient.get<any>(`${this.URL_CATEGORY}/active`);
  }
    getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
