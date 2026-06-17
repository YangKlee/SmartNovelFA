import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Novel } from '../../../models/novel/novel.model';
import { RouterLink } from "@angular/router";
import { ConfimDeleteRepype } from '../confim-delete-repype/confim-delete-repype';

@Component({
  selector: 'app-novel-lange-item',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink, ConfimDeleteRepype],
  templateUrl: './novel-lange-item.html',
  styleUrl: './novel-lange-item.css',
})
export class NovelLangeItem {
  @Input() novel!: Novel;
  @Output() delete = new EventEmitter<Novel>();
  @Output() reject = new EventEmitter<Novel>();
  showConfirmDelete = false;
  confirmContent = '';
  confirmValidate = '';

  doDelete(novel: Novel) {
    const title = novel.title ?? '';
    this.confirmContent = `Bạn có chắc chắn muốn xóa truyện "${title}" không?`;
    this.confirmValidate = title;
    this.showConfirmDelete = true;
  }

  handleConfirmDelete(isConfirmed: boolean) {
    this.showConfirmDelete = false;
    if (isConfirmed) {
      this.delete.emit(this.novel);
    }
  }
  onReject() {
    this.reject.emit(this.novel);
  }
}
