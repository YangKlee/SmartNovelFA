import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorListService {

  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7134/api/AuthorList';

  getAuthors(
    keyword: string = '',
    currentPage: number = 1,
    pageSize: number = 10
  ) {

    const params = new HttpParams()
      .set('keyword', keyword)
      .set('currentPage', currentPage)
      .set('pageSize', pageSize);

    return this.http.get<any>(this.apiUrl, { params });
  }
}