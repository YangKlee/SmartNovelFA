import { Component,Input ,ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Novel } from '../../../models/novel/novel.model';
import { NovelServices } from '../../../services/novel/novel-services';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule, } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressBarModule, MatIconModule,MatButtonModule],
  templateUrl: './hero-banner.html',
  styleUrl: './hero-banner.css',
})

export class HeroBanner {
  @Input() heroNovel: Novel | null = null;

}
