import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-chapter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './create-chapter.html',
  styleUrl: './create-chapter.css',
})
export class CreateChapter implements OnInit {
  chapterForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.chapterForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      chapterOrder: ['', [Validators.required, Validators.min(1)]],
      status: ['public', Validators.required],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.chapterForm.valid) {
      console.log('Form data:', this.chapterForm.value);
      // Xử lý lưu chương ở đây
    } else {
      this.chapterForm.markAllAsTouched();
    }
  }
}
