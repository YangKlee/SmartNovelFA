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
}