import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-control-helper',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './page-control-helper.html',
  styleUrl: './page-control-helper.css',
})
export class PageControlHelper {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  goHome() {
    this.router.navigate(['/']);
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  scrollToBottom() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }
}
