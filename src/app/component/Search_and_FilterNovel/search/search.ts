import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class SearchComponent {

  showSearch = false;
  searchKeyword = '';
  novels: any[] = [];

  @Output() close = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  toggleSearch() {
    this.showSearch = !this.showSearch;

    if (!this.showSearch) {
      this.clearSearch();
      this.close.emit();
    }
  }

  searchNovel() {
    if (!this.searchKeyword?.trim()) {
      this.novels = [];
      return;
    }

    this.http.get<any[]>(
      `https://localhost:7134/api/Novels/filter?search=${encodeURIComponent(this.searchKeyword.trim())}`
    ).subscribe({
      next: (res) => this.novels = res,
      error: () => this.novels = []
    });
  }

  clearSearch() {
    this.searchKeyword = '';
    this.novels = [];
  }
}