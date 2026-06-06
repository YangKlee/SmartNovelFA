import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../env';

@Injectable({
  providedIn: 'root'
})
export class CategoryServices {
  // Biến từ nhánh Search
  // SỬA TẠI ĐÂY: Thêm chữ 's' vào sau api/Categories để khớp y chang Controller Backend
  private apiUrl = 'https://localhost:7134/api/Categories'; 

  // Biến từ nhánh sprint1-dev
  private URL_CATEGORY: string = `${environment.apiUrl}/Categories`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json"
    }),
  };

  // Gộp inject HttpClient để sử dụng chung cho cả 2 hàm
  constructor(private httpClient: HttpClient) { }

  // Phương thức từ nhánh Search
  getAllCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.URL_CATEGORY}`);
  }

  // Phương thức từ nhánh sprint1-dev
  public getAllActiveCategory(): Observable<any>{
    return this.httpClient.get<any>(`${this.URL_CATEGORY}/active`);
  }
}