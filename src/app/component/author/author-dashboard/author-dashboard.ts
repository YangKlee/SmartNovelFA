import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthorStatsNovel } from '../author-stats-novel/author-stats-novel';
import { AuthorStatsProfile } from '../author-stats-profile/author-stats-profile';
import { AuthorNewestComment } from '../author-newest-comment/author-newest-comment';
import { UserServices } from '../../../services/user/user-services';

@Component({
  selector: 'app-author-dashboard',
  imports: [CommonModule, AuthorStatsNovel, AuthorStatsProfile, AuthorNewestComment],
  templateUrl: './author-dashboard.html',
  styleUrl: './author-dashboard.css',
})
export class AuthorDashboard implements OnInit {
  authorName: string = '...';

  constructor(
    private userService: UserServices,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userService.getUserInfo().subscribe({
        next: (res) => {
          this.authorName = res?.displayName || 'TÁC GIẢ';
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching user info', err);
        }
      });
    }
  }
}
