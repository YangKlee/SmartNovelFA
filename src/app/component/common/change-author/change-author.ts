import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserServices } from '../../../services/user/user-services';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-author',
  imports: [CommonModule, MatButtonModule, MatCheckboxModule, MatIconModule, FormsModule, RouterModule, MatSnackBarModule],
  templateUrl: './change-author.html',
  styleUrl: './change-author.css',
})
export class ChangeAuthor {
  isAgreed: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private userServices: UserServices,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onSubmit(): void {
    if (!this.isAgreed) return;

    this.isSubmitting = true;
    this.userServices.changeAuthor().subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.snackBar.open('Đăng ký làm tác giả thành công!', 'Đóng', { 
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.userServices.notifyUserUpdated(); // Nếu có
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isSubmitting = false;
        const msg = err.error?.Msg || 'Có lỗi xảy ra, vui lòng thử lại sau.';
        this.snackBar.open(msg, 'Đóng', { 
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
