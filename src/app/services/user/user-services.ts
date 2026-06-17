import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { User } from '../../models/user/user.model';
import { LoginRespone } from '../../models/auth/login-respone';
import { environment } from '../../env';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  private URL_USER = `${environment.apiUrl}/User`;

  constructor(private httpClient: HttpClient) { }
  private URL_Account = `${environment.apiUrl}/Account`
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json"
    }),
  };

  private userUpdatedSource = new Subject<void>();
  userUpdated$ = this.userUpdatedSource.asObservable();

  public notifyUserUpdated() {
    this.userUpdatedSource.next();
  }

  public getUserInfo(): Observable<User> {
    return this.httpClient.get<any>(`${this.URL_Account}/accountInfo`, this.httpOptions);
  }
  public updateInfoAccount(body: any): Observable<any> {
    return this.httpClient.post<any>(`${this.URL_Account}/updateInfoAccount`, body, this.httpOptions);
  }
  public changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.httpClient.post<any>(`${this.URL_Account}/changePassword`, { oldPassword, newPassword }, this.httpOptions);
  }
  public changeAvatar(fileAvatar: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.URL_Account}/changeAvatar`, fileAvatar);
  }
  public changeAuthor(): Observable<any> {
    return this.httpClient.post<any>(`${this.URL_Account}/change-author`, {}, this.httpOptions);
  }
  public recordChapterView(chapterID: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/Chapters/ghiLuotXem/${chapterID}`, this.httpOptions);
  }
  public getHistoryView(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.URL_Account}/getHistoryView`, this.httpOptions);
  }
}

