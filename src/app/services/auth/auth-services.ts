import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../../models/user/user.model"
import {LoginRespone} from "../../models/auth/login-respone"
import { Login } from '../../component/auth/login/login';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthServices {
    private httpOptions={
    headers: new HttpHeaders({
        'Content-Type': "application/json",

    }),
  };
  private API_SERVER="https://localhost:7134/api"; 
  private URL_AUTH=`${this.API_SERVER}/Auth`
  constructor(private httpClient: HttpClient){}
  public login(txtUsername:string, txtPassword:string): Observable<LoginRespone>| Observable<any>
  {
    return this.httpClient.post<LoginRespone>(
      `${this.URL_AUTH}/Login`,
      {
        username: txtUsername,
        password: txtPassword
      },
      this.httpOptions
  );
  }
}
