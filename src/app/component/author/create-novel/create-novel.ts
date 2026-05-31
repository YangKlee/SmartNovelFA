import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NovelServices } from '../../../services/novel/novel-services';
import { Router } from '@angular/router';
import { Category } from '../../../models/category/category.model';
import { CategoryServices } from '../../../services/category/category-services';

@Component({
  selector: 'app-create-novel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-novel.html',
  styleUrl: './create-novel.css',
})
export class CreateNovel {
  novelForm: FormGroup;
  coverPreview: string | null = null;
  bannerPreview: string | null = null;
  coverFile: File | null = null;
  bannerFile: File | null = null;
  genreList!: Category[];

  constructor(private fb: FormBuilder, private novelServices: NovelServices,
     private categoryServices:CategoryServices, private router: Router, private cdr: ChangeDetectorRef) {
    
    this.categoryServices.getAllActiveCategory().subscribe({
      next: (res)=>{
        this.genreList = res;

      },
      error: (res)=>{
        console.error(res);
      }
    })
    this.novelForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      ageRating: [6, [Validators.required]],
      status: ['Public', [Validators.required]],
      genres: [[]]
    });
  }

  // --- XỬ LÝ DANH SÁCH THỂ LOẠI (GENRES) ---

  // Getter lấy mảng ID thể loại hiện tại ngắn gọn hơn
  get selectedGenres(): string[] {
    return this.novelForm.get('genres')?.value || [];
  }

  // Lắng nghe sự kiện tick/bỏ tick checkbox
  onGenreChange(event: any, genreId: string) {
    const isChecked = event.target.checked;
    
    if (isChecked) {
      // Tick chọn -> Thêm ID vào mảng
      const updatedGenres = [...this.selectedGenres, genreId];
      this.novelForm.get('genres')?.setValue(updatedGenres);
    } else {
      // Bỏ tick -> Xóa ID khỏi mảng
      const updatedGenres = this.selectedGenres.filter(id => id !== genreId);
      this.novelForm.get('genres')?.setValue(updatedGenres);
    }
  }

  // Kiểm tra checkbox nào đang được tick
  isGenreChecked(genreId: string): boolean {
    return this.selectedGenres.includes(genreId);
  }

  onCoverSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.coverFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverPreview = e.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  onBannerSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.bannerFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.bannerPreview = e.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.novelForm.valid) {
        const formData = new FormData();
        formData.append('title', this.novelForm.get('title')?.value);
      formData.append('description', this.novelForm.get('description')?.value);
      formData.append('ageRating', this.novelForm.get('ageRating')?.value);
      formData.append('status', this.novelForm.get('status')?.value);
      
      // Đính kèm danh sách thể loại vào FormData để gửi lên Backend
      const genresToSubmit = this.selectedGenres;
      for (const genreId of genresToSubmit) {
        formData.append('genres', genreId);
      }

      if (this.coverFile) {
        formData.append('coverImage', this.coverFile, this.coverFile.name);

      }
      if (this.bannerFile) {
        formData.append('bannerImage', this.bannerFile, this.bannerFile.name);
      }
      this.novelServices.createNovel(formData).subscribe({
        next: (res)=>{
          alert("Thêm thành công!");
           this.novelServices.reloadNovelList.next(true);
          this.router.navigate(['dashboard/author/novel-manager']);
        },
        error: (err)=>{
          alert("Có lỗi xảy ra");
          console.error(err.error.msg);
        }
      })
    } else {
      this.novelForm.markAllAsTouched();
    }
  }
}
