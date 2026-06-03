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
import { SearchComponent } from '../../../component/Search_and_FilterNovel/search/search';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, RouterOutlet, RouterLink, FormsModule, SearchComponent], 
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



  

  
}