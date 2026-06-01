import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ChapterManagerItem } from '../chapter-manager-item/chapter-manager-item';
import { Chapter } from '../../../models/chapter/chapter.model';
import { Novel } from '../../../models/novel/novel.model';
import { NovelServices } from '../../../services/novel/novel-services';
import { ChapterServices } from '../../../services/chapter/chapter-services';
import { ActivatedRoute, Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of,catchError } from 'rxjs';

@Component({
  selector: 'app-chapter-managerment',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ChapterManagerItem,
    RouterLink,
    RouterOutlet,
    QuillEditorComponent
],
  templateUrl: './chapter-managerment.html',
  styleUrl: './chapter-managerment.css',
})
export class ChapterManagerment implements OnInit {
  selectedNovel?: Novel;
  searchQuery: string = '';

  novels!: Observable<Novel[]>;
  selectedNovelID: string = '';

  chapters!: Observable<Chapter[]>;

  constructor(
    private novelServices: NovelServices,
    private chapterServices: ChapterServices,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    private crl: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getInfo();
  }

  onNovelChange() {
    this.router.navigate([
      '/dashboard/author/chapter-manager',
      this.selectedNovelID
    ]);
    this.getInfo();
  }

  getInfo() {
    if (isPlatformBrowser(this.platformId)) {
      this.novels = this.novelServices.getUserNovel().pipe(
        catchError(err => {
          console.error(err);
          return of([]);
        })
      );

      this.novels.subscribe(e => {
        this.selectedNovelID =
          this.route.snapshot.paramMap.get('id') ?? '';

        this.selectedNovel =
          e.find(n => n.novelId == this.selectedNovelID);

        this.chapters = this.chapterServices
          .getChapterByNovel(this.selectedNovelID)
          .pipe(
            catchError(err => {
              console.error(err);
              return of([]);
            })
          );

        this.crl.detectChanges();
      });
    } else {
      this.novels = of([]);
      this.chapters = of([]);
    }
  }

  onViewChapter(chapter: Chapter) {
    this.router.navigate(['/novel', this.selectedNovelID, 'chapter', chapter.chapterId]);
  }

  onEditChapter(chapter: Chapter) {
    console.log('Edit chapter:', chapter);
  }

  onDeleteChapter(chapter: Chapter) {
    console.log('Delete chapter:', chapter);
  }
}