import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { NovelServices } from '../../../services/novel/novel-services';
import { ChapterServices } from '../../../services/chapter/chapter-services';
@Component({
  selector: 'app-read-novel',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDividerModule, MatTooltipModule],
  templateUrl: './read-novel.html',
  styleUrl: './read-novel.css',
})
export class ReadNovel implements OnInit {
  novelId!: string | null;
  chapterId!: string | null;
  constructor(private route: ActivatedRoute, private novelServices: NovelServices, private chapterServices: ChapterServices) {}
  ngOnInit()
  {
    this.novelId = this.route.snapshot.paramMap.get('novelId');
    this.chapterId = this.route.snapshot.paramMap.get('chapterId');
  }
}
