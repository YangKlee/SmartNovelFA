import { Injectable } from '@angular/core';
import { environment } from '../../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuDashboard } from '../../models/menu-dashboard/menu-dashboard';


@Injectable({
  providedIn: 'root',
})
export class DashboardServices {
  private URL_DASHBOARD = `${environment.apiUrl}/Dashboard`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(
    private httpClient: HttpClient,
  ) { }

  getMenuDashboard(): Observable<MenuDashboard[]> {
    return this.httpClient.get<any>(`${this.URL_DASHBOARD}/getMenuDashboard`, this.httpOptions);
  }



}
