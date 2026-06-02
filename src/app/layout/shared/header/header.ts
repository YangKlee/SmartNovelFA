import { Component, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef, NgZone, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { RouterModule } from '@angular/router';

import { AuthServices } from '../../../services/auth/auth-services';
import { MenuNavServices } from '../../../services/menu-nav/menu-nav-services';
import { User } from '../../../models/user/user.model';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MenuNav } from '../../../models/menu-nav/menu-nav.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, AfterViewInit {
  public user$ = new BehaviorSubject<User | null>(null);
  public menus: MenuNav[] = [];
  public roleMenus: MenuNav[] = [];

  constructor(
    private authServices: AuthServices,
    private menuNavServices: MenuNavServices,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private zone: NgZone, // Ép Angular chạy các tác vụ bất đồng bộ an toàn
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // Để cho Server SSR chạy render khung HTML rỗng trước, không can thiệp logic ở đây
  }

  // Chờ cho toàn bộ giao diện HTML dựng xong xuôi trên Trình duyệt mới bắt đầu đổ dữ liệu vào
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Chạy trong NgZone để đảm bảo Angular bắt được sự thay đổi của Client mà không báo lỗi check
      this.zone.run(() => {
        this.loadPublicMenu();
        this.loadUserInfo();
      });
    }
  }

  /**
   * TẢI MENU CHUNG (ROLE = 5)
   */
  private loadPublicMenu(): void {
    this.menuNavServices.getMenuByRole("5").subscribe({
      next: (res: any) => {
        this.menus = res && res.data ? res.data : res;
        //hông ép giao diện vẽ lại ngay lập tức, mà chỉ đánh dấu để chờ Angular đi ngang 
        // check sự thay đổi r quét
        this.cdr.markForCheck();
        this.cdr.detectChanges(); // Cập nhật UI ngay sau khi mảng menus có dữ liệu
      },
      error: (err) => console.error('Lỗi tải menu chung:', err)
    });
  }

  /**
   * TẢI THÔNG TIN TÀI KHOẢN ĐÃ ĐĂNG NHẬP
   */
  private loadUserInfo(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (!token) {
        this.user$.next(null);
        return;
      }
    }

    this.authServices.loadInfoUserLogined()?.subscribe({
      next: (user) => {
        this.user$.next(user);
        if (user && user.roleId) {
          this.loadRoleMenu(user.roleId.toString());
        }
      },
      error: (err) => console.error('Lỗi tải user:', err)
    });
  }

  /**
   * TẢI MENU RIÊNG THEO ROLE ID (CHẠY SAU KHI USER ĐÃ ĐƯỢC XÁC THỰC)
   */
  private loadRoleMenu(roleId: string): void {
    if (!roleId || ["1", "2", "3", "4"].indexOf(roleId) === -1) {
      this.roleMenus = [];
      return;
    }

    this.menuNavServices.getMenuByRole(roleId).subscribe({
      next: (res: any) => {
        this.roleMenus = res && res.data ? res.data : res;
        // Bắt buộc ép Angular quét lại cây DOM tại thời điểm này để lọt mảng roleMenus vào vòng lặp html
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (err) => console.error(`Lỗi tải menu role ${roleId}:`, err)
    });
  }

  public doLogout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.user$.next(null);
      this.roleMenus = [];
      this.cdr.detectChanges();
    }
    this.router.navigate(['/auth/login']);
  }

  public loginBtn(): void {
    this.router.navigate(['/auth/login']);
  }
}