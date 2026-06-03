import { Component, OnInit, OnDestroy } from '@angular/core';
import { Novel } from '../../../models/novel/novel.model';
import { NovelServices } from '../../../services/novel/novel-services';
import { NovelLangeItem } from "../../common/novel-lange-item/novel-lange-item";
import { CommonModule } from "@angular/common"
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
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
  constructor(private novelServices: NovelServices) { };
  private platformId = inject(PLATFORM_ID);
  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.novels$ = this.novelServices.reloadNovelList.pipe(
        switchMap(() => this.novelServices.getUserNovel())
      );
    } else {
      this.novels$ = of([]);
    }
  }
  
  ngOnDestroy() {
    // No longer need to manually unsubscribe from reloadSub
  }

  onDeleteNovel(novel: Novel){
    if(novel != null && novel.novelId != null)
    {
      this.novelServices.deleteNovel(novel.novelId).subscribe({
        next: ()=>{
          alert("Xóa truyện thành công!");
          this.novelServices.reloadNovelList.next(true); // Triggers switchMap to fetch novels again
        },
        error: (err)=>{
          alert("Xóa truyện không thành công");
          console.error(err.error?.Msg || err);
        }
      })
    }
  }
}

