import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../../models/user/user.model';
import { LoginRespone } from '../../models/auth/login-respone';
import { environment } from '../../env';

@Injectable({
  providedIn: 'root',
})
export class UserServices {

  private userLogined: User | null = null;

  private URL_USER = `${environment.apiUrl}/User`;

  constructor(private httpClient: HttpClient) {}

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
  }



}