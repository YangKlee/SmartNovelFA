import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardNovel } from '../card-novel/card-novel';
import { Novel } from '../../../models/novel/novel.model';
import { Sidebar } from '../sidebar/sidebar';
import { NovelServices } from '../../../services/novel/novel-services';
import { SliderNovel } from '../slider-novel/slider-novel';
import { HeroBanner } from '../hero-banner/hero-banner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, CardNovel, Sidebar, SliderNovel, HeroBanner, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  NovelRecomend: Novel[] = [];
  NovelHot: Novel[] = [];
  NovelUpdate: Novel[] = [];
  heroNovel: Novel | null = null;

  constructor(private novelServices: NovelServices, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadNovelHot(); 
    this.loadNovelRecommend();
    this.loadNovelUpdate();
    this.loadHeroNovel();
  }

  private loadHeroNovel(): void {
    this.novelServices.getNovelHero().subscribe({
      next: (novel) => {
        this.heroNovel = novel || null;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Lỗi tải Hero Novel:', err)
    });
  }

  private loadNovelHot(): void {
    this.novelServices.getNovelHot().subscribe({
      next: (novels) => {
        this.NovelHot = novels && novels.length > 0 ? [...novels] : [];
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Lỗi tải Hot:', err)
    });
  }

  private loadNovelRecommend(): void {
    this.novelServices.getNovelRecommend().subscribe({
      next: (novels) => {
        this.NovelRecomend = novels && novels.length > 0 ? [...novels] : [];
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Lỗi tải Recommend:', err)
    });
  }

  private loadNovelUpdate(): void {
    this.novelServices.getNovelUpdate().subscribe({
      next: (novels) => {
        this.NovelUpdate = novels && novels.length > 0 ? [...novels] : [];
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Lỗi tải Update:', err)
    });
  }
}
