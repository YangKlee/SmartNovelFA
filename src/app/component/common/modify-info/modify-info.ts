import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user/user.model';
import { UserServices } from '../../../services/user/user-services';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modify-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatSnackBarModule
  ],
  templateUrl: './modify-info.html',
  styleUrl: './modify-info.css',
})
export class ModifyInfo implements OnInit {
  modifyForm!: FormGroup;

  // Giả lập data truyền vào hoặc lấy từ service (có thể lấy từ @Input hoặc Service)
  userData!: User;

  constructor(
    private fb: FormBuilder,
    private userServices: UserServices,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserLoginInfo();
    this.modifyForm = this.fb.group({
      username: [{ value: "", disabled: true }],
      displayName: ["", [Validators.required]],
      birthday: [""],
      phone: ["", [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
    });
  }
  getUserLoginInfo() {
    this.userServices.getUserInfo().subscribe({
      next: (res) => {
        this.userData = res;
        this.modifyForm.patchValue({
          username: res.username,
          displayName: res.displayName,
          birthday: res.birthday,
          phone: res.phone
        });
        this.cdr.detectChanges();
      },
      error: () => {
        if (isPlatformBrowser(this.platformId)) {
          this.snackBar.open("Không lấy được thông tin tài khoản, phiên đăng nhập không hợp lệ", "Đóng", {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      }
    })
  }
  onSubmit() {
    if (this.modifyForm.valid) {
      const formValue = this.modifyForm.getRawValue();
      const body = {
        displayName: formValue.displayName,
        birthday: formValue.birthday,
        phone: formValue.phone
      };

      this.userServices.updateInfoAccount(body).subscribe({
        next: (res) => {
          this.snackBar.open('Cập nhật thông tin thành công!', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.userServices.notifyUserUpdated();
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err) => {
          console.error(err);

          const errorMessage = err.error?.Msg || 'Cập nhật thất bại. Vui lòng thử lại!';
          this.snackBar.open(errorMessage, 'Đóng', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.modifyForm.markAllAsTouched();
    }
  }
}
