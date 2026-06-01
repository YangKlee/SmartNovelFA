import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QuillModule } from 'ngx-quill';
import { QuillEditorComponent } from 'ngx-quill';
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
    MatIconModule,
    QuillEditorComponent,
    FormsModule
  ],
  templateUrl: './create-chapter.html',
  styleUrl: './create-chapter.css',
})
export class CreateChapter implements OnInit {
  chapterForm!: FormGroup;

  constructor(private fb: FormBuilder) { }
  public htmlContent = '<p>Xin chào! Đây là bản <strong>demo</strong> của Quill Editor.</p>';

  // Tùy chỉnh thanh công cụ (Toolbar)
  public editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // Các nút in đậm, nghiêng, gạch dưới...
      ['blockquote', 'code-block'],                     // Trích dẫn, block code
      [{ 'header': 1 }, { 'header': 2 }],               // Tiêu đề H1, H2
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],     // Danh sách
      [{ 'color': [] }, { 'background': [] }],          // Đổi màu chữ, màu nền
      [{ 'align': [] }]
    ]
  };
  ngOnInit(): void {
    this.chapterForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      chapterOrder: ['', [Validators.required, Validators.min(1)]],
      status: ['public', Validators.required],
      description: [''],
      content: ['<p>Xin chào! Đây là bản <strong>demo</strong> của Quill Editor.</p>', Validators.required]
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
