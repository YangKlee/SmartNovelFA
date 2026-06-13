import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DashboardServices } from '../../../services/dashboard-services/dashboard-services';
import { CommentRes } from '../../../models/comment/comment-res';
import { Comment as CommentComponent } from '../../common/comment/comment';

@Component({
  selector: 'app-author-newest-comment',
  imports: [CommonModule, CommentComponent],
  templateUrl: './author-newest-comment.html',
  styleUrl: './author-newest-comment.css',
})
export class AuthorNewestComment implements OnInit {
  commentRes: CommentRes | null = null;

  constructor(
    private dashboardService: DashboardServices,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.dashboardService.getNewestComment().subscribe({
        next: (res) => {
          this.commentRes = res;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching newest comments', err);
        }
      });
    }
  }
}
