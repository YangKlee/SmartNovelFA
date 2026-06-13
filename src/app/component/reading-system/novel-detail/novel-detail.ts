import { Component, OnInit, ChangeDetectorRef, signal, PLATFORM_ID, inject } from '@angular/core'; // 1. Thêm signal từ @angular/core
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { NovelServices } from '../../../services/novel/novel-services';
import { NovelInteractionService } from '../../../services/follow/novel-interaction.service';
import { UserBlockService } from '../../../services/block/user-block.service';
import { Router } from '@angular/router';

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
  isFollowing = signal(false);
  isBlocked = signal(false);

  constructor(
    private route: ActivatedRoute,
    private novelService: NovelServices,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private novelInteractionService: NovelInteractionService,
    private userBlockService: UserBlockService
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

loadInteractionStatus(): void {
  const novelId = this.novel()?.novelId || this.novel()?.NovelId;
  const authorId = this.novel()?.authorId || this.novel()?.AuthorId || this.novel()?.uid || this.novel()?.Uid;

  console.log('Kiểm tra trạng thái - NovelId:', novelId, 'AuthorId:', authorId);

  if (!novelId || !authorId) return;

  this.novelInteractionService
    .getFollowingNovels()
    .subscribe({
      next: (novels: any[]) => {
        console.log('Danh sách truyện đang theo dõi từ API:', novels);
        
        if (!novels || !Array.isArray(novels)) {
          this.isFollowing.set(false);
          return;
        }

        // So sánh an toàn không phân biệt hoa thường
        const followed = novels.some(x => {
          const idFromList = String(x.novelId || x.NovelId || '').toLowerCase();
          const currentNovelId = String(novelId).toLowerCase();
          return idFromList === currentNovelId;
        });

        console.log('Kết quả so sánh Followed:', followed);
        this.isFollowing.set(followed);
      },
      error: err => {
        console.error('Lỗi khi lấy danh sách follow:', err);
        this.isFollowing.set(false);
      }
    });

  this.userBlockService
    .getBlockedUsers()
    .subscribe({
      next: (users: any[]) => {
        console.log('Danh sách user đã block từ API:', users);

        if (!users || !Array.isArray(users)) {
          this.isBlocked.set(false);
          return;
        }

        // So sánh an toàn không phân biệt hoa thường
        const blocked = users.some(x => {
          const idFromList = String(x.uid || x.Uid || x.id || x.Id || '').toLowerCase();
          const currentAuthorId = String(authorId).toLowerCase();
          return idFromList === currentAuthorId;
        });

        console.log('Kết quả so sánh Blocked:', blocked);
        this.isBlocked.set(blocked);
      },
      error: err => {
        console.error('Lỗi khi lấy danh sách block:', err);
        this.isBlocked.set(false);
      }
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
          this.novel.set(res);

          // ===== LOAD TRẠNG THÁI FOLLOW/BLOCK =====
          this.loadInteractionStatus();

          if (res?.novelId) { 
            this.loadChapters(res.novelId);
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
  readFirstChapter(): void {
  const chapters = [...this.chapters()]
    .sort((a, b) => a.chaperOrder - b.chaperOrder);

  if (!chapters.length) return;

  this.router.navigate([
    '/novel',
    this.novel()?.novelId,
    'chapter',
    chapters[0].chapterId
  ]);
}
readLatestChapter(): void {
  const chapters = [...this.chapters()]
    .sort((a, b) => a.chaperOrder - b.chaperOrder);

  if (!chapters.length) return;

  this.router.navigate([
    '/novel',
    this.novel()?.novelId,
    'chapter',
    chapters[chapters.length - 1].chapterId
  ]);
}
//Follow truyện, bỏ follow
toggleFollow(): void {

  const novelId = this.novel()?.novelId;

  if (!novelId) return;

  if (this.isFollowing()) {

    this.novelInteractionService
      .unFollowNovel(novelId)
      .subscribe({
        next: () => {
          this.isFollowing.set(false);
        }
      });

    return;
  }

  this.novelInteractionService
    .followNovel(novelId)
    .subscribe({
      next: () => {
        this.isFollowing.set(true);
      }
    });
}
//Chặn tác giả, bỏ chặn
toggleBlockAuthor(): void {

  const authorId = this.novel()?.authorId;

  if (!authorId) return;

  if (this.isBlocked()) {

    this.userBlockService
      .unBlockAuthor(authorId)
      .subscribe({
        next: () => {
          this.isBlocked.set(false);
        }
      });

    return;
  }

  this.userBlockService
    .blockAuthor(authorId)
    .subscribe({
      next: () => {
        this.isBlocked.set(true);
      }
    });
}
}