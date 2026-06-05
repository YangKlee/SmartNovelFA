import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReportServices } from '../../services/report/report-services';

@Component({
  selector: 'app-moderation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './moderation.html',
  styleUrls: ['./moderation.css']
})
export class ModerationComponent implements OnInit {

  novels: any[] = [];
  chapters: any[] = [];
  comments: any[] = [];
  history: any[] = [];

  activeTab = 'novels';

  moderatorUid = 'U002';

  constructor(
    private reportService: ReportServices
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.loadNovels();
    this.loadChapters();
    this.loadComments();
    this.loadHistory();
  }

  loadNovels() {
    this.reportService
      .getReportedNovels()
      .subscribe(res => this.novels = res);
  }

  loadChapters() {
    this.reportService
      .getReportedChapters()
      .subscribe(res => this.chapters = res);
  }

  loadComments() {
    this.reportService
      .getReportedComments()
      .subscribe(res => this.comments = res);
  }

  loadHistory() {
    this.reportService
      .getHistory()
      .subscribe(res => this.history = res);
  }

  removeNovel(ticketId: string) {
    if (!confirm('Gỡ truyện vi phạm?')) return;

    this.reportService
      .removeNovel(ticketId, this.moderatorUid)
      .subscribe(() => this.loadAll());
  }

  removeChapter(ticketId: string) {
    if (!confirm('Gỡ chương vi phạm?')) return;

    this.reportService
      .removeChapter(ticketId, this.moderatorUid)
      .subscribe(() => this.loadAll());
  }

  removeComment(ticketId: string) {
    if (!confirm('Gỡ bình luận vi phạm?')) return;

    this.reportService
      .removeComment(ticketId, this.moderatorUid)
      .subscribe(() => this.loadAll());
  }

  reject(ticketId: string) {
    if (!confirm('Bác bỏ báo cáo này?')) return;

    this.reportService
      .rejectTicket(ticketId, this.moderatorUid)
      .subscribe(() => this.loadAll());
  }
}