import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { QuillModule } from 'ngx-quill';
import { QuillEditorComponent } from 'ngx-quill';
import { ChapterServices } from '../../../services/chapter/chapter-services';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviewChapter } from '../preview-chapter/preview-chapter';

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
    MatCheckboxModule,
    QuillEditorComponent,
    FormsModule,
    PreviewChapter
  ],
  templateUrl: './create-chapter.html',
  styleUrl: './create-chapter.css',
})
export class CreateChapter implements OnInit {
  chapterForm!: FormGroup;
  novelId: string = '';

  constructor(
    private fb: FormBuilder,
    private chapterServices: ChapterServices,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  //public htmlContent = '<p>Xin chào! Đây là bản <strong>demo</strong> của Quill Editor.</p>';
  public isDisplayPreviewForm = false;
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
    this.novelId = this.route.parent?.snapshot.paramMap.get('id') ?? '';

    this.chapterForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      chapterOrder: ['', [Validators.required, Validators.min(1)]],
      status: ['public', Validators.required],
      description: [''],
      allowComment: [true],
      content: ['<p>Xin chào! Đây là bản <strong>demo</strong> của Quill Editor.</p>', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.chapterForm.valid) {
      if (!this.novelId) {
        alert("Lỗi: Không xác định được Novel ID");
        return;
      }

      const formValue = this.chapterForm.value;
      const payload = {
        title: formValue.title,
        oder: formValue.chapterOrder,
        decrip: formValue.description,
        status: formValue.status,
        allowComment: formValue.allowComment,
        content: formValue.content
      };

      this.chapterServices.createChapter(this.novelId, payload).subscribe({
        next: (res) => {
          console.log('Tạo chương thành công:', res);

          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err) => {
          console.error('Lỗi khi tạo chương:', err);
          alert('Có lỗi xảy ra khi tạo chương!');
        }
      });
    } else {
      this.chapterForm.markAllAsTouched();
    }
  }

  closePopup(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  toggleDisplatForm() {
    if(this.isDisplayPreviewForm)
      this.isDisplayPreviewForm = false;
    else
    {
      this.isDisplayPreviewForm = true;
    }
  }
}
