import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-preview-chapter',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './preview-chapter.html',
  styleUrl: './preview-chapter.css',
})
export class PreviewChapter implements OnChanges {
  @Input() title: string = 'Bản xem trước';
  @Input() content: string = '';
  @Output() close = new EventEmitter<void>();

  safeContent: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}
  // hàm onchange sẽ auto gọi khi một biến nào đó thay đổi giá trị
  //changes chứa danh sách tất cả những biến vừa bị thay đổi
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      // Làm sạch &nbsp; như bên trang đọc để màn preview không bị lỗi đứt chữ
      const cleanedData = this.content ? this.content.replace(/&nbsp;/g, ' ') : '';
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(cleanedData);
    }
  }

  closePopup() {
    this.close.emit();
  }
}
