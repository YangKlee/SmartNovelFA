import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserServices } from '../../../services/user/user-services';

export interface ChapterView {
  chapterId: string;
  chaperOrder: number;
  chapterTitle: string;
}

export interface NovelInfo {
  novelId: string;
  title: string;
  imageNovelUrl: string;
}

export interface NovelHistory {
  chapterView: ChapterView;
  novelInfo: NovelInfo;
}

export interface HistoryItem {
  history: NovelHistory;
  timeView: string | null;
}

@Component({
  selector: 'app-history-read',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './history-read.html',
  styleUrl: './history-read.css',
})
export class HistoryRead implements OnInit {
  historyItems: HistoryItem[] = [];
  isLoading = true;
  errorMsg = '';

  constructor(
    private userServices: UserServices,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadHistory();
    }
  }

  loadHistory(): void {
    this.isLoading = true;
    this.errorMsg = '';
    this.userServices.getHistoryView().subscribe({
      next: (data: any[]) => {
        this.historyItems = data;
        this.isLoading = false;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching history:', err);
        this.errorMsg = 'Không thể tải lịch sử đọc. Vui lòng thử lại sau.';
        this.isLoading = false;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      }
    });
  }
}
