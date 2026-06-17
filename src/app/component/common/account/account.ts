import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../../models/user/user.model';
import { UserServices } from '../../../services/user/user-services';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-account',
  imports: [MatTableModule, MatPaginatorModule, RouterOutlet, RouterLinkWithHref, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account implements OnInit, OnDestroy {
  userData!: User;
  private userSub!: Subscription;
  constructor(private userServices: UserServices, private router: Router, @Inject(PLATFORM_ID) private platformId: Object, private cdr: ChangeDetectorRef) { };
  ngOnInit() {
    this.getUserLoginAccount();
    this.userSub = this.userServices.userUpdated$.subscribe(() => {
      this.getUserLoginAccount();
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
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
