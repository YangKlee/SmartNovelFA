import { Component, OnInit, ElementRef, ViewChild, Inject, PLATFORM_ID, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DashboardServices } from '../../../services/dashboard-services/dashboard-services';
import { DashboardActivityStatsInfo } from '../../../menu-dashboard/dashboard-activity-stats-info';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-activity-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-stats.html',
  styleUrl: './activity-stats.css',
})
export class ActivityStats implements OnInit, OnDestroy {
  @ViewChild('activityChart', { static: false }) activityChartRef!: ElementRef<HTMLCanvasElement>;

  activityData: DashboardActivityStatsInfo[] = [];
  activityChart: Chart | null = null;

  constructor(
    private dashboardService: DashboardServices,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.dashboardService.getActivityStats().subscribe({
        next: (res) => {
          this.activityData = res && res.length > 0 ? res : this.getDemoData();
          this.cdr.detectChanges();
          setTimeout(() => {
            this.createChart();
          });
        },
        error: (err) => {
          console.error('Error fetching activity stats:', err);
          this.activityData = this.getDemoData();
          this.cdr.detectChanges();
          setTimeout(() => {
            this.createChart();
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.activityChart) this.activityChart.destroy();
  }

  getDemoData(): DashboardActivityStatsInfo[] {
    const today = new Date();
    const demo: DashboardActivityStatsInfo[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
      demo.push({
        date: dateStr,
        chaptersAdded: Math.floor(Math.random() * 25) + 5,
        novelsAdded: Math.floor(Math.random() * 6) + 1
      });
    }
    return demo;
  }

  createChart() {
    if (this.activityData.length === 0 || !this.activityChartRef) return;

    if (this.activityChart) this.activityChart.destroy();

    const labels = this.activityData.map(item => item.date || '');
    const chapters = this.activityData.map(item => item.chaptersAdded || 0);
    const novels = this.activityData.map(item => item.novelsAdded || 0);

    const ctx = this.activityChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Chương mới',
            data: chapters,
            backgroundColor: '#007BFF',
            borderColor: '#007BFF',
            borderWidth: 1,
            barPercentage: 0.6,
            categoryPercentage: 0.5
          },
          {
            label: 'Truyện mới',
            data: novels,
            backgroundColor: '#28A745',
            borderColor: '#28A745',
            borderWidth: 1,
            barPercentage: 0.6,
            categoryPercentage: 0.5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12,
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                family: 'Inter',
                size: 13,
                weight: 'bold'
              },
              padding: 20
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleFont: { size: 14, weight: 'bold', family: 'Inter' },
            bodyFont: { size: 13, family: 'Inter' },
            padding: 12,
            cornerRadius: 8,
            boxPadding: 6
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                family: 'Inter',
                size: 12,
                weight: 500
              },
              color: '#64748b'
            }
          },
          y: {
            grid: {
              color: 'rgba(226, 232, 240, 0.6)'
            },
            ticks: {
              stepSize: 5,
              font: {
                family: 'Inter',
                size: 12,
                weight: 500
              },
              color: '#64748b'
            }
          }
        }
      }
    };

    this.activityChart = new Chart(this.activityChartRef.nativeElement, config);
  }
}
