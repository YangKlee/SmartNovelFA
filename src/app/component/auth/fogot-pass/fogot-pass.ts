import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fogot-pass',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './fogot-pass.html',
  styleUrl: './fogot-pass.css',
})
export class FogotPass implements OnInit {
  forgotForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      console.log('Phục hồi mật khẩu cho:', this.forgotForm.value.email);
      // Gọi API reset password ở đây
    }
  }
}
