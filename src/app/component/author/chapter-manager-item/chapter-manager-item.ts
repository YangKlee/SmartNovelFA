import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Chapter } from '../../../models/chapter/chapter.model';

@Component({
  selector: 'app-chapter-manager-item',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './chapter-manager-item.html',
  styleUrl: './chapter-manager-item.css',
})
export class ChapterManagerItem {
  @Input() chapter: Chapter = {
    chapterId: '1',
    chaperOrder: 1,
    novelId: 'novel1',
    chapterTitle: 'Chương 1: Khởi đầu',
    summaryChapter: 'Đêm đã khuya, ánh trăng nhạt nhòa chiếu qua khe cửa sổ. Trong căn phòng tối, một bóng người đang ngồi trước bàn làm việc...',
    status: 'public',
    createTime: new Date('2026-05-01T00:00:00'),
    updateTime: new Date('2026-05-01T00:00:00')
  };

  @Output() view = new EventEmitter<Chapter>();
  @Output() edit = new EventEmitter<Chapter>();
  @Output() delete = new EventEmitter<Chapter>();

  onView() {
    this.view.emit(this.chapter);
  }

  onEdit() {
    this.edit.emit(this.chapter);
  }

  onDelete() {
    this.delete.emit(this.chapter);
  }
}
