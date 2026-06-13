import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowedNovel, FollowService } from '../../../services/follow/follow-services';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-followed-novels',
  standalone: true,
  imports: [
    CommonModule,  
    RouterModule      
  ],
  templateUrl: './followed-novels.html',
  styleUrls: ['./followed-novels.css']
})
export class FollowedNovelsComponent implements OnInit {

  novels: FollowedNovel[] = [];
  loading = false;
  error = '';

  loadingUnfollowId: string | null = null;

  constructor(private followService: FollowService) {}

  ngOnInit(): void {
    this.loadNovels();
  }

  loadNovels() {
    this.loading = true;
    this.error = '';

    this.followService.getFollowedNovels().subscribe({
      next: (res) => {
        this.novels = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Không tải được danh sách truyện đã theo dõi';
        this.loading = false;
      }
    });
  }

  unfollow(novelId: string) {
    if (!confirm('Bạn có chắc muốn bỏ theo dõi truyện này?')) return;

    this.loadingUnfollowId = novelId;

    this.followService.unfollowNovel(novelId).subscribe({
      next: () => {
        this.novels = this.novels.filter(x => x.novelId !== novelId);
        this.loadingUnfollowId = null;
      },
      error: () => {
        alert('Unfollow thất bại');
        this.loadingUnfollowId = null;
      }
    });
  }
}