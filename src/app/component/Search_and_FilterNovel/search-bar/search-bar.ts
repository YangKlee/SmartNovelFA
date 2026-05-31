import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Sửa đường dẫn lùi 3 cấp tương tự

import { NovelService } from '../../../services/novel/novel-services';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css']
})
export class SearchBarComponent {
  constructor(public novelService: NovelService) {}

  onBtnSearchClick() {
    this.novelService.searchAndFilter();
  }
}