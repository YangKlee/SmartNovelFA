import { Component, OnInit, ChangeDetectorRef, } from '@angular/core';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { NovelServices } from '../../../services/novel/novel-services';
import { ChapterServices } from '../../../services/chapter/chapter-services';
import { Novel } from '../../../models/novel/novel.model';
import { Chapter } from '../../../models/chapter/chapter.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { E } from '@angular/cdk/keycodes';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of, catchError, map, tap } from 'rxjs';
import da from '@angular/common/locales/da';
import { HttpClient } from '@angular/common/http';
import { WriteComment } from '../write-comment/write-comment';
import { Comment as CommentComponent } from '../comment/comment';
import { Comment as CommentModel } from '../../../models/comment/comment.model';
import { CommentServices } from '../../../services/comment/comment-services';
import { CommentRes } from '../../../models/comment/comment-res';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-read-novel',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDividerModule,
    MatTooltipModule, MatSidenavModule, MatListModule, WriteComment, CommentComponent],
  templateUrl: './read-novel.html',
  styleUrl: './read-novel.css',
})
export class ReadNovel implements OnInit {
  novelId!: string | null;
  chapterId!: string | null;
  chapterIdSelected!: string | null;
  chapterFileUrl: string | null = null;
  safeHtmlContent!: SafeHtml;
  comments: CommentModel[] = [];
  countComment: number = 0;
  totalComment: number = 0;
  limitComment: number = 5;
  constructor(private route: ActivatedRoute, private router: Router, private novelServices: NovelServices,
    private chapterServices: ChapterServices, @Inject(PLATFORM_ID) private platformId: Object,
    private crl: ChangeDetectorRef, private http: HttpClient,
    private sanitizer: DomSanitizer, private location: Location,
    private commentServices: CommentServices, private snackBar: MatSnackBar) { }

  // khai báo biến để lưu thông tin
  novel!: Observable<Novel>;
  chapter!: Observable<Chapter>;
  chapters$!: Observable<Chapter[]>;
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
      this.novelId = params.get('novelID');
      this.chapterId = params.get('chapterID');
      console.log('Lấy thành công Novel ID:', this.novelId);
      console.log('Lấy thành công Chapter ID:', this.chapterId);

      if (this.novelId != null && isPlatformBrowser(this.platformId)) {
        this.novel = this.novelServices.getInfoNovelForReader(this.novelId);
        this.chapters$ = this.chapterServices.getChapterByNovel(this.novelId);
        this.loadChapter();
        this.loadComment();
      }
      this.commentServices.isReloadComment.subscribe((data: boolean) => {
        if (data) {
          this.countComment = 0;
          this.loadComment();
        }
      });
    });
  }
  loadComment(isAppend: boolean = false) {
    if (this.novelId != null && this.chapterId != null) {
      this.commentServices.getComment(this.novelId, this.chapterId, this.countComment, this.limitComment).subscribe({
        next: (data: CommentRes) => {
          if (isAppend) {
            this.comments = [...this.comments, ...data.comments];
          } else {
            this.comments = data.comments;
          }
          this.totalComment = data.totalComment;
          this.crl.detectChanges();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
  loadChapter() {
    if (this.novelId != null && this.chapterId != null && isPlatformBrowser(this.platformId)) {
      this.chapter = this.chapterServices.getChapterForReader(this.novelId, this.chapterId).pipe(
        tap((data: Chapter) => {
          if (data.chapterFileUrl != null) {
            this.chapterFileUrl = data.chapterFileUrl;
            this.loadContentNovel();
          }
        })
      );

    }
  }
  loadContentNovel() {
    if (this.chapterFileUrl != null) {
      const proxyUrl = `http://localhost:5283/api/Chapters/GetChapterContent?url=${encodeURIComponent(this.chapterFileUrl)}`;
      // lấy file truyện từ server xuống, ép dạng text vì angular dui dui nó bắt dạng json
      this.http.get(proxyUrl, { responseType: 'text' }).subscribe({
        next: (dataRaw: string) => {
          // Khi copy từ Word hoặc các trang web khác, khoảng trắng thường bị biến thành &nbsp; (non-breaking space)
          // Các thẻ &nbsp; này ngăn không cho trình duyệt xuống dòng, khiến chữ bị tuột ra ngoài hoặc bị cắt đôi.
          // Ta cần chuyển đổi toàn bộ &nbsp; thành khoảng trắng bình thường.
          const cleanedData = dataRaw.replace(/&nbsp;/g, ' ');

          // bỏ qua tính năng an toàn angular, k cho angular lượt bớt các thẻ html
          this.safeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(cleanedData);
          this.crl.markForCheck();
          this.crl.detectChanges();
        },
        error: (err) => {
          if (isPlatformBrowser(PLATFORM_ID)) {
            console.error(err);
          }
        }
      })
    }
  }

  goToChapter(targetChapterId: string) {
    if (this.novelId && targetChapterId) {
      this.router.navigate(['/novel', this.novelId, 'chapter', targetChapterId]);
    }
  }

  goBack() {
    this.location.back();
  }

  submitComment(content: string) {
    if (this.novelId != null && this.chapterId != null) {
      let body = {
        novelId: this.novelId,
        chapterId: this.chapterId,
        content: content,
        parentComment: ""
      };

      this.commentServices.addComment(body).subscribe({
        next: (data: CommentModel) => {
          this.countComment = 0;
          this.loadComment();
          this.snackBar.open('Thêm bình luận thành công!', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
        },
        error: (err) => {
          console.log(err);
          this.snackBar.open('Thêm bình luận không thành công!', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  cancelComment() {
    console.log('Comment cancelled');
  }

  loadMoreComments() {
    this.countComment += this.limitComment;
    this.loadComment(true);
  }
}
