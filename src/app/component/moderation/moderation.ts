import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModerationReportServices } from '../../services/report/report-services';

@Component({
  selector: 'app-moderation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './moderation.html',
  styleUrls: ['./moderation.css']
})
export class ModerationComponent implements OnInit {

  novels: any[] = [];
  chapters: any[] = [];
  comments: any[] = [];
  history: any[] = [];

  activeTab = 'novels';

  moderatorUid = '';

  constructor(
    private reportService: ModerationReportServices,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      alert('Bạn chưa đăng nhập hoặc phiên làm việc đã hết hạn!');
      return;
    }

    try {

      const payload = JSON.parse(
        atob(token.split('.')[1])
      );

      this.moderatorUid =
        payload.uid ||
        payload.nameid ||
        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

      console.log('Moderator UID:', this.moderatorUid);

      if (!this.moderatorUid) {
        alert('Không tìm thấy UID trong token');
        return;
      }

      this.loadAll();

    }
    catch (e) {
      console.error('Lỗi giải mã token:', e);
      alert('Token không hợp lệ');
    }
  }

  loadAll(): void {
    this.loadNovels();
    this.loadChapters();
    this.loadComments();
    this.loadHistory();
  }

  loadNovels(): void {
    this.reportService
      .getReportedNovels()
      .subscribe({
        next: (res) => {
          console.log('Reported novels:', res);
          this.novels = [...res];
        },
        error: (err) => {
          console.error('Lỗi tải truyện:', err);
        }
      });
  }

  loadChapters(): void {
    this.reportService
      .getReportedChapters()
      .subscribe({
        next: (res) => {
          console.log('Reported chapters:', res);
          this.chapters = [...res];
        },
        error: (err) => {
          console.error('Lỗi tải chương:', err);
        }
      });
  }

  loadComments(): void {
    this.reportService
      .getReportedComments()
      .subscribe({
        next: (res) => {
          console.log('Reported comments:', res);
          this.comments = [...res];
        },
        error: (err) => {
          console.error('Lỗi tải bình luận:', err);
        }
      });
  }

  loadHistory(): void {
    this.reportService
      .getHistory()
      .subscribe({
        next: (res) => {
          console.log('History:', res);
          this.history = [...res];
        },
        error: (err) => {
          console.error('Lỗi tải lịch sử:', err);
        }
      });
  }

  removeNovel(ticketId: string): void {

    if (!ticketId) return;

    if (!confirm('Bạn có chắc muốn gỡ truyện này không?')) {
      return;
    }

    this.reportService
      .removeNovel(ticketId, this.moderatorUid)
      .subscribe({
        next: (res) => {

          console.log('REMOVE NOVEL SUCCESS:', res);

          alert('Đã gỡ truyện thành công');

          this.loadAll();

        },
        error: (err) => {

          console.error(err);

          alert('Không thể gỡ truyện');
        }
      });
  }

  removeChapter(ticketId: string): void {

    if (!ticketId) return;

    if (!confirm('Bạn có chắc muốn gỡ chương này không?')) {
      return;
    }

    this.reportService
      .removeChapter(ticketId, this.moderatorUid)
      .subscribe({
        next: (res) => {

          console.log('REMOVE CHAPTER SUCCESS:', res);

          alert('Đã gỡ chương thành công');

          this.loadAll();

        },
        error: (err) => {

          console.error(err);

          alert('Không thể gỡ chương');
        }
      });
  }

  removeComment(ticketId: string): void {

    if (!ticketId) return;

    if (!confirm('Bạn có chắc muốn gỡ bình luận này không?')) {
      return;
    }

    this.reportService
      .removeComment(ticketId, this.moderatorUid)
      .subscribe({
        next: (res) => {

          console.log('REMOVE COMMENT SUCCESS:', res);

          alert('Đã gỡ bình luận thành công');

          this.loadAll();

        },
        error: (err) => {

          console.error(err);

          alert('Không thể gỡ bình luận');
        }
      });
  }

  reject(ticketId: string): void {

    if (!ticketId) return;

    if (!confirm('Bạn có chắc muốn bác bỏ báo cáo này không?')) {
      return;
    }

    this.reportService
      .rejectTicket(ticketId, this.moderatorUid)
      .subscribe({
        next: (res) => {

          console.log('REJECT SUCCESS:', res);

          alert('Đã bác bỏ báo cáo');

          this.loadAll();

        },
        error: (err) => {

          console.error(err);

          alert('Không thể bác bỏ báo cáo');
        }
      });
  }
}