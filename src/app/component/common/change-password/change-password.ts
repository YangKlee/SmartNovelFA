import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { UserServices } from '../../../services/user/user-services';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword implements OnInit {
  passwordForm!: FormGroup;

  constructor(private fb: FormBuilder, private userServices: UserServices, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const formValue = this.passwordForm.getRawValue();

      this.userServices.changePassword(formValue.oldPassword, formValue.newPassword).subscribe({
        next: (res) => {
          alert('Đổi mật khẩu thành công!');
          this.userServices.notifyUserUpdated();
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err) => {
          console.error(err);
          const errorMessage = err.error?.msg || 'Đổi mật khẩu thất bại. Vui lòng thử lại!';
          alert(errorMessage);
        }
      });
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
}
