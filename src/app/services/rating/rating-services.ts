import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env';

@Injectable({
  providedIn: 'root',
})
export class RatingServices {
  private URL_NOVEL = `${environment.apiUrl}/Novel`;

  constructor(private httpClient: HttpClient) {}

  /**
   * Đánh giá số sao cho truyện
   * @param novelId Mã truyện
   * @param rating Số điểm đánh giá (1-5)
   */
  public rateNovel(novelId: string, rating: number): Observable<any> {
    const formData = new FormData();
    formData.append('novelId', novelId);
    formData.append('rating', rating.toString());
    return this.httpClient.post<any>(`${this.URL_NOVEL}/rate`, formData);
  }
}
