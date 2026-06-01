import { Component, OnInit, ChangeDetectorRef, } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { NovelServices } from '../../../services/novel/novel-services';
import { ChapterServices } from '../../../services/chapter/chapter-services';
import { Novel } from '../../../models/novel/novel.model';
import { Chapter } from '../../../models/chapter/chapter.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { E } from '@angular/cdk/keycodes';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of, catchError, map, tap } from 'rxjs';
import da from '@angular/common/locales/da';
import { HttpClient } from '@angular/common/http';
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
  chapterIdSelected!: string | null;
  chapterFileUrl: string | null = null;
  safeHtmlContent!: SafeHtml;
  constructor(private route: ActivatedRoute, private novelServices: NovelServices,
    private chapterServices: ChapterServices, @Inject(PLATFORM_ID) private platformId: Object,
    private crl: ChangeDetectorRef, private http: HttpClient,
    private sanitizer: DomSanitizer) { }
  novel!: Observable<Novel>;
  chapter!: Observable<Chapter>;
  ngOnInit() {
    this.route.paramMap.subscribe(params => {

      this.novelId = params.get('novelID');
      this.chapterId = params.get('chapterID');
      console.log('Lấy thành công Novel ID:', this.novelId);
      console.log('Lấy thành công Chapter ID:', this.chapterId);
    });
    if (this.novelId != null && isPlatformBrowser(this.platformId)) {
      this.novel = this.novelServices.getInfoNovelForReader(this.novelId);
    }
    this.loadChapter();

  }
  loadChapter() {
    if (this.novelId != null && this.chapterId != null && isPlatformBrowser(this.platformId)) {
      this.chapter = this.chapterServices.getChapterForReader(this.novelId, this.chapterId).pipe(
        tap((data: Chapter) => {
          if (data.chapterFileUrl != null) {
            this.chapterFileUrl = data.chapterFileUrl;
            this.loadContentNovel();
          }
        })
      );

    }
  }
  loadContentNovel() {
    if (this.chapterFileUrl != null) {
      const proxyUrl = `http://localhost:5283/api/Chapters/GetChapterContent?url=${encodeURIComponent(this.chapterFileUrl)}`;
      // lấy file truyện từ server xuống, ép dạng text vì angular dui dui nó bắt dạng json
      this.http.get(proxyUrl, { responseType: 'text' }).subscribe({
        next: (dataRaw: string) => {
          // Khi copy từ Word hoặc các trang web khác, khoảng trắng thường bị biến thành &nbsp; (non-breaking space)
          // Các thẻ &nbsp; này ngăn không cho trình duyệt xuống dòng, khiến chữ bị tuột ra ngoài hoặc bị cắt đôi.
          // Ta cần chuyển đổi toàn bộ &nbsp; thành khoảng trắng bình thường.
          const cleanedData = dataRaw.replace(/&nbsp;/g, ' ');

          // bỏ qua tính năng an toàn angular, k cho angular lượt bớt các thẻ html
          this.safeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(cleanedData);
          this.crl.detectChanges();
        },
        error: (err) => {
          if (isPlatformBrowser(PLATFORM_ID)) {
            console.error(err);
          }
        }
      })
    }
  }
}
