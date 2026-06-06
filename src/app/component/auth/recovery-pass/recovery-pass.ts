import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServices } from '../../../services/auth/auth-services';

@Component({
  selector: 'app-recovery-pass',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recovery-pass.html',
  styleUrl: './recovery-pass.css',
})
export class RecoveryPass implements OnInit {
  recoveryForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authServices: AuthServices,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.recoveryForm = this.fb.group({
      txtNewPassword: ['', [Validators.required, Validators.minLength(6)]],
      txtConfirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('txtNewPassword')?.value === g.get('txtConfirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  doRecovery() {
    if (this.recoveryForm.valid) {
       const recoveryPassBody ={
        password: this.recoveryForm.get('txtConfirmPassword')?.value,
        token: this.authServices.tokenRecoveryPassword
       } 
       this.authServices.recoveryPass(recoveryPassBody).subscribe({
        next: ()=>{
          alert("Khôi phục mật khẩu thành công, bạn có thể đăng nhập bằng mật khẩu mới");
          this.router.navigate(["auth/login"]);
          this.authServices.tokenRecoveryPassword = "";
        },
        error: (err)=>{
          alert(err.error.content);
        }
       })
    } else {
      if (this.recoveryForm.errors?.['mismatch']) {
        alert("Mật khẩu xác nhận không khớp!");
      }
    }
  }
}
