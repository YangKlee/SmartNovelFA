import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthServices } from '../../../services/auth/auth-services';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private frmBuilder: FormBuilder, private authServices: AuthServices, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.frmBuilder.group({
      txtUsername: ['', [Validators.required]],
      txtEmail: ['', [Validators.required, Validators.email]],
      txtDisplayName: ['', [Validators.required]],
      txtPhone: ['', [Validators.required]],
      txtPassword: ['', [Validators.required, Validators.minLength(6)]],
      txtConfirmPassword: ['', [Validators.required]]
    }, );
  }


  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  doRegister() {
    if (this.registerForm.valid 
      && this.registerForm.get("txtPassword")?.value == this.registerForm.get("txtConfirmPassword")?.value) {
      const formValues = this.registerForm.value;
      const registerData = {
        Username: formValues.txtUsername,
        Email: formValues.txtEmail,
        DisplayName: formValues.txtDisplayName,
        Phone: formValues.txtPhone,
        Password: formValues.txtPassword
      };
      this.authServices.regist(registerData).subscribe({
        next: (res)=>{
          alert("Đăng ký thành công!");
          this.router.navigate(["/auth/login"]);
        },
        error: (err)=>{
          alert(err.error.content);
        }
      })


    }
  }
}
