import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NovelServices } from '../../../services/novel/novel-services';
import { ChapterServices } from '../../../services/chapter/chapter-services';
import { CommentServices } from '../../../services/comment/comment-services';
import { Pagination } from '../../common/pagination/pagination';
import { AuthorComment } from '../author-comment/author-comment';
import { Comment as CommentModel } from '../../../models/comment/comment.model';
import { PagedResponse } from '../../../modelels/paged-response';
import { Comment } from '../../common/comment-dashboard/comment';

@Component({
  selector: 'app-reader-comment',
  standalone: true,
  imports: [CommonModule, FormsModule, Pagination, Comment],
  templateUrl: './reader-comment.html',
  styleUrl: './reader-comment.css'
})
export class ReaderComment implements OnInit {
  novels: any[] = [];
  chapters: any[] = [];
  comments: CommentModel[] = [];

  selectedNovelId: string = '';
  selectedChapterId: string = '';
  keyword: string = '';

  currentPage: number = 1;
  limitComment: number = 5;
  totalPages: number = 1;

  constructor(
    private novelServices: NovelServices,
    private chapterServices: ChapterServices,
    private commentServices: CommentServices,
    private crl: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadNovels();
      this.loadComments();

      this.commentServices.isReloadComment.subscribe((data: boolean) => {
        if (data) {
          this.loadComments();
        }
      });
    }
  }

  loadNovels() {
    this.novelServices.getUserNovel(1, 1000).subscribe({
      next: (res: any) => {
        this.novels = res.data || res.datas || res;
      },
      error: (err) => console.log(err)
    });
  }

  onNovelChange() {
    this.selectedChapterId = '';
    this.chapters = [];
    if (this.selectedNovelId) {
      this.chapterServices.getChapterByNovel(this.selectedNovelId).subscribe({
        next: (res: any) => {
          this.chapters = res;
        },
        error: (err) => console.log(err)
      });
    }
    this.currentPage = 1;
    this.loadComments();
  }

  onChapterChange() {
    this.currentPage = 1;
    this.loadComments();
  }

  onSearchChange() {
    this.currentPage = 1;
    this.loadComments();
  }

  loadComments() {
    const req = {
      novelId: this.selectedNovelId,
      chapterId: this.selectedChapterId,
      keyworld: this.keyword,
      pageLimit: this.limitComment.toString(),
      currentPage: this.currentPage.toString(),
      parentCommentID: ''
    };

    this.commentServices.getAllCommentAuthor(req).subscribe({
      next: (res: PagedResponse<CommentModel>) => {
        this.comments = res.data || (res as any).datas || [];
        this.totalPages = res.totalPages || 1;
        this.crl.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadComments();
  }
}
