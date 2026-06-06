import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardNovel } from '../card-novel/card-novel';
import { Novel } from '../../../models/novel/novel.model';
import{MatIconModule, } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-slider-novel',
  standalone: true,
  imports: [CommonModule, RouterModule, CardNovel, MatIconModule, MatButtonModule],
  templateUrl: './slider-novel.html',
  styleUrl: './slider-novel.css',
})
export class SliderNovel implements OnChanges {
  @Input() title: string = '';
  @Input() novels: Novel[] = [];

  public currentIndex: number = 0;   
  public readonly pageSize: number = 5; 

  ngOnChanges(changes: SimpleChanges): void {
    // Khi có dữ liệu truyện mới thì tự động về trang 1
    if (changes['novels']) {
      this.currentIndex = 0; 
    }
  }

  get visibleNovels(): Novel[] {
    if (!this.novels) return [];
    return this.novels.slice(this.currentIndex, this.currentIndex + this.pageSize);
  }

  get canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    if (!this.novels) return false;
    return this.currentIndex + this.pageSize < this.novels.length;
  }

  public next(): void {
    if (this.canGoNext) this.currentIndex += this.pageSize;
  }

  public previous(): void {
    if (this.canGoPrevious) this.currentIndex -= this.pageSize;
  }
}