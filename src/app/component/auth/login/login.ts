import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common"
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!:FormGroup;
   constructor(private frmBuilder : FormBuilder)
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

  }

}
