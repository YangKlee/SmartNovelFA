import { Component, OnInit, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {
  protected readonly title = signal('SmartNovelFA');
  private platformId = inject(PLATFORM_ID);


}
