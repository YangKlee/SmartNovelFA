import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env';

@Injectable({
  providedIn: 'root'
})
export class UserBlockService {

  private apiUrl = `${environment.apiUrl}/user-block`;

  constructor(private http: HttpClient) { }

  blockAuthor(authorId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/block/${authorId}`,
      {}
    );
  }

  unBlockAuthor(authorId: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/unblock/${authorId}`
    );
  }

  getBlockedUsers(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/blocked-users`
    );
  }
}