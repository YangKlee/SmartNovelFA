import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core'; // 1. Thêm ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { CategoryNovelService } from '../../services/category/category-novel';
import { switchMap } from 'rxjs/operators'; // 2. Thêm operator này

@Component({
  selector: 'app-category-novel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-novel.html',
  styleUrl: './category-novel.css'
})
export class CategoryNovel implements OnInit {
  slug: string = '';
  novels: any[] = [];
  currentPage: number = 1;
  pageSize: number = 12;
  totalItems: number = 0;
  totalPages: number = 0;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private categoryNovelService: CategoryNovelService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef // 3. Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // 4. Dùng switchMap để lắng nghe thay đổi URL một cách chuyên nghiệp
    this.route.paramMap.pipe(
      switchMap(params => {
        this.slug = params.get('slug') ?? '';
        this.currentPage = 1;
        this.loading = true;
        this.novels = []; // Xóa trắng dữ liệu cũ ngay khi chuyển trang
        
        return this.categoryNovelService.getNovelByCategory(this.slug, this.currentPage, this.pageSize);
      })
    ).subscribe({
      next: (res) => {
        this.novels = res.novels ?? [];
        this.totalItems = res.totalItems ?? 0;
        this.totalPages = res.totalPages ?? 0;
        this.loading = false;
        
        // 5. Ép buộc Angular vẽ lại giao diện
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Bạn không cần gọi loadNovels() trong ngOnInit nữa vì switchMap đã làm thay
  // Nhưng hãy giữ hàm loadNovels() để dùng cho việc đổi trang (pagination)
  loadNovels(): void {
    if (!this.slug) return;
    this.loading = true;

    this.categoryNovelService
      .getNovelByCategory(this.slug, this.currentPage, this.pageSize)
      .subscribe({
        next: (res) => {
          this.novels = res.novels ?? [];
          this.totalItems = res.totalItems ?? 0;
          this.totalPages = res.totalPages ?? 0;
          this.loading = false;
          this.cdr.detectChanges(); // Thêm vào đây để pagination cũng không bị kẹt
        }
      });
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.loadNovels();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}