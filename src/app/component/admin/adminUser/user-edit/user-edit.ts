import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../../services/admin-service/admin-service';
import { User } from '../../../../models/user/user.model';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.html',
  styleUrls: ['./user-edit.css']
})
export class UserEditComponent implements OnInit {
  // Dùng dấu "?" vì khi bấm "Thêm mới", biến này sẽ là undefined
  @Input() userData?: User; 
  @Output() close = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();

  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    // 1. Khởi tạo form với các Validator cơ bản
    this.userForm = this.fb.group({
      uid: [''],
      username: ['', Validators.required], 
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''], 
      roleId: ['3', Validators.required], 
      status: ['Active', Validators.required],
      creatorPoint: []
    });

    if (this.userData && this.userData.uid) { 
      this.userForm.patchValue(this.userData);
      this.userForm.get('username')?.disable();
    } else {
      this.userForm.get('password')?.setValidators([Validators.required]);
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched(); // Kích hoạt hiển thị viền đỏ báo lỗi trên HTML
      alert("Vui lòng điền đầy đủ các trường bắt buộc!");
      return;
    }

    const payload = this.userForm.getRawValue();
    if (!payload.password || payload.password.trim() === '') {
      payload.password = null; 
    }

    // Phân luồng gọi API
    if (payload.uid) {
      this.adminService.updateUser(payload.uid, payload).subscribe({
        next: () => { 
          alert("Sửa tài khoản thành công!"); 
          this.refresh.emit(); 
          this.close.emit(); 
        },
        error: (err) =>{const msg = err.error?.message || "Lỗi hệ thống!";
          alert("Sửa thất bại: " + msg);
        }
      }    );    } 
    else {
      
      this.adminService.createUser(payload).subscribe({
        next: () => { 
          alert("Thêm mới thành công!"); 
          this.refresh.emit(); 
          this.close.emit(); 
        },
        error: (err) => { const msg = err.error?.message || "Lỗi hệ thống!";
          alert("Thêm thất bại: " + msg);
        }
      });
    }
  }
}