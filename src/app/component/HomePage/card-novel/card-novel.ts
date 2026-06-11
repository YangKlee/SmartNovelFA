import { Component, Input } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Novel } from '../../../models/novel/novel.model'; // Đường dẫn model của bạn

@Component({
  selector: 'app-card-novel',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatRippleModule, 
    MatIconModule, 
    DecimalPipe
  ],
  templateUrl: './card-novel.html',
  styleUrl: './card-novel.css'
})
export class CardNovel {
@Input() novel!: Novel;



formatShortNumber(num: number | undefined | null): string {
  if (!num) return '0';
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  
  return num.toString();
}
}