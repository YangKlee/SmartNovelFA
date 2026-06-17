import { Component, OnInit, OnDestroy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, Router } from '@angular/router';
import { UserServices } from '../../../services/user/user-services';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user/user.model';

@Component({
  selector: 'app-header-dashboard',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule, MatDividerModule, RouterModule],
  templateUrl: './header-dashboard.html',
  styleUrl: './header-dashboard.css',
})
export class HeaderDashboard implements OnInit, OnDestroy {
  userData?: User;
  private userSub?: Subscription;

  constructor(
    private userServices: UserServices,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getUserLoginInfo();
      this.userSub = this.userServices.userUpdated$.subscribe(() => {
        this.getUserLoginInfo();
      });
    }
  }

  getUserLoginInfo(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.userServices.getUserInfo().subscribe({
      next: (res) => {
        this.userData = res;
        this.cdr.detectChanges();
      },
      error: () => {
        // Có thể xử lý lỗi đăng nhập tại đây
      }
    });
  }

  doLogout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.userData = undefined;
      this.cdr.detectChanges();
    }
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
