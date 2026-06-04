import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core'; // 1. Thêm signal từ @angular/core
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  // 2. Chuyển đổi các biến thông thường sang Angular Signals để triệt tiêu lỗi NG0100
  novel = signal<any>(null);
  chapters = signal<any[]>([]);
  isLoading = signal<boolean>(true);

  constructor(
    private route: ActivatedRoute,
    private novelService: NovelServices,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
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
          this.novel.set(res);

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
}