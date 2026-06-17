import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../services/user/profile-service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../../models/user/user.model';
import { UserServices } from '../../../services/user/user-services';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardNovel } from '../../HomePage/card-novel/card-novel';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule, CardNovel],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
  user: any;
  loading = true;
  uid!: string;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid')!;
    this.loadProfile();
  }

  getRoleName(roleId: any): string {
    if (!roleId) return 'Độc giả';
    const id = String(roleId);
    if (id === '1') return 'Admin';
    if (id === '3') return 'Tác giả';
    if (id === '4') return 'Độc giả';
    return roleId;
  }

  loadProfile() {
    this.loading = true;

    this.profileService.getProfile(this.uid).subscribe({
      next: (res) => {
        this.user = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  follow() {
    this.profileService.follow(this.uid).subscribe(() => this.loadProfile());
  }

  unfollow() {
    this.profileService.unfollow(this.uid).subscribe(() => this.loadProfile());
  }

  block() {
    this.profileService.block(this.uid).subscribe(() => this.loadProfile());
  }

  unblock() {
    this.profileService.unblock(this.uid).subscribe(() => this.loadProfile());
  }

}
