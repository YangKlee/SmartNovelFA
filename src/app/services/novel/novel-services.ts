import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class NovelServices {
apiUrl = 'http://localhost:5283/api';

  constructor(
    private http: HttpClient
  ) { }

  getNovel(slug: string) {

    return this.http.get(
      `${this.apiUrl}/novel/${slug}`
    );
  }

  getChapters(novelId: string) {

    return this.http.get(
      `${this.apiUrl}/novel/${novelId}/chapters`
    );
  }
  
}
