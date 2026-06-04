import { Injectable } from '@angular/core';
import { environment } from '../../env';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {HttpClient,HttpParams} from '@angular/common/http';
import { Novel } from '../../models/novel/novel.model';
import { User } from '../../models/user/user.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class NovelServices {
  private URL_NOVEL = `${environment.apiUrl}`
  public reloadNovelList = new BehaviorSubject<boolean>(false);

  private mockNovelList :Novel[] = []
  private mockUserList :User [] = []

  constructor(private http: HttpClient) {
  }

   public getNovelHot():Observable<any> {
      return this.http.get<any>(this.URL_NOVEL + '/HomeApi/hot');
    }

    
  public getTopAuthors(): Observable<any> {
    return this.http.get(this.URL_NOVEL + '/HomeApi/top-authors');
  }

  public getNovelUpdate(): Observable<any> {
    return this.http.get(this.URL_NOVEL + '/HomeApi/sidebar-new-update');
  }

  public getNovelRecommend (): Observable<any> {
    return this.http.get<any>(this.URL_NOVEL + '/HomeApi/recommended');
  }

  public getNovelHero(): Observable<any> {
    return this.http.get<any>(this.URL_NOVEL + '/HomeApi/featured');}

    public getNovelAdminRecommend (): Observable<any> {
      return this.http.get<any>(this.URL_NOVEL + '/HomeApi/admin-recommend');
    }
}
