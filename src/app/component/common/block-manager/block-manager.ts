import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FollowServices } from '../../../services/follow/follow-services';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-block-manager',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './block-manager.html',
  styleUrl: './block-manager.css',
})
export class BlockManager implements OnInit {
  blockedAuthors: any[] = [];
  isLoading = false;

  constructor(
    private followServices: FollowServices,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadBlockedAuthors();
  }

  loadBlockedAuthors(): void {
    this.isLoading = true;
    this.followServices.getBlockedAuthors().subscribe({
      next: (data) => {
        this.blockedAuthors = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách tác giả bị chặn:', err);
        this.isLoading = false;
      }
    });
  }

  unblockAuthor(authorId: string): void {
    this.followServices.unBlockAuthor(authorId).subscribe({
      next: () => {
        this.snackBar.open('Đã bỏ chặn tác giả thành công', 'Đóng', {
          duration: 3000,
        });
        this.loadBlockedAuthors();
      },
      error: (err) => {
        console.error('Lỗi khi bỏ chặn tác giả:', err);
        this.snackBar.open('Không thể bỏ chặn tác giả', 'Đóng', {
          duration: 3000,
        });
      }
    });
  }
}
