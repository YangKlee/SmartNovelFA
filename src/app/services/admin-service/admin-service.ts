import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env';
import { User } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
private API_URL = `${environment.apiUrl}/UsersAdmin`;

  constructor (private http: HttpClient) { }

  public getUsers(keyword ?:string , role?:string, status?:string, page:number =1): Observable<any> {
    let prams =new HttpParams().set('page', page.toString());
    if (keyword) {
      prams = prams.set('keyword', keyword);
    }
    if (role) {
      prams = prams.set('role', role);
    }
    if (status) {
      prams = prams.set('status', status);
    }
    return this.http.get<any>(this.API_URL, { params: prams });
  }

  createUser(data: User): Observable<any> {
    return this.http.post(`${this.API_URL}/create`, data);
  }

  updateUser(id: string, data: User): Observable<any> {
    return this.http.put(`${this.API_URL}/update/${id}`, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/delete/${id}`);
  }

}
