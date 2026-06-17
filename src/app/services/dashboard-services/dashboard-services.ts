import { Injectable } from '@angular/core';
import { environment } from '../../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuDashboard } from '../../models/menu-dashboard/menu-dashboard';
import { DashboardAuthorNovelInfo } from '../../menu-dashboard/dashboard-author-novel-info';
import { DashboardAuthorProfileInfo } from '../../menu-dashboard/dashboard-author-profile-info';
import { CommentRes } from '../../models/comment/comment-res';
import { DashboardUserStatsInfo } from '../../menu-dashboard/dashboard-user-stats-info';
import { DashboardActivityStatsInfo } from '../../menu-dashboard/dashboard-activity-stats-info';

@Injectable({
  providedIn: 'root',
})
export class DashboardServices {
  private URL_DASHBOARD = `${environment.apiUrl}/Dashboard`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(
    private httpClient: HttpClient,
  ) { }

  getMenuDashboard(): Observable<MenuDashboard[]> {
    return this.httpClient.get<any>(`${this.URL_DASHBOARD}/getMenuDashboard`, this.httpOptions);
  }

  getAllAuthorNovelInfo(): Observable<DashboardAuthorNovelInfo> {
    return this.httpClient.get<DashboardAuthorNovelInfo>(`${this.URL_DASHBOARD}/getAllAuthorNovelInfo`, this.httpOptions);
  }

  getAuthorProfileInfo(): Observable<DashboardAuthorProfileInfo> {
    return this.httpClient.get<DashboardAuthorProfileInfo>(`${this.URL_DASHBOARD}/getAuthorProfileInfo`, this.httpOptions);
  }

  getNewestComment(): Observable<CommentRes> {
    return this.httpClient.get<CommentRes>(`${this.URL_DASHBOARD}/getNewestComment`, this.httpOptions);
  }

  getUserStats(): Observable<DashboardUserStatsInfo> {
    return this.httpClient.get<DashboardUserStatsInfo>(`${this.URL_DASHBOARD}/getUserStats`, this.httpOptions);
  }

  getActivityStats(): Observable<DashboardActivityStatsInfo[]> {
    return this.httpClient.get<DashboardActivityStatsInfo[]>(`${this.URL_DASHBOARD}/getActivityStats`, this.httpOptions);
  }

}
