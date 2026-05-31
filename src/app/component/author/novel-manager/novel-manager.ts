import { Component, OnInit } from '@angular/core';
import { Novel } from '../../../models/novel/novel.model';
import { NovelServices } from '../../../services/novel/novel-services';
import { NovelLangeItem } from "../../common/novel-lange-item/novel-lange-item";
import { CommonModule} from "@angular/common"
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-novel-manager',
  imports: [NovelLangeItem, CommonModule],
  templateUrl: './novel-manager.html',
  styleUrl: './novel-manager.css',
})
export class NovelManager implements OnInit {
  public novels!: Novel[]
  constructor(private novelServices: NovelServices){};
  private platformId = inject(PLATFORM_ID);
  ngOnInit()
  {
    this.novelServices.getUserNovel().subscribe({
      next: (res) => {
        this.novels = res;
      },
      error: (err) => {
        if (isPlatformBrowser(this.platformId)) {
          alert('Lấy truyện không thành công!');
        }
        //console.error(err.error.Msg);
      }
    })
  }
  ngOnDestroy()
  {

  }
}
