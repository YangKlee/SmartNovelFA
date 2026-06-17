import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FollowServices } from '../../../services/follow/follow-services';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-follow-manager',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './follow-manager.html',
  styleUrl: './follow-manager.css',
})
export class FollowManager implements OnInit {
  followedNovels: any[] = [];
  followedAuthors: any[] = [];
  blockedAuthors: any[] = [];
  isLoadingNovels = false;
  isLoadingAuthors = false;
  isLoadingBlocked = false;

  constructor(
    private followServices: FollowServices,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFollowedNovels();
      this.loadFollowedAuthors();
      this.loadBlockedAuthors();
    }
  }

  loadFollowedNovels(): void {
    this.isLoadingNovels = true;
    this.cdr.detectChanges();
    this.followServices.getFollowedNovels().subscribe({
      next: (data) => {
        this.followedNovels = data;
        this.isLoadingNovels = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách truyện theo dõi:', err);
        this.isLoadingNovels = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadFollowedAuthors(): void {
    this.isLoadingAuthors = true;
    this.cdr.detectChanges();
    this.followServices.getFollowedAuthors().subscribe({
      next: (data) => {
        this.followedAuthors = data;
        this.isLoadingAuthors = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách tác giả theo dõi:', err);
        this.isLoadingAuthors = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadBlockedAuthors(): void {
    this.isLoadingBlocked = true;
    this.cdr.detectChanges();
    this.followServices.getBlockedAuthors().subscribe({
      next: (data) => {
        this.blockedAuthors = data;
        this.isLoadingBlocked = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách tác giả bị chặn:', err);
        this.isLoadingBlocked = false;
        this.cdr.detectChanges();
      }
    });
  }

  unfollowNovel(novelId: string, event: Event): void {
    event.stopPropagation();
    this.followServices.unFollowNovel(novelId).subscribe({
      next: () => {
        this.snackBar.open('Đã bỏ theo dõi truyện thành công', 'Đóng', {
          duration: 3000,
        });
        this.loadFollowedNovels();
      },
      error: (err) => {
        console.error('Lỗi khi bỏ theo dõi truyện:', err);
        this.snackBar.open('Không thể bỏ theo dõi truyện', 'Đóng', {
          duration: 3000,
        });
      }
    });
  }

  unfollowAuthor(authorId: string, event: Event): void {
    event.stopPropagation();
    this.followServices.unFollowAuthor(authorId).subscribe({
      next: () => {
        this.snackBar.open('Đã bỏ theo dõi tác giả thành công', 'Đóng', {
          duration: 3000,
        });
        this.loadFollowedAuthors();
      },
      error: (err) => {
        console.error('Lỗi khi bỏ theo dõi tác giả:', err);
        this.snackBar.open('Không thể bỏ theo dõi tác giả', 'Đóng', {
          duration: 3000,
        });
      }
    });
  }

  unblockAuthor(authorId: string, event: Event): void {
    event.stopPropagation();
    this.followServices.unBlockAuthor(authorId).subscribe({
      next: () => {
        this.snackBar.open('Đã bỏ chặn tác giả thành công', 'Đóng', {
          duration: 3000,
        });
        this.loadBlockedAuthors();
      },
      error: (err) => {
        console.error('Lỗi khi bỏ chặn tác giả:', err);
        this.snackBar.open('Không thể bỏ chặn tác giả', 'Đóng', {
          duration: 3000,
        });
      }
    });
  }
}
