import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ChapterManagerItem } from '../chapter-manager-item/chapter-manager-item';
import { Chapter } from '../../../models/chapter/chapter.model';

@Component({
  selector: 'app-chapter-managerment',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ChapterManagerItem
  ],
  templateUrl: './chapter-managerment.html',
  styleUrl: './chapter-managerment.css',
})
export class ChapterManagerment {
  selectedNovel: string = 'novel1';
  searchQuery: string = '';
  selectedFilter: string = 'all';

  novels = [
    { id: 'novel1', name: 'Hành trình đi tìm giấc ngủ' },
    { id: 'novel2', name: 'Một câu chuyện khác' }
  ];

  filters = [
    { value: 'all', viewValue: 'Tất cả (4)' },
    { value: 'public', viewValue: 'Đã đăng (2)' },
    { value: 'draft', viewValue: 'Bản nháp (1)' },
    { value: 'removed', viewValue: 'Đã gỡ (1)' }
  ];

  chapters: Chapter[] = [
    {
      chapterId: '1',
      chaperOrder: 1,
      novelId: 'novel1',
      chapterTitle: 'Chương 1: Khởi đầu',
      status: 'public',
      summaryChapter: 'Đêm đã khuya, ánh trăng nhạt nhòa chiếu qua khe cửa sổ. Trong căn phòng tối, một bóng người đang ngồi trước bàn làm việc, ánh mắt dõi theo những dòng ...',
      updateTime: '1/5/2026',
      createTime: '1/5/2026'
    },
    {
      chapterId: '2',
      chaperOrder: 2,
      novelId: 'novel1',
      chapterTitle: 'Chương 2: Thử thách đầu tiên',
      status: 'public',
      summaryChapter: 'Sáng hôm sau, anh nhận được email từ một công ty công nghệ lớn. Họ muốn mời anh tham gia một dự án quan trọng, một cơ hội mà bất kỳ lập trình viên nào...',
      updateTime: '3/5/2026',
      createTime: '3/5/2026'
    },
    {
      chapterId: '3',
      chaperOrder: 3,
      novelId: 'novel1',
      chapterTitle: 'Chương 1: Khởi đầu',
      status: 'draft',
      summaryChapter: 'Đêm đã khuya, ánh trăng nhạt nhòa chiếu qua khe cửa sổ. Trong căn phòng tối, một bóng người đang ngồi trước bàn làm việc, ánh mắt dõi theo những dòng ...',
      updateTime: '15/5/2026'
    },
    {
      chapterId: '4',
      chaperOrder: 4,
      novelId: 'novel1',
      chapterTitle: 'Chương 4: 7749 giúp bạn đi ngủ',
      status: 'removed',
      summaryChapter: 'Chương này đã bị gỡ do vi phạm quy định cộng đồng....',
      updateTime: '12/5/2026'
    }
  ];

  get filteredChapters() {
    return this.chapters.filter(chapter => {
      const titleMatch = chapter.chapterTitle.toLowerCase().includes(this.searchQuery.toLowerCase());
      const summaryMatch = chapter.summaryChapter ? chapter.summaryChapter.toLowerCase().includes(this.searchQuery.toLowerCase()) : false;
      const matchesSearch = titleMatch || summaryMatch;
      const matchesFilter = this.selectedFilter === 'all' || chapter.status === this.selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }

  onViewChapter(chapter: Chapter) {
    console.log('View chapter:', chapter);
  }

  onEditChapter(chapter: Chapter) {
    console.log('Edit chapter:', chapter);
  }

  onDeleteChapter(chapter: Chapter) {
    console.log('Delete chapter:', chapter);
  }
}
