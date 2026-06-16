import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UserStats } from '../user-stats/user-stats';
import { ActivityStats } from '../activity-stats/activity-stats';
import { UserServices } from '../../../services/user/user-services';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, UserStats, ActivityStats],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  adminName: string = '...';

  constructor(
    private userService: UserServices,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userService.getUserInfo().subscribe({
        next: (res) => {
          this.adminName = res?.displayName || 'ADMIN';
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching user info', err);
        }
      });
    }
  }
}
