 import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../env';
import ur from '@angular/common/locales/ur';
@Injectable({
  providedIn: 'root',
})
export class ChapterServices {
  private  URL_CHAPTER: string = `${environment.apiUrl}/Chapters`;  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json"
    }),
  };
  constructor(private httpClient: HttpClient) { }
  public getChapterByNovel(novelID: string)
  {
    return this.httpClient.get<any>(`${this.URL_CHAPTER}/getChapterByNovel/${novelID}`)
  }
}
