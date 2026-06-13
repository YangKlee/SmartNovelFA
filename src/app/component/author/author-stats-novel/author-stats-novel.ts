import { Component, OnInit, ElementRef, ViewChild, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DashboardServices } from '../../../services/dashboard-services/dashboard-services';
import { DashboardAuthorNovelInfo } from '../../../menu-dashboard/dashboard-author-novel-info';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-author-stats-novel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './author-stats-novel.html',
  styleUrl: './author-stats-novel.css',
})
export class AuthorStatsNovel implements OnInit {
  @ViewChild('novelChart', { static: false }) novelChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chapterChart', { static: false }) chapterChartRef!: ElementRef<HTMLCanvasElement>;

  novelInfo: DashboardAuthorNovelInfo | null = null;
  novelChart: Chart | null = null;
  chapterChart: Chart | null = null;

  constructor(
    private dashboardService: DashboardServices,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.dashboardService.getAllAuthorNovelInfo().subscribe({
        next: (res) => {
          console.log('>>> DATA TỪ API:', res);
          this.novelInfo = res;
          this.cdr.detectChanges();
          setTimeout(() => {
            this.createCharts();
          });
        },
        error: (err) => {
          console.error('Error fetching novel stats', err);
        }
      });
    }
  }

  createCharts() {
    if (this.novelInfo) {
      if (this.novelChartRef) {
        this.novelChart = new Chart(this.novelChartRef.nativeElement, this.getChartConfig(
          [this.novelInfo.publicNovels || 0, this.novelInfo.removedNovels || 0, this.novelInfo.draftNovels || 0]
        ));
      }

      if (this.chapterChartRef) {
        this.chapterChart = new Chart(this.chapterChartRef.nativeElement, this.getChartConfig(
          [this.novelInfo.publicChapters || 0, this.novelInfo.removedChapters || 0, this.novelInfo.draftChapters || 0]
        ));
      }
    }
  }

  getChartConfig(data: number[]): ChartConfiguration {
    return {
      type: 'pie',
      data: {
        labels: ['Đã đăng', 'Bị gỡ', 'Nháp'],
        datasets: [{
          data: data,
          backgroundColor: [
            '#00FF40', // Green
            '#FF0000', // Red
            '#D3D3D3'  // Gray
          ],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true
          }
        }
      }
    };
  }
}
