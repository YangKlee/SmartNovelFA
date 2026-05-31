import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Novel } from '../../models/novel/novel.model';
@Injectable({
  providedIn: 'root',
})
export class NovelServices {
apiUrl = 'http://localhost:5283/api';

  constructor(
    private http: HttpClient
  ) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json"
    }),
  };
  getNovel(slug: string) :Observable<Novel>{

    return this.http.get<any>(
      `${this.apiUrl}/novel/${slug}`,
      this.httpOptions
    );
  }

  getChapters(novelId: string) {

    return this.http.get(
      `${this.apiUrl}/novel/${novelId}/chapters`,
      this.httpOptions
    );
  }
  
}
