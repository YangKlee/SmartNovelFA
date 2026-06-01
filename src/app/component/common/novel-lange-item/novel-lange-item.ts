import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Novel } from '../../../models/novel/novel.model';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-novel-lange-item',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './novel-lange-item.html',
  styleUrl: './novel-lange-item.css',
})
export class NovelLangeItem {
  @Input() novel!: Novel;
}
