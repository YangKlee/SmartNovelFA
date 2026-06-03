import { Component, OnInit, OnDestroy } from '@angular/core';
import { Novel } from '../../../models/novel/novel.model';
import { NovelServices } from '../../../services/novel/novel-services';
import { NovelLangeItem } from "../../common/novel-lange-item/novel-lange-item";
import { CommonModule } from "@angular/common"
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, Subscription } from 'rxjs';
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { ConfimDeleteRepype } from '../../common/confim-delete-repype/confim-delete-repype';
@Component({
  selector: 'app-novel-manager',
  imports: [NovelLangeItem, CommonModule, RouterModule, RouterOutlet, RouterLink, ConfimDeleteRepype],
  templateUrl: './novel-manager.html',
  styleUrl: './novel-manager.css',
})
export class NovelManager implements OnInit, OnDestroy {
  public novels$!: Observable<Novel[]>;
  private reloadSub!: Subscription;
  constructor(private novelServices: NovelServices) { };
  private platformId = inject(PLATFORM_ID);
  private isShowConfimDelete: boolean= false;
  private contentDelete: string  = "Xác nhận xóa truyện chứ, mọi dữ liệu của truyện sẽ biến mất vĩnh viễn";
  private confimName:string  = "";
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.novels$ = this.novelServices.getUserNovel();
      this.reloadSub = this.novelServices.reloadNovelList.subscribe(e => {
        if (e) {
          this.novels$ = this.novelServices.getUserNovel();
          this.novelServices.reloadNovelList.next(false);
        }
      })
    } else {
      this.novels$ = of([]);
    }
  }
  ngOnDestroy() {
    if (this.reloadSub) {
      this.reloadSub.unsubscribe();
    }
  }
  onDeleteNovel(novel: Novel){
    this.isShowConfimDelete = true;

  }
}
