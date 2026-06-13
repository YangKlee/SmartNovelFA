import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ChapterManagerItem } from '../chapter-manager-item-admin/chapter-manager-item';
import { Chapter } from '../../../models/chapter/chapter.model';
import { Novel } from '../../../models/novel/novel.model';
import { NovelServices } from '../../../services/novel/novel-services';
import { ChapterServices } from '../../../services/chapter/chapter-services';
import { ActivatedRoute, Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of, catchError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Pagination } from '../../common/pagination/pagination';
import { ConfimDeleteRepype } from '../../common/confim-delete-repype/confim-delete-repype';

@Component({
  selector: 'app-chapter-managerment',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ChapterManagerItem,
    RouterLink,
    RouterOutlet,
    QuillEditorComponent,
    ConfimDeleteRepype,
    Pagination
  ],
  templateUrl: './chapter-managerment.html',
  styleUrl: './chapter-managerment.css',
})
export class ChapterManagerment implements OnInit {
  selectedNovel?: Novel;
  searchQuery: string = '';

  novels!: Observable<Novel[]>;
  selectedNovelID: string = '';

  chapters!: Observable<Chapter[]>;
  isConfirmDeleteOpen: boolean = false;
  chapterToDelete: Chapter | null = null;

  isConfirmRejectOpen: boolean = false;
  chapterToReject: Chapter | null = null;

  selectedStatus: string = 'all';
  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;
  totalPages: number = 0;

  constructor(
    private novelServices: NovelServices,
    private chapterServices: ChapterServices,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    private crl: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getInfo();

    if (isPlatformBrowser(this.platformId)) {
      this.chapters = this.chapterServices.isReloadChapterManagerment.pipe(
        switchMap(() => {
          if (!this.selectedNovelID) return of([]);

          // Update total count
          this.chapterServices.getTotalCountSeachChapterAuthor(
            this.selectedNovelID, this.selectedStatus, this.searchQuery
          ).subscribe({
            next: (total) => {
              this.totalRecords = total;
              this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            },
            error: (err) => console.error('Lỗi lấy tổng số lượng chương:', err)
          });

          return this.chapterServices.seachChapterAuthor(
            this.selectedNovelID, this.selectedStatus, this.searchQuery, this.currentPage, this.pageSize
          ).pipe(
            catchError(err => {
              console.error(err);
              return of([]);
            })
          );
        })
      );
    } else {
      this.chapters = of([]);
    }
  }

  onNovelChange() {
    this.router.navigate([
      '/dashboard/author/chapter-manager',
      this.selectedNovelID
    ]);
    this.getInfo();
  }

  getInfo() {
    if (isPlatformBrowser(this.platformId)) {
      this.novels = this.novelServices.getUserNovel().pipe(
        catchError(err => {
          console.error(err);
          return of([]);
        })
      );

      this.novels.subscribe(e => {
        this.selectedNovelID =
          this.route.snapshot.paramMap.get('id') ?? '';

        this.selectedNovel =
          e.find(n => n.novelId == this.selectedNovelID);

        this.chapterServices.isReloadChapterManagerment.next(true);

        this.crl.detectChanges();
      });
    } else {
      this.novels = of([]);
      this.chapters = of([]);
    }
  }

  onStatusChange() {
    this.currentPage = 1;
    this.chapterServices.isReloadChapterManagerment.next(true);
  }

  onSearchChange() {
    this.currentPage = 1;
    this.chapterServices.isReloadChapterManagerment.next(true);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.chapterServices.isReloadChapterManagerment.next(true);
  }

  onViewChapter(chapter: Chapter) {
    this.router.navigate(['/novel', this.selectedNovelID, 'chapter', chapter.chapterId]);
  }

  onEditChapter(chapter: Chapter) {
    this.router.navigate(['./create-chapter'], {
      relativeTo: this.route,
      queryParams: { chapterId: chapter.chapterId }
    });
  }

  onDeleteChapter(chapter: Chapter) {
    this.chapterToDelete = chapter;
    this.isConfirmDeleteOpen = true;
  }

  handleDeleteConfirm(isConfirmed: boolean) {
    if (isConfirmed && this.chapterToDelete) {
      this.chapterServices.deleteChapter(this.chapterToDelete.chapterId).subscribe({
        next: (res) => {
          console.log('Xoá chương thành công:', res);
          alert('Xoá chương thành công!');
          this.getInfo();
        },
        error: (err) => {
          console.error('Lỗi khi xoá chương:', err);
          alert('Có lỗi xảy ra khi xoá chương!');
        }
      });
    }
    this.isConfirmDeleteOpen = false;
    this.chapterToDelete = null;
  }

  onRejectChapter(chapter: Chapter) {
    this.chapterToReject = chapter;
    this.isConfirmRejectOpen = true;
  }

  handleRejectConfirm(isConfirmed: boolean) {
    if (isConfirmed && this.chapterToReject) {
      this.chapterServices.rejectChapter(this.chapterToReject.chapterId).subscribe({
        next: (res) => {
          alert('Gỡ chương thành công!');
          this.chapterServices.isReloadChapterManagerment.next(true);
        },
        error: (err) => {
          console.error('Lỗi khi gỡ chương:', err);
          alert('Có lỗi xảy ra khi gỡ chương!');
        }
      });
    }
    this.isConfirmRejectOpen = false;
    this.chapterToReject = null;
  }
}