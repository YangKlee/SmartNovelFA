import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../../models/user/user.model';
import { UserServices } from '../../../services/user/user-services';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-account',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account implements OnInit {
  userData!: User;
  constructor(private userServices: UserServices, private router: Router, @Inject(PLATFORM_ID) private platformId: Object, private cdr: ChangeDetectorRef) { };
  ngOnInit() {
    this.getUserLoginAccount();
  }
  getUserLoginAccount() {
    this.userServices.getUserInfo().subscribe({
      next: (res) => {
        this.userData = res;
        this.cdr.detectChanges();
      },
      error: () => {
        if (isPlatformBrowser(this.platformId)) {
          alert("Không lấy được thông tin tài khoản, phiên đăng nhập không hợp lệ");
        }
      }
    })
  }
}
