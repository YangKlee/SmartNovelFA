import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../../../models/category/category.model';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.css']
})
export class CategoryListComponent {
  @Input() categories: Category[] = [];
  @Output() edit = new EventEmitter<Category>();
  @Output() delete = new EventEmitter<{id: string, name: string}>();

  onEdit(category: Category) {
    this.edit.emit(category);
  }

  onDelete(id: string, name: string) {
    this.delete.emit({ id, name });
  }
}
