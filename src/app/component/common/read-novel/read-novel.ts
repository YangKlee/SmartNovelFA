import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { NovelServices } from '../../../services/novel/novel-services';
import { ChapterServices } from '../../../services/chapter/chapter-services';
import { AuthServices } from '../../../services/auth/auth-services';
import { Novel } from '../../../models/novel/novel.model';
import { Chapter } from '../../../models/chapter/chapter.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { E } from '@angular/cdk/keycodes';
import { Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { Observable, of, catchError, map, tap } from 'rxjs';
import da from '@angular/common/locales/da';
import { HttpClient } from '@angular/common/http';
import { Sidebar } from '../../HomePage/sidebar/sidebar';
import { CommentServices } from '../../../services/comment/comment-services';
import { UserServices } from '../../../services/user/user-services';
import { CommentRes } from '../../../models/comment/comment-res';
import { Comment as CommentModel } from '../../../models/comment/comment.model';
import { Comment as CommentComponent } from '../comment/comment';
import { WriteComment } from '../write-comment/write-comment';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-read-novel',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    Sidebar,
    CommentComponent,
    WriteComment
  ],
  templateUrl: './read-novel.html',
  styleUrl: './read-novel.css',
})
export class ReadNovel implements OnInit, OnDestroy {
  isDevToolsOpen = false;
  private devToolsIntervalId: any;
  novelId!: string | null;
  chapterId!: string | null;
  chapterIdSelected!: string | null;

  chapterFileUrl: string | null = null;
  safeHtmlContent!: SafeHtml;
  comments: CommentModel[] = [];
  countComment: number = 0;
  totalComment: number = 0;
  limitComment: number = 5;
  isLoggedIn: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private novelServices: NovelServices,
    private chapterServices: ChapterServices, @Inject(PLATFORM_ID) private platformId: Object,
    private crl: ChangeDetectorRef, private http: HttpClient,
    private sanitizer: DomSanitizer, private location: Location,
    private authServices: AuthServices, private commentServices: CommentServices,
    private userServices: UserServices, private snackBar: MatSnackBar) { }
  novel!: Observable<Novel>;
  chapter!: Observable<Chapter>;
  chapters$!: Observable<Chapter[]>;
  novelUpdate: Novel[] = [];
  novelFollowing: Novel[] = [];
  theme: 'light' | 'dark' | 'sepia' = 'light'; // Trạng thái giao diện
  fontSize: number = 19; // Khai báo cỡ chữ mặc định
  fontFamily: string = 'Roboto'; // Kiểu chữ

  ngOnInit() {
    this.startDevToolsDetection();
    this.checkLoginStatus();
    this.loadUserAndSettings();
    this.loadNovelUpdate();
    this.loadNovelFollowing();
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

  checkLoginStatus() {
    this.userServices.getUserInfo().subscribe({
      next: (user) => {
        this.isLoggedIn = !!user;
        this.crl.detectChanges();
      },
      error: () => {
        this.isLoggedIn = false;
        this.crl.detectChanges();
      }
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
          if (this.chapterId) {
            this.userServices.recordChapterView(this.chapterId).subscribe({
              error: (err) => console.error('Lỗi khi ghi lịch sử:', err)
            });
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
          // Lọc bỏ toàn bộ inline styles liên quan đến background để tránh xung đột màu nền ở các chế độ đọc
          const cleanedData = dataRaw
            .replace(/&nbsp;/g, ' ')
            .replace(/background[^;"]*:\s*[^;"]+;?/gi, '');

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

  // Hàm chuyển đổi chế độ giao diện theo vòng lặp Sáng -> Vàng -> Tối
  cycleTheme() {
    if (this.theme === 'light') {
      this.theme = 'sepia';
    } else if (this.theme === 'sepia') {
      this.theme = 'dark';
    } else {
      this.theme = 'light';
    }
    this.updateSettingsOnServer();
  }

  // Hàm tăng cỡ chữ
  increaseFontSize() {
    if (this.fontSize < 32) {
      this.fontSize += 2;
      this.updateSettingsOnServer();
    }
  }

  // Hàm giảm cỡ chữ
  decreaseFontSize() {
    if (this.fontSize > 12) {
      this.fontSize -= 2;
      this.updateSettingsOnServer();
    }
  }

  changeFontFamily(font: string) {
    this.fontFamily = font;
    this.updateSettingsOnServer();
  }

  private updateSettingsOnServer() {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('token')) {
      this.authServices.updateReadingPreferences(this.theme, this.fontSize, this.fontFamily).subscribe();
    }
  }

  private loadUserAndSettings() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.authServices.loadInfoUserLogined()?.subscribe({
          next: (user) => {
            if (user) {
              if (user.readingTheme) this.theme = user.readingTheme as any;
              if (user.readingFontSize) this.fontSize = user.readingFontSize;
              if (user.readingFontFamily) this.fontFamily = user.readingFontFamily;
              this.crl.markForCheck();
            }
          },
          error: (err) => console.error('Lỗi lấy thông tin user:', err)
        });
      }
    }
  }

  private loadNovelUpdate(): void {
    this.novelServices.getNovelUpdate().subscribe({
      next: (novels) => {
        this.novelUpdate = novels && novels.length > 0 ? [...novels] : [];
        this.crl.markForCheck();
      },
      error: (err) => console.error('Lỗi tải Update:', err)
    });
  }

  private loadNovelFollowing(): void {
    this.novelServices.getNovelFollowing().subscribe({
      next: (novels) => {
        this.novelFollowing = novels && novels.length > 0 ? [...novels] : [];
        this.crl.markForCheck();
      },
      error: (err) => console.error('Lỗi tải Following:', err)
    });
  }

  submitComment(content: string) {
    if (this.novelId != null && this.chapterId != null) {
      const body = {
        novelId: this.novelId,
        chapterId: this.chapterId,
        content: content
      };
      this.commentServices.addComment(body).subscribe({
        next: (res) => {
          this.commentServices.isReloadComment.next(true);
        },
        error: (err) => {
          console.error('Lỗi thêm bình luận:', err);
        }
      });
    }
  }

  cancelComment() {
    // No action needed for cancel on top-level comment input
  }

  loadMoreComments() {
    this.countComment = this.comments.length;
    this.loadComment(true);
  }

  ngOnDestroy() {
    if (this.devToolsIntervalId) {
      clearInterval(this.devToolsIntervalId);
    }
  }

  startDevToolsDetection() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Kiểm tra ngay lập tức khi vào trang
    this.checkDevTools();

    // Thiết lập kiểm tra định kỳ mỗi 1 giây
    this.devToolsIntervalId = setInterval(() => {
      this.checkDevTools();
    }, 1000);
  }

  checkDevTools() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Bỏ qua kiểm tra nếu ở localhost (phục vụ phát triển)
    // if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    //   return;
    // }

    const threshold = 160;
    // 1. Kiểm tra kích thước cửa sổ (DevTools gắn liền)
    const widthDiff = window.outerWidth - window.innerWidth > threshold;
    const heightDiff = window.outerHeight - window.innerHeight > threshold;

    if (widthDiff || heightDiff) {
      this.isDevToolsOpen = true;
      this.crl.detectChanges();
      return;
    }

    // 2. Kiểm tra bằng console log getter (cho trường hợp DevTools tách rời hoặc thu nhỏ)
    let devtoolsOpen = false;
    const element = new Image();
    Object.defineProperty(element, 'id', {
      get: () => {
        devtoolsOpen = true;
        return 'devtools-detected';
      }
    });
    console.log(element);

    // 3. Đo lường thời gian chạy debugger
    const start = performance.now();
    debugger;
    const end = performance.now();
    if (end - start > 100) {
      devtoolsOpen = true;
    }

    if (devtoolsOpen) {
      this.isDevToolsOpen = true;
      this.crl.detectChanges();
    }
  }

  reloadPage() {
    if (isPlatformBrowser(this.platformId)) {
      window.location.reload();
    }
  }

  // Ngăn chặn chuột phải (contextmenu)
  @HostListener('document:contextmenu', ['$event'])
  blockContextMenu(event: MouseEvent) {
    event.preventDefault();
  }

  // Ngăn chặn copy/cut
  @HostListener('document:copy', ['$event'])
  @HostListener('document:cut', ['$event'])
  blockCopy(event: ClipboardEvent) {
    event.preventDefault();
  }

  // Ngăn chặn các phím tắt F12, Ctrl+C, Ctrl+Shift+I, Ctrl+U, Ctrl+P, etc.
  @HostListener('document:keydown', ['$event'])
  blockHotkeys(event: KeyboardEvent) {
    // F12
    if (event.key === 'F12') {
      event.preventDefault();
      return;
    }

    // Các phím tắt với Ctrl hoặc Cmd
    if (event.ctrlKey || event.metaKey) {
      const key = event.key.toLowerCase();
      // c (copy), x (cut), a (select all), s (save), u (view source), p (print)
      if (key === 'c' || key === 'x' || key === 'a' || key === 's' || key === 'u' || key === 'p') {
        event.preventDefault();
        return;
      }
      // Ctrl + Shift hotkeys (I, J, C)
      if (event.shiftKey && (key === 'i' || key === 'j' || key === 'c')) {
        event.preventDefault();
        return;
      }
    }
  }
}
