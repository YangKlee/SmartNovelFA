import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../../../services/category/category-services';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-panel.html',
  styleUrl: './filter-panel.css'
})
export class FilterPanelComponent implements OnInit {
// Sửa lại status và lengthOptions
statusOptions = [
  { label: 'Tất cả', value: '' },
  { label: 'Hoàn thành', value: 'ACTIVE' }, // Vì DB chỉ có ACTIVE, ta mặc định chọn cái này
  { label: 'Còn tiếp', value: 'ONGOING' },
  { label: 'Tạm ngưng', value: 'PAUSED' }
];

lengthOptions = [
  { label: 'Mọi độ dài', value: 0 },
  { label: '1-50 chương', value: 1 },    // 1: Đại diện cho dải 1-50
  { label: '51-100 chương', value: 2 },  // 2: Đại diện cho dải 51-100
  { label: '101-150 chương', value: 3 }  // 3: Đại diện cho dải 101-150
];

  sortOptions = [
   
    { label: 'Lọc theo Thể loại', value: 'category' },
    { label: 'Lọc theo Tác giả', value: 'author' },
    { label: 'Lọc theo Rating', value: 'rating' }
  ];

  // Khởi tạo mốc Rating cố định
  ratingOptions = [
    { label: 'Tất cả đánh giá', value: 0 },
    { label: 'Từ ⭐ 4.0 trở lên', value: 4.0 },
    { label: 'Từ ⭐ 4.5 trở lên', value: 4.5 },
    { label: 'Truyện điểm tuyệt đối (5.0)', value: 5.0 }
  ];

  categoryOptions: any[] = []; 
  authorOptions: any[] = []; // Chứa danh sách tác giả từ DB

  searchKeyword: string = '';
  selectedStatus: string = '';
  selectedMinChapters: number = 0;
  selectedSortBy: string = '';
  
  // Các biến binding riêng cho 3 nhánh lọc
  selectedCategories: string[] = []; 
  selectedAuthorId: string = '';
  selectedMinRating: number = 0;

  currentUserId: string = 'U004'; 
  filteredNovels: any[] = [];

  constructor(private http: HttpClient, private categoryService: CategoryService) {}

  ngOnInit(): void {
    // 1. Lấy dữ liệu Thể loại
    this.categoryService.getAllCategories().subscribe({
      next: (data) => this.categoryOptions = data,
      error: (err) => console.error("Lỗi tải thể loại:", err)
    });

    // 2. Lấy dữ liệu Tác giả từ bảng User (Cần tạo API này ở backend)
    this.http.get<any[]>('https://localhost:7134/api/Users/authors').subscribe({
      next: (data) => this.authorOptions = data,
      error: (err) => console.error("Lỗi tải danh sách tác giả:", err)
    });

    this.onFilterChange();
  }

  // Khi người dùng đổi Kiểu lọc (Lọc theo thể loại / Lọc theo tác giả / Rating)
  onMainSortChange() {
    // Reset các bộ lọc nhánh tránh giữ lại dữ liệu cũ bị xung đột
    this.selectedCategories = [];
    this.selectedAuthorId = '';
    this.selectedMinRating = 0;
    
    this.onFilterChange();
  }

  toggleCategory(catId: string) {
    const index = this.selectedCategories.indexOf(catId);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(catId);
    }
    this.onFilterChange();
  }

  onFilterChange() {
    let queryParams: string[] = [];

   
    if (this.selectedStatus) queryParams.push(`status=${this.selectedStatus}`);
    if (this.selectedMinChapters > 0) queryParams.push(`minChapters=${this.selectedMinChapters}`);
    if (this.selectedSortBy) queryParams.push(`sortBy=${this.selectedSortBy}`);
    if (this.currentUserId) queryParams.push(`currentUid=${this.currentUserId}`);

    // Đẩy param nhánh con dựa trên điều kiện lọc đang chọn
    if (this.selectedSortBy === 'category' && this.selectedCategories.length > 0) {
      queryParams.push(`categoryId=${encodeURIComponent(this.selectedCategories.join(','))}`);
    }
    if (this.selectedSortBy === 'author' && this.selectedAuthorId) {
      queryParams.push(`authorId=${this.selectedAuthorId}`);
    }
    if (this.selectedSortBy === 'rating' && this.selectedMinRating > 0) {
      queryParams.push(`minRating=${this.selectedMinRating}`);
    }

    const baseUrl = 'https://localhost:7134/api/Novels/filter';
    const fullUrl = queryParams.length > 0 ? `${baseUrl}?${queryParams.join('&')}` : baseUrl;

    this.http.get<any[]>(fullUrl).subscribe({
      next: (res) => this.filteredNovels = res,
      error: (err) => {
        console.error("Lỗi lọc dữ liệu truyện:", err);
        this.filteredNovels = [];
      }
    });
  }
}