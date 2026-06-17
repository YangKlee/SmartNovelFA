import { Component, OnInit, ChangeDetectorRef, signal, PLATFORM_ID, inject } from '@angular/core'; // 1. Thêm signal từ @angular/core
import { ActivatedRoute, RouterModule , Router} from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NovelServices } from '../../../services/novel/novel-services';
import { NovelInteractionService } from '../../../services/follow/novel-interaction.service';
import { BlockServices } from '../../../services/block/block-services';
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
  currentRating = signal(0);
  averageRating = signal(0);
  totalRatings = signal(0);
 constructor(
  private route: ActivatedRoute,
  private novelService: NovelServices,
  private cdr: ChangeDetectorRef,
  private router: Router,
  private novelInteractionService: NovelInteractionService,
  private BlockService: BlockServices
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

// Kiểm tra trạng thái follow truyện và block tác giả
loadInteractionStatus(): void {
  const novelId = this.novel()?.novelId;
  const authorId = this.novel()?.uid;
  console.log('Kiểm tra trạng thái','NovelId:',novelId,'AuthorId:',authorId);
  // Kiểm tra follow truyện
  if (novelId) {
    this.novelInteractionService
      .getFollowingNovels()
      .subscribe({
        next: (novels: any[]) => {
          const followed = novels?.some(x =>String(x.novelId).toLowerCase() === String(novelId).toLowerCase()
          );
          this.isFollowing.set(!!followed);
        },
        error: err => {
          console.error('Lỗi follow:', err);
          this.isFollowing.set(false);
        }
      });
  }
  // Kiểm tra block tác giả
  if (authorId) {
    this.BlockService
      .isBlocked(authorId)
      .subscribe({next: (blocked) => {this.isBlocked.set(blocked); },
        error: err => {
          console.error('Lỗi block:', err);
          this.isBlocked.set(false);
        }
      });
  }
}

loadMyRating(novelId: string): void {

  this.novelInteractionService
    .getMyRating(novelId)
    .subscribe({
      next: (rating) => {
        this.currentRating.set(rating ?? 0);
      },
      error: (err) => {
        console.error(err);
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
        if (res && res.novel) {
          this.novel.set(res.novel);
          this.averageRating.set(res.averageRating ?? 0);
          this.totalRatings.set(res.novel.ratings?.length ?? 0);
          this.isFollowing.set(res.isFollowNovel ?? false);
          this.isBlocked.set(res.isBlockedAuthor ?? false);
          this.currentRating.set(res.userRating ?? 0);

          // Load trạng thái follow/block
          this.loadInteractionStatus();

          if (res.novel.novelId) {
            this.loadMyRating(res.novel.novelId);
            this.loadChapters(res.novel.novelId);
          } else {
            this.isLoading.set(false);
            this.cdr.detectChanges();
          }
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
    goReportNovel(): void {

    const novel = this.novel();

    if (!novel?.novelId) {
      return;
    }

    this.router.navigate([
      '/report/novel',
      novel.novelId
    ]);
  }

  this.novelInteractionService
    .followNovel(novelId)
    .subscribe({
      next: () => {
        this.isFollowing.set(true);
      }
    });
}
// Chặn / bỏ chặn tác giả
toggleBlockAuthor(): void {

  const authorId = this.novel()?.uid;

  if (!authorId) return;

  if (this.isBlocked()) {

    this.BlockService
      .unblock(authorId)
      .subscribe({
        next: () => {
          this.isBlocked.set(false);
        },
        error: err => {
          console.error('Unblock failed', err);
        }
      });

  } else {

    this.BlockService
      .block(authorId)
      .subscribe({
        next: () => {
          this.isBlocked.set(true);
        },
        error: err => {
          console.error('Block failed', err);
        }
      });

  }
}
rateNovel(star: number): void {
  const novelId = this.novel()?.novelId;
  if (!novelId) return;
  this.novelInteractionService
    .rateNovel(novelId, star)
    .subscribe({
      next: (res) => {
        if (!res.success) {
          alert(res.message);
          return;
        }
        this.currentRating.set(star);
        this.averageRating.set(res.averageRating);
        this.totalRatings.set(res.totalRatings);
        console.log('Đánh giá thành công', res);
      },
      error: (err) => {
        console.error(err);
      }
    });
}
}