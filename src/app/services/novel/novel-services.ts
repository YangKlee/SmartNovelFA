import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../env';
import { Novel } from '../../models/novel/novel.model';
import { User } from '../../models/user/user.model';
import { LoginRespone } from '../../models/auth/login-respone';
import { Pagination } from '../../models/pagination/pagination';

@Injectable({
  providedIn: 'root',
})
export class NovelServices {
  // Base URLs được tách ra để giữ nguyên vẹn endpoint của cả 2 nhánh
  private URL_HOME = `${environment.apiUrl}`;
  private URL_NOVEL = `${environment.apiUrl}/Novel`;
  
  public reloadNovelList = new BehaviorSubject<boolean>(false);

  // --- Từ nhánh HomePage ---
  private mockNovelList: Novel[] = [];
  private mockUserList: User[] = [];

  // --- Từ nhánh sprint1-dev ---
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // ==========================================
  // API Methods - Nhánh HomePage
  // ==========================================

  public getNovelHot(): Observable<any> {
    return this.httpClient.get<any>(this.URL_HOME + '/HomeApi/hot');
  }

  public getTopAuthors(): Observable<any> {
    return this.httpClient.get(this.URL_HOME + '/HomeApi/top-authors');
  }

  public getNovelUpdate(): Observable<any> {
    return this.httpClient.get(this.URL_HOME + '/HomeApi/sidebar-new-update');
  }

  public getNovelRecommend(): Observable<any> {
    return this.httpClient.get<any>(this.URL_HOME + '/HomeApi/recommended');
  }

  public getNovelHero(): Observable<any> {
    return this.httpClient.get<any>(this.URL_HOME + '/HomeApi/featured');
  }

  public getNovelAdminRecommend(): Observable<any> {
    return this.httpClient.get<any>(this.URL_HOME + '/HomeApi/admin-recommend');
  }

  // ==========================================
  // API Methods - Nhánh sprint1-dev
  // ==========================================

  public getNovel(novelID: string): Observable<Novel> {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/novel/${novelID}`,
      this.httpOptions
    );
  }

  public getChapters(novelId: string): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/novel/${novelId}/chapters`,
      this.httpOptions
    );
  }

  public getUserNovel(pageNumber: number = 1, pageSize: number = 10000000): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.httpClient.get<any>(`${this.URL_NOVEL}/getUserNovel`, { params });
  }

  public getTotalCountUserNovel(): Observable<number> {
    return this.httpClient.get<number>(`${this.URL_NOVEL}/getUserNovel/count`);
  }

  public createNovel(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.URL_NOVEL}/createNovel`, formData);
  }

  public getInfoNovelForReader(id: String): Observable<any> {
    return this.httpClient.get<any>(`${this.URL_NOVEL}/getInfoNovelForReader/${id}`, this.httpOptions);
  }

  public updateNovel(id: string, formData: FormData): Observable<any> {
    return this.httpClient.put<any>(`${this.URL_NOVEL}/modifyNovel/${id}`, formData);
  }

  public deleteNovel(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.URL_NOVEL}/deleteNovel/${id}`)
  }

  public seachNovelAuthor(status: string, keyword: string, pageNumber: number = 1, pageSize: number = 10000000): Observable<any> {
    const params = new HttpParams()
      .set('status', status)
      .set('keyworld', keyword)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.httpClient.get<any>(`${this.URL_NOVEL}/seachNovelAuthor`, { params });
  }

  public getTotalCountSeachNovelAuthor(status: string, keyword: string): Observable<number> {
    const params = new HttpParams()
      .set('status', status)
      .set('keyworld', keyword);
    return this.httpClient.get<number>(`${this.URL_NOVEL}/seachNovelAuthor/count`, { params });
  }
}