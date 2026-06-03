import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../env';
import ur from '@angular/common/locales/ur';
import { Chapter } from '../../models/chapter/chapter.model';
@Injectable({
  providedIn: 'root',
})
export class ChapterServices {
  private URL_CHAPTER: string = `${environment.apiUrl}/Chapters`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json"
    }),
  };
  isReloadChapterManagerment = new BehaviorSubject<boolean>(false);
  constructor(private httpClient: HttpClient) { }
  public getChapterByNovel(novelID: string) {
    return this.httpClient.get<any>(`${this.URL_CHAPTER}/getChapterByNovel/${novelID}`)
  }
  public createChapter(novelID: string, body: any) {
    return this.httpClient.post<any>(`${this.URL_CHAPTER}/createChapter/${novelID}`, body, this.httpOptions)
  }
  public updateChapter(novelID: string, chapterID: string, body: any): Observable<any> {
    return this.httpClient.put<any>(`${this.URL_CHAPTER}/ModifyChapter/${chapterID}`, body, this.httpOptions)
  }
  public deleteChapter(chapterID: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.URL_CHAPTER}/DeleteChapter/${chapterID}`, this.httpOptions)
  }
  public getChapterForReader(novelID: string, chapterID: string): Observable<Chapter> {
    return this.httpClient.get<any>(`${this.URL_CHAPTER}/getChapterForReader?novelID=${novelID}&chapterID=${chapterID}`, this.httpOptions)
  }

  public seachChapterAuthor(novelID: string, status: string, keyword: string, pageNumber: number = 1, pageSize: number = 10000000): Observable<any> {
    const params = new HttpParams()
      .set('novelID', novelID)
      .set('status', status)
      .set('keyworld', keyword)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.httpClient.get<any>(`${this.URL_CHAPTER}/seachChapterAuthor`, { params });
  }

  public getTotalCountSeachChapterAuthor(novelID: string, status: string, keyword: string): Observable<number> {
    const params = new HttpParams()
      .set('novelID', novelID)
      .set('status', status)
      .set('keyworld', keyword);
    return this.httpClient.get<number>(`${this.URL_CHAPTER}/seachNovelAuthor/count`, { params });
  }

}
