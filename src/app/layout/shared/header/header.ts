import { Component, Inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AuthServices } from '../../../services/auth/auth-services';
import { MenuNavServices } from '../../../services/menu-nav/menu-nav-services';
import { User } from '../../../models/user/user.model';
import { MenuNav } from '../../../models/menu-nav/menu-nav.model';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, OnDestroy {
  // Dữ liệu người dùng và menu điều hướng
  public user: User | null = null;
  public menus: MenuNav[] = [];
  public roleMenus: MenuNav[] = [];

  constructor(
    private authServices: AuthServices,
    private cdr: ChangeDetectorRef,
    private menuNavServices: MenuNavServices,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private headerSub: any;

  ngOnInit(): void {

    // Chỉ chạy trên môi trường trình duyệt
    if (isPlatformBrowser(this.platformId)) {
      this.headerSub = this.menuNavServices.headerUpdate$.subscribe(e => {
        if (e) {
          this.loadPublicMenu();
          this.loadUserInfo();
          this.cdr.detectChanges();
          console.log("load header");
          this.menuNavServices.updateHeader(false);
        }
      });
    }
    this.menuNavServices.updateHeader(true);
  }

  ngOnDestroy(): void {
    if (this.headerSub) {
      this.headerSub.unsubscribe();
    }
  }// Tải menu chung công khai
  // =========================================
  // LOAD MENU CHUNG
  // =========================================

  private loadPublicMenu(): void {

    // role 5 = menu chung
    this.menuNavServices
      .getMenuByRole("5")
      .subscribe({

        next: (res: MenuNav[]) => {

          this.menus = res;
          this.cdr.detectChanges();
        },

        error: (err) => {

          console.error(
            'Lỗi tải menu chung:',
            err
          );
        }
      });
  }

  // Tải thông tin user đã đăng nhập
  private loadUserInfo(): void {
    this.authServices.loadInfoUserLogined().subscribe({
      next: (e) => {
        this.user = e;
        console.log(this.user);
        this.cdr.detectChanges();
        if (e?.roleId) {
          this.loadRoleMenu(e.roleId.toString());
        }
      },
      error: () => {
        this.user = null;
        this.cdr.detectChanges();
      }
    });
  }

  // Tải menu riêng dựa theo phân quyền (Role)
  // =========================================
  // LOAD MENU ROLE
  // =========================================

  private loadRoleMenu(roleId: string): void {

    // =====================================
    // ADMIN
    // =====================================

    if (roleId === "1") {

      this.menuNavServices
        .getMenuByRole("1")
        .subscribe({

          next: (res: MenuNav[]) => {

            this.roleMenus = res;
            this.cdr.detectChanges();
          },

          error: (err) => {

            console.error(
              'Lỗi tải menu Admin:',
              err
            );
          }
        });
    }

    // =====================================
    // MODERATOR
    // =====================================

    else if (roleId === "2") {

      this.menuNavServices
        .getMenuByRole("2")
        .subscribe({

          next: (res: MenuNav[]) => {

            this.roleMenus = res;
            this.cdr.detectChanges();
          },

          error: (err) => {

            console.error(
              'Lỗi tải menu Moderator:',
              err
            );
          }
        });
    }

    // =====================================
    // AUTHOR
    // =====================================

    else if (roleId === "3") {

      this.menuNavServices
        .getMenuByRole("3")
        .subscribe({

          next: (res: MenuNav[]) => {

            this.roleMenus = res;
            this.cdr.detectChanges();
          },

          error: (err) => {

            console.error(
              'Lỗi tải menu Author:',
              err
            );
          }
        });
    }

    // =====================================
    // USER THƯỜNG (ROLE 4)
    // =====================================

    else if (roleId === "4") {

      this.menuNavServices
        .getMenuByRole("4")
        .subscribe({

          next: (res: MenuNav[]) => {

            this.roleMenus = res;
            this.cdr.detectChanges();
          },

          error: (err) => {

            console.error(
              'Lỗi tải menu User:',
              err
            );
          }
        });
    }

    // =====================================
    // KHÔNG CÓ ROLE
    // =====================================

    else {

      this.roleMenus = [];
      this.cdr.detectChanges();
    }
  }

  // Đăng xuất và xóa session
  public doLogout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.user = null;
      this.roleMenus = [];
    }
    this.router.navigate(['/auth/login']);
  }

  // Điều hướng đến trang đăng nhập
  public loginBtn(): void {
    this.router.navigate(['/auth/login']);
  }
}