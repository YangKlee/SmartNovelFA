import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env';

@Injectable({
  providedIn: 'root'
})
export class CategoryNovelService {

  private URL_CATEGORY_NOVEL =
    `${environment.apiUrl}/CategoryNovel`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  // Lấy danh sách truyện theo slug thể loại
   
  public getNovelByCategory(
    slug: string,
    currentPage: number = 1,
    pageSize: number = 12
  ): Observable<any> {

    return this.httpClient.get<any>(
      `${this.URL_CATEGORY_NOVEL}/${slug}?currentPage=${currentPage}&pageSize=${pageSize}`
    );
  }
}