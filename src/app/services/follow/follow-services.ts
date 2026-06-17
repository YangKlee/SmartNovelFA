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
  providedIn: 'root'
})
export class UserFollowService {

  private apiUrl = `${environment.apiUrl}/user-relation`;

  constructor(private http: HttpClient) { }

  // Theo dõi người dùng
  follow(uid: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.apiUrl}/follow/${uid}`,
      {}
    );
  }

  // Bỏ theo dõi
  unfollow(uid: string): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.apiUrl}/follow/${uid}`
    );
  }

  // Kiểm tra đã follow chưa
  isFollowing(uid: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/is-following/${uid}`
    );
  }

  // Danh sách follower
  getFollowers(uid: string): Observable<UserSimpleDto[]> {
    return this.http.get<UserSimpleDto[]>(
      `${this.apiUrl}/followers/${uid}`
    );
  }

  // Danh sách following
  getFollowing(uid: string): Observable<UserSimpleDto[]> {
    return this.http.get<UserSimpleDto[]>(
      `${this.apiUrl}/following/${uid}`
    );
  }
}
