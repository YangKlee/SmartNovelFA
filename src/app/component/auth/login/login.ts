import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common"
import { AuthServices } from '../../../services/auth/auth-services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;

  constructor(private frmBuilder: FormBuilder, private authServices: AuthServices, private router: Router) {
    // this.createForm();
  }
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.frmBuilder.group({
      txtUsername: [null, [Validators.required]],
      txtPassword: [null, [Validators.required]]
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  doLogin() {
    if (this.loginForm.valid) {
      this.authServices.login(this.loginForm.get("txtUsername")?.value, this.loginForm.get("txtPassword")?.value).subscribe({
        next: (res) => {
          localStorage.setItem("token", res.token);
          //this.authServices.saveCacheUserLogined();
          this.router.navigate(['/']);

        },
        error: (err) => {
          if (err.status === 401) {
            alert("Sai tài khoản hoặc mật khẩu");
          }
        }
      })
    }
  }

}
