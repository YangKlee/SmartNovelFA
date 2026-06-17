import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class SearchComponent implements OnInit {
  showSearch = false;
  searchKeyword = '';
  
  allNovels: any[] = [];      // 🌟 Nơi lưu trữ toàn bộ danh sách truyện gốc từ Server
  filteredNovels: any[] = []; // 🌟 Danh sách truyện sau khi đã lọc để hiển thị lên HTML

  @Output() close = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // 🌟 Chủ động tải sẵn toàn bộ danh sách truyện ngay khi ứng dụng khởi chạy
    this.http.get<any[]>('https://localhost:7134/api/Novels/filter?search=').subscribe({
      next: (res) => this.allNovels = res,
      error: () => this.allNovels = []
    });
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.clearSearch();
      this.close.emit();
    }
  }

  // 🌟 Hàm lọc trực tiếp trên mảng chữ cái đầu (StartsWith) theo đúng ý bạn
  searchNovel() {
    const keyword = this.searchKeyword?.trim().toLowerCase();
    
    if (!keyword) {
      this.filteredNovels = [];
      return;
    }

    // Lọc các truyện bắt đầu bằng từ khóa (Gõ N ra truyện chữ N đầu, gõ tiếp thu hẹp dần)
    this.filteredNovels = this.allNovels.filter(novel => 
      novel.title.toLowerCase().startsWith(keyword)
    );
  }

  clearSearch() {
    this.searchKeyword = '';
    this.filteredNovels = [];
  }
}