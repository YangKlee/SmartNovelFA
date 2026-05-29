import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-modify-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './modify-info.html',
  styleUrl: './modify-info.css',
})
export class ModifyInfo implements OnInit {
  modifyForm!: FormGroup;

  // Giả lập data truyền vào hoặc lấy từ service (có thể lấy từ @Input hoặc Service)
  userData: any = {
    uid: 'UID-12345',
    username: 'nguyenvana',
    displayName: 'Nguyễn Văn A',
    email: 'nva@gmail.com',
    phone: '0987654321'
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.modifyForm = this.fb.group({
      uid: [{ value: this.userData.uid, disabled: true }],
      username: [{ value: this.userData.username, disabled: true }],
      displayName: [this.userData.displayName, [Validators.required]],
      email: [this.userData.email, [Validators.required, Validators.email]],
      phone: [this.userData.phone, [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
    });
  }

  onSubmit() {
    if (this.modifyForm.valid) {
      console.log('Form Data:', this.modifyForm.getRawValue());
      // Gọi service cập nhật thông tin tại đây
      alert('Cập nhật thông tin thành công!');
    } else {
      this.modifyForm.markAllAsTouched();
    }
  }
}
