import { Component, OnInit } from '@angular/core';
import { Novel } from '../../../models/novel/novel.model';
import { NovelServices } from '../../../services/novel/novel-services';
import { NovelLangeItem } from "../../common/novel-lange-item/novel-lange-item";
import { CommonModule} from "@angular/common"
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-novel-manager',
  imports: [NovelLangeItem, CommonModule],
  templateUrl: './novel-manager.html',
  styleUrl: './novel-manager.css',
})
export class NovelManager implements OnInit {
  public novels$!: Observable<Novel[]>; 
  constructor(private novelServices: NovelServices){};
  private platformId = inject(PLATFORM_ID);
  ngOnInit()
  {
      this.novels$ = this.novelServices.getUserNovel();
  }
  ngOnDestroy()
  {

  }
}
