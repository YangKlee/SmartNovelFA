import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServices } from '../../../services/auth/auth-services';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-fogot-pass',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './fogot-pass.html',
  styleUrl: './fogot-pass.css',
})
export class FogotPass implements OnInit {
  forgotForm!: FormGroup;
  token: string = "";

  constructor(private fb: FormBuilder,
    private authService: AuthServices,
  ) { }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required]]
    });
  }

  sendOTP() {
    if (this.forgotForm.get('email')?.valid) {
      this.authService.sendOtFogotPassword(this.forgotForm.get("email")?.value).subscribe({
        next: (res) => {
          if (res.code === 200) {
            alert("Mã OTP đã được gửi đến email của bạn");
            this.token = res.token;
          } else {
            alert(res.content);
            this.token = "";
          }
        },
        error: (err) => {
          alert(err.error.content);
          this.token = "";
        }
      })
    }
    else {
      alert("Vui lòng nhập đúng định dạng email");
      this.token = "";
    }
  }

  confirmOTP() {
    if (this.forgotForm.get('otp')?.valid) {
      // Gọi API xác nhận OTP ở đây
      this.authService.verifyOTP(this.token, "", this.forgotForm.get('otp')?.value).subscribe({
        next: (res)=>{
          alert(res.content);
        },
        error: (err)=>{
           alert(err.error.content);
        }
      })
    } else {
      alert("Vui lòng nhập mã OTP");
    }
  }
}
