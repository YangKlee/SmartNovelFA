import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
export class FollowServices {
  private URL_FOLLOW = `${environment.apiUrl}/Follow`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  /**
   * Theo dõi truyện
   * @param novelId Mã truyện
   */
  public followNovel(novelId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.URL_FOLLOW}/followNovel/${novelId}`, this.httpOptions);
  }

  /**
   * Bỏ theo dõi truyện
   * @param novelId Mã truyện
   */
  public unFollowNovel(novelId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.URL_FOLLOW}/unFollowNovel/${novelId}`, this.httpOptions);
  }

  /**
   * Theo dõi tác giả
   * @param authorId Mã tác giả
   * @param novelId Mã truyện liên quan (gửi kèm lên form)
   */
  public followAuthor(authorId: string, novelId: string): Observable<any> {
    const formData = new FormData();
    formData.append('authorId', authorId);
    formData.append('novelID', novelId);
    return this.httpClient.post<any>(`${this.URL_FOLLOW}/followAuthor`, formData);
  }

  /**
   * Bỏ theo dõi tác giả
   * @param authorId Mã tác giả
   * @param novelId Mã truyện liên quan (nếu có)
   */
  public unFollowAuthor(authorId: string, novelId?: string): Observable<any> {
    const formData = new FormData();
    formData.append('authorId', authorId);
    if (novelId) {
      formData.append('novelID', novelId);
    }
    return this.httpClient.post<any>(`${this.URL_FOLLOW}/unFollowAuthor`, formData);
  }

  /**
   * Chặn tác giả
   * @param authorId Mã tác giả
   */
  public blockAuthor(authorId: string): Observable<any> {
    const formData = new FormData();
    formData.append('authorId', authorId);
    return this.httpClient.post<any>(`${this.URL_FOLLOW}/BlockAuthor`, formData);
  }

  /**
   * Bỏ chặn tác giả
   * @param authorId Mã tác giả
   */
  public unBlockAuthor(authorId: string): Observable<any> {
    const formData = new FormData();
    formData.append('authorId', authorId);
    return this.httpClient.post<any>(`${this.URL_FOLLOW}/UnBlockAuthor`, formData);
  }

  /**
   * Lấy danh sách truyện đang theo dõi
   */
  public getFollowedNovels(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.URL_FOLLOW}/followedNovels`, this.httpOptions);
  }

  /**
   * Lấy danh sách tác giả đang theo dõi
   */
  public getFollowedAuthors(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.URL_FOLLOW}/followedAuthors`, this.httpOptions);
  }

  /**
   * Lấy danh sách tác giả đang chặn
   */
  public getBlockedAuthors(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.URL_FOLLOW}/blockedAuthors`, this.httpOptions);
  }
  // Danh sách follower
  getFollowers(uid: string): Observable<UserSimpleDto[]> {
    return this.httpClient.get<UserSimpleDto[]>(
      `${this.URL_FOLLOW}/followers/${uid}`
    );
  }

  // Danh sách following
  getFollowing(uid: string): Observable<UserSimpleDto[]> {
    return this.httpClient.get<UserSimpleDto[]>(
      `${this.URL_FOLLOW}/following/${uid}`
    );
  }
}
