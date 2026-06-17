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
  @Input() chapter!: Chapter;
  @Output() view = new EventEmitter<Chapter>();
  @Output() edit = new EventEmitter<Chapter>();
  @Output() delete = new EventEmitter<Chapter>();
  @Output() reject = new EventEmitter<Chapter>();
  onView() {
    this.view.emit(this.chapter);
  }

  onEdit() {
    this.edit.emit(this.chapter);
  }

  onDelete() {
    this.delete.emit(this.chapter);
  }
  onReject() {
    this.reject.emit(this.chapter);
  }
}
