import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env';

export interface UserSimpleDto {
  uid: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
}
@Injectable({
  providedIn: 'root',
})
export class BlockServices {
   private apiUrl = `${environment.apiUrl}/user-relation`;

  constructor(private http: HttpClient) { }

  // Chặn user
  block(uid: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.apiUrl}/block/${uid}`,
      {}
    );
  }

  // Bỏ chặn user
  unblock(uid: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.apiUrl}/block/${uid}`
    );
  }

  // Kiểm tra đã block chưa
  isBlocked(uid: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/is-blocked/${uid}`
    );
  }

  // Danh sách user đã block
  getBlockedUsers(): Observable<UserSimpleDto[]> {
    return this.http.get<UserSimpleDto[]>(
      `${this.apiUrl}/blocked`
    );
  }
}
