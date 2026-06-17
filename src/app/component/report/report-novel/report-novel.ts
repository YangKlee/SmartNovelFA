import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ReportServices } from '../../../services/report/user-report-services';

@Component({
  selector: 'app-report-novel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './report-novel.html',
  styleUrls: ['./report-novel.css']
})
export class ReportNovel implements OnInit {

  novelId = '';
  reporterUid = ''; // Sẽ tự bốc từ token ra
  reasonDetail = '';

  reasons = [
    'Spam',
    'Ngôn từ xúc phạm',
    'Nội dung người lớn',
    'Quấy rối',
    'Thông tin sai lệch',
    'Vi phạm bản quyền',
    'Khác'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportServices
  ) { }

  ngOnInit(): void {
    // 1. Lấy Novel ID từ URL
    this.novelId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Novel ID:', this.novelId);

    if (!this.novelId) {
      alert('Không tìm thấy mã truyện');
      this.router.navigate(['/']);
      return;
    }

    // 2. TỰ ĐỌC VÀ GIẢI MÃ TOKEN TRONG LOCALSTORAGE ĐỂ LẤY UID
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Tách phần giữa của JWT Token và giải mã Base64
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Dữ liệu bóc ra từ Token:', payload); 

        // Gán UID (thường Backend .NET lưu vào trường 'uid' hoặc 'nameid')
        this.reporterUid = payload.uid || payload.nameid || '';
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
      }
    }

    console.log('Reporter UID lấy từ Token thực tế:', this.reporterUid);

    // 3. Nếu không tìm thấy UID (chưa đăng nhập hoặc token lỗi), đá về login
    if (!this.reporterUid) {
      alert('Vui lòng đăng nhập trước khi thực hiện báo cáo!');
      this.router.navigate(['/login']);
    }
  }

  submitReport(): void {
    if (!this.reasonDetail) {
      alert('Vui lòng chọn lý do báo cáo');
      return;
    }

    const payload = {
      novelId: this.novelId,
      reporterUid: this.reporterUid,
      reasonDetail: this.reasonDetail
    };

    console.log('Payload gửi lên:', payload);

    this.reportService
      .reportNovel(payload)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert('Báo cáo thành công');
          this.router.navigate([
            '/novel',
            this.novelId
          ]);
        },
        error: (err) => {
          console.error(err);
          alert(
            err?.error ||
            'Gửi báo cáo thất bại'
          );
        }
      });
  }
}