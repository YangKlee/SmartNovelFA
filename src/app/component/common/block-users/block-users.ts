import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockServices } from '../../../services/block/block-services';

export interface UserSimpleDto {
  uid: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
}
@Component({
  selector: 'app-block-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block-users.html',
  styleUrl: './block-users.css',
})
export class BlockUsers implements OnInit {
  blockedUsers: UserSimpleDto[] = [];

  loading = false;
  error = '';

  unblockingUid: string | null = null;

  constructor(
    private userBlockService: BlockServices,
    private cdr: ChangeDetectorRef
  ) { }
    
  ngOnInit(): void {
    this.loadBlockedUsers();
  }

  loadBlockedUsers(): void {
    this.loading = true;
    this.error = '';

    this.userBlockService.getBlockedUsers().subscribe({
      next: (res) => {
        this.blockedUsers = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Không tải được danh sách chặn';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  unBlock(uid: string): void {
    if (!confirm('Bạn muốn bỏ chặn người dùng này?')) {
      return;
    }

    this.unblockingUid = uid;

    this.userBlockService.unblock(uid).subscribe({
      next: () => {
        this.blockedUsers =
          this.blockedUsers.filter(x => x.uid !== uid);
        this.unblockingUid = null;
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Bỏ chặn thất bại');
        this.unblockingUid = null;
        this.cdr.detectChanges();
      }
    });
  }
}