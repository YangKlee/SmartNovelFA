import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentServices } from '../../../services/comment/comment-services';
import { Pagination } from '../../common/pagination/pagination';
import { Comment as CommentModel } from '../../../models/comment/comment.model';
import { PagedResponse } from '../../../modelels/paged-response';
import { Comment } from '../../common/comment-dashboard/comment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, Pagination, Comment],
  templateUrl: './comment-manager.html',
  styleUrl: './comment-manager.css'
})
export class CommentManager implements OnInit, OnDestroy {
  comments: CommentModel[] = [];
  keyword: string = '';
  currentPage: number = 1;
  limitComment: number = 10;
  totalPages: number = 1;
  private reloadSub?: Subscription;

  constructor(
    private commentServices: CommentServices,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadComments();

      this.reloadSub = this.commentServices.isReloadComment.subscribe((reload: boolean) => {
        if (reload) {
          this.loadComments();
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.reloadSub) {
      this.reloadSub.unsubscribe();
    }
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.loadComments();
  }

  loadComments(): void {
    const req = {
      novelId: '',
      chapterId: '',
      keyworld: this.keyword,
      pageLimit: this.limitComment.toString(),
      currentPage: this.currentPage.toString(),
      parentCommentID: ''
    };

    this.commentServices.getAllCommentAuthor(req).subscribe({
      next: (res: PagedResponse<CommentModel>) => {
        this.comments = res.data || (res as any).datas || [];
        this.totalPages = res.totalPages || 1;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching comments for admin:', err);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadComments();
  }
}
