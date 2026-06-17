import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserServices } from '../../../services/user/user-services';

@Component({
  selector: 'app-change-avatar',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './change-avatar.html',
  styleUrl: './change-avatar.css',
})
export class ChangeAvatar implements OnInit {
  avatarForm: FormGroup;
  currentAvatarUrl: string | null = null;
  previewAvatarUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userServices: UserServices,
    private cdr: ChangeDetectorRef
  ) {
    this.avatarForm = this.fb.group({
      avatar: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    // Lấy thông tin user từ backend để lấy avatar hiện tại
    this.userServices.getUserInfo().subscribe({
      next: (user) => {
        if (user && user.avartarUrl) {
          this.currentAvatarUrl = user.avartarUrl;
          this.cdr.detectChanges(); // Ensure view is updated
        }
      },
      error: (err) => {
        console.error('Lỗi khi lấy thông tin người dùng:', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        this.errorMessage = 'Chỉ chấp nhận file ảnh định dạng JPG, PNG, JPEG.';
        this.selectedFile = null;
        this.previewAvatarUrl = null;
        this.cdr.detectChanges();
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        this.errorMessage = 'Dung lượng ảnh tối đa là 5MB.';
        this.selectedFile = null;
        this.previewAvatarUrl = null;
        this.cdr.detectChanges();
        return;
      }

      this.errorMessage = '';
      this.selectedFile = file;

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewAvatarUrl = e.target?.result || null;
        this.cdr.detectChanges(); // Cập nhật lại giao diện ngay lập tức
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('NewImage', this.selectedFile); // Gửi đi dưới dạng IFormFile
      this.userServices.changeAvatar(formData).subscribe({
        next: () => {
          alert("Cập nhật ảnh đại diện thành công");
          this.router.navigate(["../"]);
        },
        error: (err) => {
          this.errorMessage = err.error.Msg;
          alert("Lỗi khi cập nhật ảnh đại diện");
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/account']);
  }
}
