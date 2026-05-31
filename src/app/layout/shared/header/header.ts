import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { BehaviorSubject } from "rxjs";
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { AuthServices } from '../../../services/auth/auth-services';
import { User } from '../../../models/user/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, RouterOutlet, RouterLink, FormsModule], 
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  public user$ = new BehaviorSubject<User | null>(null);
  
  showSearch = false;     // Trạng thái ẩn/hiện ô input tìm kiếm
  searchKeyword = '';     // Biến binding kép ngModel cho từ khóa gõ vào
  novels: any[] = [];     // Mảng chứa danh sách truyện kết quả hiển thị tại chỗ

  constructor(
    private authServices: AuthServices, 
    private router: Router, 
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.authServices.loadInfoUserLogined()?.subscribe({
        next: (e) => this.user$.next(e),
        error: (err) => console.log(err)
      });
    }
  }

  doLogout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("token");
      this.user$.next(null);
    }
    this.router.navigate(['/auth/login']);
  }

  logibBtn() {
    this.router.navigate(['/auth/login']);
  }

  // --- LOGIC TÌM KIẾM TRỰC TIẾP TẠI HEADER ---

  // Bật/tắt ô tìm kiếm
  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.clearSearch(); // Nếu tắt ô tìm kiếm thì xóa dữ liệu cũ
    }
  }

  // Hàm chạy liên tục real-time khi gõ chữ (sự kiện input)
  searchNovel() {
    // Nếu xóa hết chữ, trả mảng về rỗng và dừng lại
    if (!this.searchKeyword || this.searchKeyword.trim() === '') {
      this.novels = [];
      return;
    }

    // Gọi trực tiếp API Backend của bạn để lấy dữ liệu đồng thời
    this.http.get<any[]>(
      `https://localhost:7134/api/Novels/filter?search=${encodeURIComponent(this.searchKeyword.trim())}`
    )
    .subscribe({
      next: (res) => {
        this.novels = res; // Nhận dữ liệu trả về và render trực tiếp lên menu thả xuống
        console.log("Kết quả tìm kiếm trực tiếp:", this.novels);
      },
      error: (err) => {
        console.log("Lỗi gọi API tìm kiếm:", err);
        this.novels = [];
      }
    });
  }

  // Hàm dọn dẹp khi đóng ô tìm kiếm
  clearSearch() {
    this.searchKeyword = '';
    this.novels = [];
  }
}