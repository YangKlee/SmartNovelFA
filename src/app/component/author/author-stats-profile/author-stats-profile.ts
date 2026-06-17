import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DashboardServices } from '../../../services/dashboard-services/dashboard-services';
import { DashboardAuthorProfileInfo } from '../../../menu-dashboard/dashboard-author-profile-info';

@Component({
  selector: 'app-author-stats-profile',
  imports: [CommonModule],
  templateUrl: './author-stats-profile.html',
  styleUrl: './author-stats-profile.css',
})
export class AuthorStatsProfile implements OnInit {
  profileInfo: DashboardAuthorProfileInfo | null = null;

  constructor(
    private dashboardService: DashboardServices,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.dashboardService.getAuthorProfileInfo().subscribe({
        next: (res) => {
          this.profileInfo = res;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching author profile stats', err);
        }
      });
    }
  }
}
