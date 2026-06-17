import { Component, OnInit } from '@angular/core'; // 🌟 Thêm OnInit để chạy khi component khởi tạo
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // 🌟 Thêm ActivatedRoute và Router để xử lý URL

import { ReportServices } from '../../../services/report/user-report-services';

@Component({
  selector: 'app-report-chapter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './report-chapter.html',
  styleUrls: ['./report-chapter.css']
})
export class ReportChapter implements OnInit { // 🌟 Thực thi OnInit

  chapterId = ''; // 🌟 Bỏ @Input() để lấy động từ URL
  reporterUid = ''; // 🌟 Sẽ tự bóc từ token ra giống bên Novel
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
    private route: ActivatedRoute, // 🌟 Inject các dịch vụ điều hướng
    private router: Router,
    private reportService: ReportServices
  ) {}

  ngOnInit(): void {
    // 1. Lấy Chapter ID từ URL trực tiếp (Ví dụ link: /report-chapter/C040)
    this.chapterId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Chapter ID nhận được:', this.chapterId);

    if (!this.chapterId) {
      alert('Không tìm thấy mã chương truyện');
      this.router.navigate(['/']);
      return;
    }

    // 2. Tự đọc và giải mã TOKEN trong localStorage để bốc lấy UID
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Dữ liệu token bóc ra ở Chapter:', payload); 

        // Gán UID từ token (khớp theo cấu trúc payload của bạn giống file Novel)
        this.reporterUid = payload.uid || payload.nameid || '';
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
      }
    }

    console.log('Reporter UID lấy từ Token thực tế:', this.reporterUid);

    // 3. Nếu chưa đăng nhập (không có UID), yêu cầu đăng nhập
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
      chapterId: this.chapterId,
      reporterUid: this.reporterUid,
      reasonDetail: this.reasonDetail
    };

    console.log('Payload Chapter gửi lên:', payload);

    this.reportService.reportChapter(payload)
    .subscribe({
      next: () => {
        alert('Báo cáo thành công');
        // Bạn có thể chuyển hướng về lại trang chương truyện cũ sau khi báo cáo xong nếu muốn
        // this.router.navigate(['/chapter', this.chapterId]);
      },
      error: (err) => {
        console.error(err);
        alert(err?.error || 'Gửi báo cáo chương thất bại');
      }
    });
  }
}