import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuNav } from '../../models/menu-nav/menu-nav.model';

@Injectable({
  providedIn: 'root'
})
export class MenuNavServices {

  apiUrl = "https://localhost:7134/api/MenuNav";

  constructor(private http: HttpClient) { }

  getMenuByRole(roleId: string): Observable<MenuNav[]> {
    return this.http.get<MenuNav[]>(`${this.apiUrl}/${roleId}`);
  }
}