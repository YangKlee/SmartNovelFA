import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-write-comment',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf
  ],
  templateUrl: './write-comment.html',
  styleUrl: './write-comment.css',
})
export class WriteComment {
  @Output() cancel = new EventEmitter<void>();
  @Output() submitComment = new EventEmitter<string>();

  commentForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.maxLength(1000)])
  });

  onCancel() {
    this.commentForm.reset();
    this.cancel.emit();
  }

  onSubmit() {
    if (this.commentForm.valid && this.commentForm.value.content?.trim()) {
      this.submitComment.emit(this.commentForm.value.content.trim());
      this.commentForm.reset();
    }
  }
}
