import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NovelServices } from '../../../services/novel/novel-services';

@Component({
  selector: 'app-novel-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './novel-detail.html',
  styleUrl: './novel-detail.css'
})
export class NovelDetail implements OnInit {

  novel: any = null;

  chapters: any[] = [];

  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private novelService: NovelServices
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const slug = params.get('slug');

      console.log('Slug:', slug);

      if (!slug) {
        this.isLoading = false;
        return;
      }

      this.loadNovel(slug);

    });

  }

  loadNovel(slug: string): void {

    this.novelService
      .getNovel(slug)
      .subscribe({

        next: (res: any) => {

          console.log('Novel API:', res);

          this.novel = res;

          if (res?.novelId) {

            this.loadChapters(
              res.novelId
            );

          } else {

            this.isLoading = false;

          }

        },

        error: (err) => {

          console.error(
            'Lỗi lấy truyện:',
            err
          );

          this.isLoading = false;

        }

      });

  }

  loadChapters(novelId: string): void {

    this.novelService
      .getChapters(novelId)
      .subscribe({

        next: (res: any) => {

          console.log(
            'Chapters API:',
            res
          );

          this.chapters = res || [];

          this.isLoading = false;

        },

        error: (err) => {

          console.error(
            'Lỗi lấy chương:',
            err
          );

          this.isLoading = false;

        }

      });

  }

}