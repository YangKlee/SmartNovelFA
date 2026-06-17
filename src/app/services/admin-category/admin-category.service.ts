import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env';
import { Category } from '../../models/category/category.model';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {
  private API_URL = `${environment.apiUrl}/CategoriesAdmin`;

  constructor(private http: HttpClient) { }

  public getCategories(keyword?: string, status?: string, page: number = 1): Observable<any> {
    let params = new HttpParams().set('page', page.toString());
    if (keyword) {
      params = params.set('keyword', keyword);
    }
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<any>(this.API_URL, { params });
  }

  createCategory(data: Category): Observable<any> {
    return this.http.post(`${this.API_URL}/create`, data);
  }

  updateCategory(id: string, data: Category): Observable<any> {
    return this.http.put(`${this.API_URL}/update/${id}`, data);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/delete/${id}`);
  }
}
