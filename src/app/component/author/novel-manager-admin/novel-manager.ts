import { Component, OnInit, OnDestroy } from '@angular/core';
import { Novel } from '../../../models/novel/novel.model';
import { User } from '../../../models/user/user.model';
import { NovelServices } from '../../../services/novel/novel-services';
import { NovelLangeItem } from "../../common/novel-lange-item-admin/novel-lange-item";
import { CommonModule } from "@angular/common"
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { ConfimDeleteRepype } from '../../common/confim-delete-repype/confim-delete-repype';
import { FormsModule } from '@angular/forms';
import { Pagination } from '../../common/pagination/pagination';
import { Pagination as PaginationModel } from '../../../models/pagination/pagination';
import { map } from 'rxjs/operators';

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
  selectedAuthorId: string = '';
  authors: User[] = [];
  currentPage = 1;
  pageSize = 5;
  totalRecords = 0;
  totalPages = 0;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.novelServices.getAllAuthor().subscribe({
        next: (data) => this.authors = data,
        error: (err) => console.error('Lỗi lấy danh sách tác giả:', err)
      });

      this.novels$ = this.novelServices.reloadNovelList.pipe(
        switchMap(() => {
          return this.novelServices.getNovelForAdmin(this.currentPage, this.pageSize, this.keyword, this.selectedStatus, this.selectedAuthorId).pipe(
            map((res: PaginationModel<Novel>) => {
              this.totalRecords = res.totalRecords;
              this.totalPages = res.totalPages;
              return res.data;
            })
          );
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
    this.currentPage = 1;
    this.novelServices.reloadNovelList.next(true);
  }

  onAuthorChange() {
    this.currentPage = 1;
    this.novelServices.reloadNovelList.next(true);
  }

  onSeachChange() {
    this.currentPage = 1;
    this.novelServices.reloadNovelList.next(true);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.novelServices.reloadNovelList.next(true);
  }
}
