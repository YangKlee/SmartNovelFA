import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { MenuNav } from '../../models/menu-nav/menu-nav.model';
import { HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MenuNavServices {

  apiUrl = "https://localhost:7134/api/MenuNav";

  constructor(private http: HttpClient) { }
  private headerUpdateSource = new BehaviorSubject<boolean>(false);
  headerUpdate$ = this.headerUpdateSource.asObservable();
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json"
    }),
  };
  getMenuByRole(roleId: string): Observable<MenuNav[]> {
    return this.http.get<MenuNav[]>(`${this.apiUrl}/${roleId}`, this.httpOptions);
  }
  updateHeader(isReload: boolean) {
    this.headerUpdateSource.next(isReload);
  }
}