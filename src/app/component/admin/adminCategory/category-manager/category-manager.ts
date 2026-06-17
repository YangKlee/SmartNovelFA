import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminCategoryService } from '../../../../services/admin-category/admin-category.service';
import { Category } from '../../../../models/category/category.model';
import { CategoryListComponent } from '../category-list/category-list';
import { CategoryEditComponent } from '../category-edit/category-edit';

@Component({
  selector: 'app-category-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, CategoryListComponent, CategoryEditComponent],
  templateUrl: './category-manager.html',
  styleUrls: ['./category-manager.css']
})
export class CategoryManagerComponent implements OnInit {
  categories: Category[] = [];
  keyword: string = '';
  status: string = '';
  page: number = 1;
  totalPages: number = 1;
  totalRecords: number = 0;

  showForm = false;
  selectedCategory?: Category;

  constructor(private categoryService: AdminCategoryService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories(resetPage = false) {
    if (resetPage) this.page = 1;
    
    this.categoryService.getCategories(this.keyword, this.status, this.page).subscribe({
      next: (res) => {
        this.categories = res.data;
        this.page = res.currentPage;
        this.totalPages = res.totalPages;
        this.totalRecords = res.totalRecords;

         this.cdr.markForCheck(); 

      },
      error: (err) => {
        console.error("Lỗi tải thể loại", err);
      }
    });
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadCategories();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadCategories();
    }
  }

  openCreate() {
    this.selectedCategory = undefined;
    this.showForm = true;
  }

  openEdit(cat: Category) {
    this.selectedCategory = cat;
    this.showForm = true;
  }

  deleteCategory(event: {id: string, name: string}) {
    if (confirm(`Bạn có chắc chắn muốn xóa thể loại "${event.name}" không?`)) {
      this.categoryService.deleteCategory(event.id).subscribe({
        next: () => {
          alert('Xóa thành công!');
          this.loadCategories();
        },
        error: (err) => {
          alert(err.error?.message || "Lỗi xóa thể loại!");
        }
      });
    }
  }
}
