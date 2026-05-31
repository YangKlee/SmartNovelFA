import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../models/category/category.model';



@Injectable({
  providedIn: 'root'
})
export class NovelService {
  private baseUrl = 'http://localhost:5283/api';

  // Kho chứa dữ liệu lọc dùng chung cho cả filter-panel và search-bar
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

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
   
  return this.http.get<Category[]>(`${this.baseUrl}/categories`);


  }

  // Hàm gom tất cả tham số từ kho lưu trữ rồi gửi lên .NET
  searchAndFilter(): void {
    let params = new HttpParams();

    if (this.filterParams.search) params = params.set('search', this.filterParams.search);
    if (this.filterParams.selectedCategoryId) params = params.set('categoryId', this.filterParams.selectedCategoryId);
    
    // Các tham số mở rộng gửi lên backend nếu cần lọc sâu hơn
    // if (this.filterParams.chapterMin) params = params.set('chapterMin', this.filterParams.chapterMin);

    this.http.get<any[]>(`${this.baseUrl}/novels/filter`, { params }).subscribe({
      next: (res) => {
        this.listNovels = res;
        console.log('Kết quả truyện lấy về từ .NET:', this.listNovels);
      },
      error: (err) => console.error('Lỗi khi lọc truyện:', err)
    });
  }
}