import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportServices {

  private apiUrl = 'https://localhost:7134/api';

  constructor(
    private http: HttpClient
  ) { }

  reportComment(data: any) {
    return this.http.post(
      `${this.apiUrl}/CommentReport/create`,
      data
    );
  }

  reportChapter(data: any) {
    return this.http.post(
      `${this.apiUrl}/ChapterReport`,
      data
    );
  }

  reportNovel(data: any) {
  return this.http.post(
    `${this.apiUrl}/NovelReport`,
    data
   );
 }
}