import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env';

@Injectable({
  providedIn: 'root'
})
export class NovelInteractionService {

  private apiUrl = `${environment.apiUrl}/novel-interaction`;

  constructor(private http: HttpClient) { }

  followNovel(novelId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/follow/${novelId}`,
      {}
    );
  }

  unFollowNovel(novelId: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/unfollow/${novelId}`
    );
  }

  getFollowingNovels(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/following`
    );
  }

  rateNovel(novelId: string, score: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/rate`,
      {
        novelId,
        score
      }
    );
  }
}