import { Component, OnInit } from '@angular/core';
import { Novel } from '../../../models/novel/novel.model';
import { NovelServices } from '../../../services/novel/novel-services';
import { NovelLangeItem } from "../../common/novel-lange-item/novel-lange-item";
import { CommonModule } from "@angular/common"
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";
@Component({
  selector: 'app-novel-manager',
  imports: [NovelLangeItem, CommonModule, RouterModule, RouterOutlet, RouterLink],
  templateUrl: './novel-manager.html',
  styleUrl: './novel-manager.css',
})
export class NovelManager implements OnInit {
  public novels$!: Observable<Novel[]>;
  constructor(private novelServices: NovelServices) { };
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.novels$ = this.novelServices.getUserNovel();
      this.novelServices.reloadNovelList.subscribe(e=>{
        if(e)
        {
             this.novels$ = this.novelServices.getUserNovel();
             this.novelServices.reloadNovelList.next(false);
        }
      })
    } else {
      this.novels$ = of([]);
    }
  }
  ngOnDestroy() {
    this.novelServices.reloadNovelList.unsubscribe();
  }
}
