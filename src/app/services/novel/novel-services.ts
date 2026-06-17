import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../env';
import { Category } from '../../models/category/category.model';
import { Novel } from '../../models/novel/novel.model';
import { User } from '../../models/user/user.model';
import { LoginRespone } from '../../models/auth/login-respone';
import { Pagination } from '../../models/pagination/pagination';

@Injectable({
  providedIn: 'root'
})
export class NovelServices {

  private baseUrl = 'http://localhost:5283/api';

  filterParams = {
    search: '',
    selectedCategoryId: '',
    blockTagSearch: '',
    chapterMin: 0,
    selectedTimeOption: 'all',
    selectedMonth: 5,
    selectedYear: 2026
  };

  listNovels: any[] = []; // Nơi lưu kết quả truyện tìm được để hiển thị ra màn hình

  // Base URLs được tách ra để giữ nguyên vẹn endpoint của cả 2 nhánh
  private URL_HOME = `${environment.apiUrl}`;
  private URL_NOVEL = `${environment.apiUrl}/Novel`;

  public reloadNovelList = new BehaviorSubject<boolean>(false);

  // --- Từ nhánh HomePage ---
  private mockNovelList: Novel[] = [];
  private mockUserList: User[] = [];

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  // Gộp chung HttpClient và PLATFORM_ID vào một constructor duy nhất
  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // ==========================================
  // API Methods - Nhánh Search
  // ==========================================
  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}/categories`);
  }

  // Hàm gom tất cả tham số từ kho lưu trữ rồi gửi lên .NET
  searchAndFilter(): void {
    let params = new HttpParams();

    if (this.filterParams.search) params = params.set('search', this.filterParams.search);
    if (this.filterParams.selectedCategoryId) params = params.set('categoryId', this.filterParams.selectedCategoryId);

    // Các tham số mở rộng gửi lên backend nếu cần lọc sâu hơn
    // if (this.filterParams.chapterMin) params = params.set('chapterMin', this.filterParams.chapterMin);

    this.httpClient.get<any[]>(`${this.baseUrl}/novels/filter`, { params }).subscribe({
      next: (res) => {
        this.listNovels = res;
        console.log('Kết quả truyện lấy về từ .NET:', this.listNovels);
      },
      error: (err) => console.error('Lỗi khi lọc truyện:', err)
    });
  }


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

  public getNovelFollowing(): Observable<any> {
    return this.httpClient.get<any>(this.URL_HOME + '/HomeApi/followedNovel');
  }



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

  public seachNovelAuthor(status: string, keyword: string, authorId: string = '', pageNumber: number = 1, pageSize: number = 10000000): Observable<any> {
    let params = new HttpParams()
      .set('status', status)
      .set('keyworld', keyword)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    if (authorId) {
      params = params.set('authorId', authorId);
    }
    return this.httpClient.get<any>(`${this.URL_NOVEL}/seachNovelAuthor`, { params });
  }

  public getTotalCountSeachNovelAuthor(status: string, keyword: string): Observable<number> {
    const params = new HttpParams()
      .set('status', status)
      .set('keyworld', keyword);
    return this.httpClient.get<number>(`${this.URL_NOVEL}/seachNovelAuthor/count`, { params });
  }
  public getAllAuthor(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.URL_NOVEL}/getAllAuthor`);
  }

  public getNovelForAdmin(pageNumber: number = 1, pageSize: number = 10, keyword: string = '', type: string = 'All', authorID: string = ''): Observable<Pagination<Novel>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('keyword', keyword)
      .set('type', type);

    if (authorID) {
      params = params.set('authorID', authorID);
    }

    return this.httpClient.get<any>(`${this.URL_NOVEL}/getNovelForAdmin`, { params }).pipe(
      map(res => {
        return {
          data: res.datas,
          totalRecords: res.totalRecords,
          pageNumber: res.pageNumber,
          pageSize: res.pageSize,
          totalPages: Math.ceil(res.totalRecords / res.pageSize)
        } as Pagination<Novel>;
      })
    );
  }

  public rejectNovel(novelId: string): Observable<any> {
    return this.httpClient.put<any>(`${this.URL_NOVEL}/rejectNovel/${novelId}`, null);
  }

  public getNovelsByAuthor(uid: string): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${this.baseUrl}/novels/author/${uid}/novels`
    );
  }
}