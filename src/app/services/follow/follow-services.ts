import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface FollowedNovel {
  novelId: string;
  title: string;
  slug: string;
  imageNovelUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private api = 'https://localhost:7134/api/novel-interaction';

  constructor(private http: HttpClient) {}

  // GET danh sách đang follow
  getFollowedNovels(): Observable<FollowedNovel[]> {
    return this.http.get<FollowedNovel[]>(`${this.api}/following`);
  }

  // FOLLOW
  followNovel(novelId: string) {
    return this.http.post(`${this.api}/follow/${novelId}`, {});
  }

  // UNFOLLOW
  unfollowNovel(novelId: string) {
    return this.http.delete(`${this.api}/unfollow/${novelId}`);
  }
}