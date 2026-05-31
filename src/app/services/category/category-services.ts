import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // SỬA TẠI ĐÂY: Thêm chữ 's' vào sau api/Categories để khớp y chang Controller Backend
  private apiUrl = 'https://localhost:7134/api/Categories'; 

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}