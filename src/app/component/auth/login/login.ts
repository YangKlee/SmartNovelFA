import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common"
import { AuthServices } from '../../../services/auth/auth-services';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!:FormGroup;
   constructor(private frmBuilder : FormBuilder,private authServices: AuthServices)
  {
    // this.createForm();
  }
  ngOnInit()
  {
    this.createForm();
  }
  createForm()
  {
    this.loginForm = this.frmBuilder.group({
      txtUsername: [null, [Validators.required]],
      txtPassword: [null, [Validators.required]]
    })
  }
  doLogin()
  {
    if(this.loginForm.valid)
    {
      this.authServices.login(this.loginForm.get("txtUsername")?.value, this.loginForm.get("txtPassword")?.value).subscribe({
        next:(res) =>{
          localStorage.setItem("token", res.token);
          localStorage.setItem("username", res.username);
        },
        error:(err)=>{
          if(err.status === 401)
          {
            alert("Sai tài khoản hoặc mật khẩu");
          }
        }
      })
    }
  }

}
