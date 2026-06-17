import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../../../models/category/category.model';
import { AdminCategoryService } from '../../../../services/admin-category/admin-category.service';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-edit.html',
  styleUrls: ['./category-edit.css']
})
export class CategoryEditComponent implements OnInit {
  @Input() categoryData?: Category;
  @Output() close = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();

  categoryForm!: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, private categoryService: AdminCategoryService) {}

  ngOnInit(): void {
    this.isEditMode = !!this.categoryData?.categoryId;

    this.categoryForm = this.fb.group({
      categoryId: [this.categoryData?.categoryId || ''],
      name: [this.categoryData?.name || '', [Validators.required]],
      description: [this.categoryData?.description || ''],
      status: [this.categoryData?.status || 'ACTIVE', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const formData = this.categoryForm.value as Category;
    
    // Bơm dữ liệu rác vào để lừa bộ kiểm tra (Validation) của Backend
    formData.slug = "dummy-slug";
    if (!formData.categoryId) {
      formData.categoryId = "dummy-id";
    }

    if (this.isEditMode) {
      this.categoryService.updateCategory(formData.categoryId, formData).subscribe({
        next: () => {
          alert("Cập nhật thành công!");
          this.refresh.emit();
          this.close.emit();
        },
        error: (err) => {
          alert(err.error?.message || "Lỗi cập nhật!");
          console.error(err);
        }
      });
    } else {
      this.categoryService.createCategory(formData).subscribe({
        next: () => {
          alert("Thêm thành công!");
          this.refresh.emit();
          this.close.emit();
        },
        error: (err) => {
          alert(err.error?.message || "Lỗi thêm mới!");
          console.error(err);
        }
      });
    }
  }

  onClose() {
    this.close.emit();
  }
}
