import { Component, OnInit, ChangeDetectorRef, signal, PLATFORM_ID, inject } from '@angular/core'; // 1. Thêm signal từ @angular/core
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { NovelServices } from '../../../services/novel/novel-services';
import { FollowServices } from '../../../services/follow/follow-services';
import { RatingServices } from '../../../services/rating/rating-services';

@Component({
  selector: 'app-novel-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './novel-detail.html',
  styleUrl: './novel-detail.css'
})
export class NovelDetail implements OnInit {
  private platformId = inject(PLATFORM_ID);

  // 2. Chuyển đổi các biến thông thường sang Angular Signals để triệt tiêu lỗi NG0100
  novel = signal<any>(null);
  chapters = signal<any[]>([]);
  isLoading = signal<boolean>(true);
  firstChapter: string | null = null;
  lastChapter: string | null = null;
  readingChapter: string | null = null;

  isFollowingNovel = signal<boolean>(false);
  isFollowingAuthor = signal<boolean>(false);
  isBlockedAuthor = signal<boolean>(false);

  averageRating = signal<number>(0);
  userRating = signal<number>(0);
  hoverRating = signal<number>(0);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private novelService: NovelServices,
    private followService: FollowServices,
    private ratingService: RatingServices,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }

    this.route.paramMap.subscribe(params => {
      const novelid = params.get('novelID');
      console.log('Slug:', novelid);

      if (!novelid) {
        this.isLoading.set(false);
        this.cdr.detectChanges();
        return;
      }

      this.loadNovel(novelid);
    });
  }

  loadNovel(novelID: string): void {
    this.isLoading.set(true);

    this.novelService
      .getNovel(novelID)
      .subscribe({
        next: (res: any) => {
          console.log('Novel API:', res);

          // Dùng hàm .set() của Signal để cập nhật dữ liệu an toàn
          this.novel.set(res.novel);
          this.firstChapter = res?.firstChapter;
          this.lastChapter = res?.newestChapter;
          this.readingChapter = res?.readingChapter;
          this.isFollowingNovel.set(res?.isFollowNovel || false);
          this.isFollowingAuthor.set(res?.isFollowAuthor || false);
          this.isBlockedAuthor.set(res?.isBlockedAuthor || false);
          this.averageRating.set(res?.averageRating || 0);
          this.userRating.set(res?.userRating || 0);
          if (res.novel.novelId) {
            this.loadChapters(res.novel.novelId);
          } else {
            this.isLoading.set(false);
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          console.error('Lỗi lấy truyện:', err);
          this.isLoading.set(false);
          this.cdr.detectChanges();
        }
      });
  }

  loadChapters(novelId: string): void {
    this.novelService
      .getChapters(novelId)
      .subscribe({
        next: (res: any) => {
          console.log('Chapters API:', res);

          // Cập nhật danh sách chương và tắt loading bằng Signal
          this.chapters.set(res || []);
          this.isLoading.set(false);

          // Ép một chu kỳ macro-task nhỏ cuối cùng để giao diện đồng bộ hoàn toàn
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Lỗi lấy chương:', err);
          this.isLoading.set(false);
          this.cdr.detectChanges();
        }
      });
  }

  readNovel() {
    if (this.firstChapter && this.novel()?.novelId) {
      this.router.navigate(['/novel', this.novel().novelId, 'chapter', this.firstChapter]);
    }
  }

  continueReading() {
    if (this.readingChapter && this.novel()?.novelId) {
      this.router.navigate(['/novel', this.novel().novelId, 'chapter', this.readingChapter]);
    }
  }

  readLatestChapter() {
    if (this.lastChapter && this.novel()?.novelId) {
      this.router.navigate(['/novel', this.novel().novelId, 'chapter', this.lastChapter]);
    }
  }

  followNovel() {
    if (!isPlatformBrowser(this.platformId)) return;
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const novelId = this.novel()?.novelId;
    if (!novelId) return;

    if (this.isFollowingNovel()) {
      this.followService.unFollowNovel(novelId).subscribe({
        next: () => {
          this.isFollowingNovel.set(false);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Lỗi khi bỏ theo dõi truyện:', err)
      });
    } else {
      this.followService.followNovel(novelId).subscribe({
        next: () => {
          this.isFollowingNovel.set(true);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Lỗi khi theo dõi truyện:', err)
      });
    }
  }

  followAuthor() {
    if (!isPlatformBrowser(this.platformId)) return;
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const authorId = this.novel()?.uid;
    const novelId = this.novel()?.novelId;
    if (!authorId || !novelId) return;

    if (this.isFollowingAuthor()) {
      this.followService.unFollowAuthor(authorId, novelId).subscribe({
        next: () => {
          this.isFollowingAuthor.set(false);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Lỗi khi bỏ theo dõi tác giả:', err)
      });
    } else {
      this.followService.followAuthor(authorId, novelId).subscribe({
        next: () => {
          this.isFollowingAuthor.set(true);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Lỗi khi theo dõi tác giả:', err)
      });
    }
  }

  toggleBlockAuthor() {
    if (!isPlatformBrowser(this.platformId)) return;
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const authorId = this.novel()?.uid;
    if (!authorId) return;

    if (this.isBlockedAuthor()) {
      this.followService.unBlockAuthor(authorId).subscribe({
        next: () => {
          this.isBlockedAuthor.set(false);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Lỗi khi bỏ chặn tác giả:', err)
      });
    } else {
      this.followService.blockAuthor(authorId).subscribe({
        next: () => {
          this.isBlockedAuthor.set(true);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Lỗi khi chặn tác giả:', err)
      });
    }
  }

  submitRating(rating: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const novelId = this.novel()?.novelId;
    if (!novelId) return;

    this.ratingService.rateNovel(novelId, rating).subscribe({
      next: () => {
        this.userRating.set(rating);
        this.loadNovel(novelId); // refresh average and user ratings
      },
      error: (err) => console.error('Lỗi khi đánh giá truyện:', err)
    });
  }

  reportNovel() {
    console.log('Đã gửi báo cáo vi phạm');
  }
}