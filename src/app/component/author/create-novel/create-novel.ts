import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-novel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-novel.html',
  styleUrl: './create-novel.css',
})
export class CreateNovel {
  novelForm: FormGroup;
  coverPreview: string | null = null;
  bannerPreview: string | null = null;

  constructor(private fb: FormBuilder) {
    this.novelForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      ageRating: [6, [Validators.required]],
      status: ['Public', [Validators.required]]
    });
  }

  onCoverSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onBannerSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.bannerPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.novelForm.valid) {
      console.log('Form Submitted', this.novelForm.value);
      // Process submission
    } else {
      this.novelForm.markAllAsTouched();
    }
  }
}
