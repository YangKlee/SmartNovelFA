import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormGroupDirective } from '@angular/forms';
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

  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  commentForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.maxLength(1000)])
  });

  onCancel() {
    if (this.formDirective) {
      this.formDirective.resetForm();
    } else {
      this.commentForm.reset();
    }
    this.cancel.emit();
  }

  onSubmit() {
    if (this.commentForm.valid && this.commentForm.value.content?.trim()) {
      this.submitComment.emit(this.commentForm.value.content.trim());
      if (this.formDirective) {
        this.formDirective.resetForm();
      } else {
        this.commentForm.reset();
      }
    }
  }
}
