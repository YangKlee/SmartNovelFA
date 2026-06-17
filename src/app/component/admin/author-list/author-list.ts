import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthorListService } from '../../../services/author/author-list';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './author-list.html',
  styleUrl: './author-list.css'
})
export class AuthorListComponent implements OnInit {

  private authorService = inject(AuthorListService);

  authors: any[] = [];

  keyword = '';

  currentPage = 1;

  totalPages = 0;

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService
      .getAuthors(this.keyword, this.currentPage)
      .subscribe({
        next: (res) => {
          this.authors = res.authors;
          this.totalPages = res.totalPages;
        }
      });
  }

  search() {
    this.currentPage = 1;
    this.loadAuthors();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadAuthors();
  }

  get pages(): number[] {
    return Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );
  }
}