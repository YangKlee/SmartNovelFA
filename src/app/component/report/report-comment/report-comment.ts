import { Component, OnInit } from '@angular/core'; // 🌟 Thêm OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // 🌟 Thêm ActivatedRoute và Router

import { ReportServices } from '../../../services/report/report-services';

@Component({
  selector: 'app-report-comment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './report-comment.html',
  styleUrls: ['./report-comment.css']
})
export class ReportComment implements OnInit { // 🌟 Thực thi OnInit

  commentId = ''; // 🌟 Bỏ @Input() để lấy động từ URL
  reporterUid = ''; // 🌟 Sẽ tự bóc từ token ra
  reasonDetail = '';

  reasons = [
    'Spam',
    'Ngôn từ xúc phạm',
    'Nội dung người lớn',
    'Quấy rối',
    'Thông tin sai lệch',
    'Khác'
  ];

  constructor(
    private route: ActivatedRoute, // 🌟 Inject dịch vụ điều hướng đường dẫn
    private router: Router,
    private reportService: ReportServices
  ) {}

  ngOnInit(): void {
    // 1. Lấy Comment ID từ URL trực tiếp (Ví dụ link: /report-comment/1881b386-...)
    this.commentId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Comment ID nhận được:', this.commentId);

    if (!this.commentId) {
      alert('Không tìm thấy mã bình luận');
      this.router.navigate(['/']);
      return;
    }

    // 2. Tự đọc và giải mã TOKEN trong localStorage để lấy UID người dùng đăng nhập
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Dữ liệu token bóc ra ở Comment:', payload); 

        // Gán UID từ token (khớp theo cấu trúc payload của bạn ở Novel và Chapter)
        this.reporterUid = payload.uid || payload.nameid || '';
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
      }
    }

    console.log('Reporter UID lấy từ Token thực tế:', this.reporterUid);

    // 3. Nếu chưa đăng nhập (không có UID), đá về trang đăng nhập luôn
    if (!this.reporterUid) {
      alert('Vui lòng đăng nhập trước khi thực hiện báo cáo!');
      this.router.navigate(['/login']);
    }
  }

  submitReport() {
    if (!this.reasonDetail) {
      alert('Vui lòng chọn lý do');
      return;
    }

    const payload = {
      commentId: this.commentId,
      reporterUid: this.reporterUid,
      reasonDetail: this.reasonDetail
    };

    console.log('Payload Comment gửi lên:', payload);

    this.reportService.reportComment(payload)
    .subscribe({
      next: () => {
        alert('Báo cáo thành công');
      },
      error: (err) => {
        console.error(err);
        alert(err?.error || 'Gửi báo cáo bình luận thất bại');
      }
    });
  }
}