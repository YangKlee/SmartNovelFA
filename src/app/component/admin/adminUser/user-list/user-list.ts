import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../../services/admin-service/admin-service';
import { User } from '../../../../models/user/user.model';
import { ReactiveFormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css']
})
export class UserListComponent {
  @Input() users: User[] = [];

  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<{ uid: string, name: string }>();

  onEdit(user: User): void {
    this.edit.emit(user);
  }
  onDelete(uid: string, name: string): void {
    this.delete.emit({ uid, name });
  }
}
