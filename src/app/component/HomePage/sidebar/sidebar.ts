import { Component,OnInit ,ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Novel} from '../../../models/novel/novel.model';
import { RouterModule } from '@angular/router';
import { CardNovel } from '../card-novel/card-novel';
import { NovelServices } from '../../../services/novel/novel-services';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {

  topAuthors: any[] = [];
  newUpdates: Novel[] = [];
  recommendedNovels: Novel[] = [];

  constructor(private novelServices:NovelServices,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTopAuthors();
    this.loadNewUpdates();
    this.loadRecommendedNovelAdminRecommend();
  }

  private loadTopAuthors(): void {
    this.novelServices.getTopAuthors().subscribe({
      next: (authors) => {
        this.topAuthors = authors && authors.length > 0 ? [...authors] : [];
        this.cdr.markForCheck()
      },
      error: (err) => console.error('Lỗi tải Top Authors:', err)
    });
  }

  private loadNewUpdates(): void {
    this.novelServices.getNovelUpdate().subscribe({
      next: (novels) => {
        this.newUpdates = novels && novels.length > 0 ? [...novels] : [];
        this.cdr.markForCheck()
      },
      error: (err) => console.error('Lỗi tải New Updates:', err)
    });
  }

    private loadRecommendedNovelAdminRecommend(): void {
      this.novelServices.getNovelAdminRecommend().subscribe({
        next: (novels) => {
          this.recommendedNovels = novels && novels.length > 0 ? [...novels] : [];
          this.cdr.markForCheck()
        },
        error: (err) => console.error('Lỗi tải Recommended Novels:', err)
      });
    }
}
