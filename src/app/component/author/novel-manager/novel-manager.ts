import { Component, OnInit, OnDestroy } from '@angular/core';
import { Novel } from '../../../models/novel/novel.model';
import { NovelServices } from '../../../services/novel/novel-services';
import { NovelLangeItem } from "../../common/novel-lange-item/novel-lange-item";
import { CommonModule } from "@angular/common"
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { ConfimDeleteRepype } from '../../common/confim-delete-repype/confim-delete-repype';
import { FormsModule } from '@angular/forms';
import { Pagination } from '../../common/pagination/pagination';

@Component({
  selector: 'app-novel-manager',
  imports: [NovelLangeItem, CommonModule, RouterModule, RouterOutlet, RouterLink, ConfimDeleteRepype, FormsModule, Pagination],
  templateUrl: './novel-manager.html',
  styleUrl: './novel-manager.css',
})
export class NovelManager implements OnInit, OnDestroy {
  public novels$!: Observable<Novel[]>;
  constructor(private novelServices: NovelServices) { };
  private platformId = inject(PLATFORM_ID);
  selectedStatus: string = 'all';
  keyword: string = '';
  currentPage = 1;
  pageSize = 5;
  totalRecords = 0;
  totalPages = 0;
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.novels$ = this.novelServices.reloadNovelList.pipe(
        switchMap(() => {
          // Nếu không có bộ lọc nào thì lấy tất cả
          if (this.selectedStatus === 'all' && !this.keyword) {
            // Cập nhật tổng số lượng
            this.novelServices.getTotalCountUserNovel().subscribe({
              next: (total) => {
                this.totalRecords = total;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
              },
              error: (err) => console.error('Lỗi lấy tổng số lượng:', err)
            });
            return this.novelServices.getUserNovel(this.currentPage, this.pageSize);
          }
          // Ngược lại lấy theo bộ lọc
          this.novelServices.getTotalCountSeachNovelAuthor(this.selectedStatus, this.keyword).subscribe({
            next: (total) => {
              this.totalRecords = total;
              this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            },
            error: (err) => console.error('Lỗi lấy tổng số lượng search:', err)
          });
          return this.novelServices.seachNovelAuthor(this.selectedStatus, this.keyword, '', this.currentPage, this.pageSize);
        })
      );
    } else {
      this.novels$ = of([]);
    }
  }

  ngOnDestroy() {
    // No longer need to manually unsubscribe from reloadSub
  }

  onDeleteNovel(novel: Novel) {
    if (novel != null && novel.novelId != null) {
      this.novelServices.deleteNovel(novel.novelId).subscribe({
        next: () => {
          alert("Xóa truyện thành công!");
          this.novelServices.reloadNovelList.next(true); // Triggers switchMap to fetch novels again
        },
        error: (err) => {
          alert("Xóa truyện không thành công");
          console.error(err.error?.Msg || err);
        }
      })
    }
  }
  onStatusChange() {
    this.currentPage = 1; // Đặt lại trang 1 khi filter
    this.novelServices.reloadNovelList.next(true);
  }
  onSeachChange() {
    this.currentPage = 1; // Đặt lại trang 1 khi search
    this.novelServices.reloadNovelList.next(true);
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.novelServices.reloadNovelList.next(true);
  }
}

