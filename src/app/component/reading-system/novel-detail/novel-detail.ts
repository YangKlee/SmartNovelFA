import { Component, OnInit, ChangeDetectorRef, signal, PLATFORM_ID, inject } from '@angular/core'; // 1. Thêm signal từ @angular/core
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { NovelServices } from '../../../services/novel/novel-services';

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private novelService: NovelServices,
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
    console.log('Đã thêm truyện vào danh sách theo dõi');
  }

  followAuthor() {
    console.log('Đã theo dõi tác giả');
  }

  reportNovel() {
    console.log('Đã gửi báo cáo vi phạm');
  }
}