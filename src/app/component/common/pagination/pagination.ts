import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  @Input() currentPage!: number;
  @Input() totalPage!: number;

  @Output() pageChange = new EventEmitter<number>();

  visiblePages(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 3);
    const end = Math.min(this.totalPage, this.currentPage + 3);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPage) {
      this.pageChange.emit(page);
    }
  }
}
