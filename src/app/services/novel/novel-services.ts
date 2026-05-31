
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from "../../models/user/user.model"
import { LoginRespone } from "../../models/auth/login-respone"

import { environment } from "../../env"
@Injectable({
  providedIn: 'root',
})
export class NovelServices {
    private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json"
    }),
  };
  private URL_NOVEL = `${environment.apiUrl}/Novel`
  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }
  public getUserNovel(): Observable<any>
  {
    return this.httpClient.get<any>(`${this.URL_NOVEL}/getUserNovel`, this.httpOptions);
  }
}
