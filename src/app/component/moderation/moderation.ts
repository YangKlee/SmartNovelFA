import { Component, OnInit,Inject,PLATFORM_ID } from '@angular/core';
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

  // Khai báo biến lưu UID của người đăng nhập (không gán cứng dữ liệu giả nữa)
  moderatorUid!: string;

  constructor(
    private reportService: ModerationReportServices,
    @Inject(PLATFORM_ID) private platformId: Object
    
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    
    if (!token) {
      alert("Bạn chưa đăng nhập hoặc phiên làm việc đã hết hạn!");
      // Bạn có thể inject thêm Router để điều hướng về trang login tại đây nếu muốn: this.router.navigate(['/auth/login']);
      return; 
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      // Bóc chuẩn UID từ Token do người dùng đăng nhập vào
      this.moderatorUid = payload.uid || payload.nameid || payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      
      if (!this.moderatorUid) {
        alert("Token không chứa thông tin định danh (UID). Vui lòng đăng nhập lại!");
        return;
      }

      // Có UID thật của người đăng nhập rồi mới tiến hành load dữ liệu
      this.loadAll();

    } catch (e) {
      console.error("Lỗi giải mã token:", e);
      alert("Hệ thống không thể xác thực tài khoản của bạn!");
    }
  }

  loadAll() {
    this.loadNovels();
    this.loadChapters();
    this.loadComments();
    this.loadHistory();
  }

  // ========================================================
  // CÁC HÀM TẢI DỮ LIỆU ĐỘNG
  // ========================================================

  loadNovels() {
    this.reportService
      .getReportedNovels()
      .subscribe({
        next: (res) => {
          setTimeout(() => this.novels = res, 0);
        },
        error: (err) => console.error("Lỗi khi fetch danh sách truyện:", err)
      });
  }

  loadChapters() {
    this.reportService
      .getReportedChapters()
      .subscribe({
        next: (res) => {
          setTimeout(() => this.chapters = res, 0);
        },
        error: (err) => console.error("Lỗi khi fetch danh sách chương:", err)
      });
  }

  loadComments() {
    this.reportService
      .getReportedComments()
      .subscribe({
        next: (res) => {
          setTimeout(() => this.comments = res, 0);
        },
        error: (err) => console.error("Lỗi khi fetch danh sách bình luận:", err)
      });
  }

  loadHistory() {
    this.reportService
      .getHistory()
      .subscribe({
        next: (res) => {
          setTimeout(() => this.history = res, 0);
        },
        error: (err) => console.error("Lỗi khi fetch lịch sử hệ thống:", err)
      });
  }

  // ========================================================
  // CÁC HÀM HÀNH ĐỘNG XỬ LÝ (Sử dụng trực tiếp UID người dùng)
  // ========================================================

  removeNovel(ticketId: string) {
    if (!ticketId) return;
    if (!confirm('Bạn có chắc chắn muốn GỠ truyện vi phạm này không?')) return;

    this.reportService
      .removeNovel(ticketId, this.moderatorUid)
      .subscribe({
        next: () => {
          alert('Đã gỡ truyện vi phạm thành công!');
          this.loadAll(); 
        },
        error: (err) => alert('Thao tác thất bại, vui lòng thử lại!')
      });
  }

  removeChapter(ticketId: string) {
    if (!ticketId) return;
    if (!confirm('Bạn có chắc chắn muốn GỠ chương vi phạm này không?')) return;

    this.reportService
      .removeChapter(ticketId, this.moderatorUid)
      .subscribe({
        next: () => {
          alert('Đã gỡ chương vi phạm thành công!');
          this.loadAll();
        },
        error: (err) => alert('Không thể gỡ chương truyện!')
      });
  }

  removeComment(ticketId: string) {
    if (!ticketId) return;
    if (!confirm('Bạn có chắc chắn muốn GỠ bình luận vi phạm này không?')) return;

    this.reportService
      .removeComment(ticketId, this.moderatorUid)
      .subscribe({
        next: () => {
          alert('Đã gỡ bình luận vi phạm thành công!');
          this.loadAll();
        },
        error: (err) => alert('Không thể gỡ bình luận!')
      });
  }

  reject(ticketId: string) {
    if (!ticketId) return;
    if (!confirm('Bạn có chắc chắn muốn BÁC BỎ đơn báo cáo này không?')) return;

    this.reportService
      .rejectTicket(ticketId, this.moderatorUid)
      .subscribe({
        next: () => {
          alert('Đã bác bỏ đơn báo cáo!');
          this.loadAll();
        },
        error: (err) => alert('Bác bỏ đơn báo cáo thất bại!')
      });
  }
}