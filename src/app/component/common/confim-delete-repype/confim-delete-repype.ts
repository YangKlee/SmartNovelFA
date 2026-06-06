import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confim-delete-repype',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatButtonModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatIconModule
  ],
  templateUrl: './confim-delete-repype.html',
  styleUrl: './confim-delete-repype.css',
})
export class ConfimDeleteRepype {
  @Input() content!: string;
  @Input() contentValidate!: string;
  @Output() isValidate = new EventEmitter<boolean>();
  
  inputValue: string = '';

  onConfirm() {
    if (this.inputValue === this.contentValidate) {
      this.isValidate.emit(true);
    }
  }

  onCancel() {
    this.isValidate.emit(false);
  }
}
