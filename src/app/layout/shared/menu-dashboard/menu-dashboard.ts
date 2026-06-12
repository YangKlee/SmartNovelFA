import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { UserServices } from '../../../services/user/user-services';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../models/user/user.model';
import { MenuDashboard as MenuModel } from '../../../models/menu-dashboard/menu-dashboard';
import { DashboardServices } from '../../../services/dashboard-services/dashboard-services';

@Component({
  selector: 'app-menu-dashboard',
  imports: [CommonModule, MatListModule, MatIconModule, MatDividerModule, RouterModule],
  templateUrl: './menu-dashboard.html',
  styleUrl: './menu-dashboard.css',
})
export class MenuDashboard implements OnInit, OnDestroy {
  userData?: User;
  private userSub?: Subscription;

  // Danh sách menu (bạn có thể thay đổi các link này cho phù hợp với routing thực tế)
  menuItems!: Observable<MenuModel[]>;
  constructor(private userServices: UserServices, private cdr: ChangeDetectorRef, private dashboardServices: DashboardServices) { }

  ngOnInit(): void {
    this.getUserLoginInfo();
    this.userSub = this.userServices.userUpdated$.subscribe(() => {
      this.getUserLoginInfo();
    });
    this.menuItems = this.dashboardServices.getMenuDashboard();
  }

  getUserLoginInfo(): void {
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

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  getRoleName(roleId?: string): string {
    switch (roleId) {
      case '1': return 'Quản trị viên';
      case '2': return 'Moderator';
      case '3': return 'Tác giả';
      case '4': return 'Độc giả';
      default: return 'Khách';
    }
  }
}
