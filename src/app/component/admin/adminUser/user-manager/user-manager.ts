import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminService } from '../../../../services/admin-service/admin-service';
import { User } from '../../../../models/user/user.model';
import { UserListComponent } from '../user-list/user-list';
import { UserEditComponent } from '../user-edit/user-edit';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-manager',
  standalone: true,
  // 2. Nhớ khai báo UserEditComponent vào mảng imports
  imports: [CommonModule, ReactiveFormsModule, FormsModule, UserListComponent, UserEditComponent],
  templateUrl: './user-manager.html',
  styleUrls: ['./user-manager.css']
})
export class UserManagerComponent implements OnInit {
  users: User[] = [];
  page: number = 1;
  totalPages: number = 1;
  totalUsers: number = 0; 

  keyword: string = '';
  role: string = '';
  status: string = '';

  showForm: boolean = false;
  selectedUser?: User;

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(resetPage: boolean = false): void { 
    if (resetPage) this.page = 1;
    
    this.adminService.getUsers(this.keyword, this.role, this.status, this.page)
      .subscribe({
        next: (response: any) => {
          this.users = response.data || [];
          
          this.totalPages = response.totalPages || 1;
          this.totalUsers = response.totalUsers || 0;

          this.cdr.markForCheck(); 
        },
        error: () => {
          alert('Lỗi tải danh sách người dùng!');
        }
      });
  }

  openCreate(): void {
    this.selectedUser = undefined;
    this.showForm = true;
  }

  openEdit(user: User): void {
    this.selectedUser = user;
    this.showForm = true;
  }

  deleteUser(uid: string, name: string): void {
    if (confirm(`Bạn có chắc muốn xóa tài khoản ${name}?`)) {
      this.adminService.deleteUser(uid).subscribe({
        next: () => {
          alert('Xóa thành công!');
          this.loadUsers(true); // Reset về trang 1 sau khi xóa
        },
        error: () => alert('Lỗi khi xóa tài khoản!')
      });
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) { 
      this.page++;
      this.loadUsers();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadUsers();
    }
  }
}