import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportServices {

  private apiUrl = 'https://localhost:7134/api/moderation';

  constructor(private http: HttpClient) {}

  // =========================
  // DANH SÁCH NỘI DUNG VI PHẠM
  // =========================

  getReportedNovels(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/reported-novels`
    );
  }

  getReportedChapters(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/reported-chapters`
    );
  }

  getReportedComments(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/reported-comments`
    );
  }

  // =========================
  // GỠ NỘI DUNG
  // =========================

  removeNovel(ticketId: string, moderatorUid: string) {
    return this.http.put(
      `${this.apiUrl}/remove-novel/${ticketId}?moderatorUid=${moderatorUid}`,
      {}
    );
  }

  removeChapter(ticketId: string, moderatorUid: string) {
    return this.http.put(
      `${this.apiUrl}/remove-chapter/${ticketId}?moderatorUid=${moderatorUid}`,
      {}
    );
  }

  removeComment(ticketId: string, moderatorUid: string) {
    return this.http.put(
      `${this.apiUrl}/remove-comment/${ticketId}?moderatorUid=${moderatorUid}`,
      {}
    );
  }

  // =========================
  // BÁC BỎ BÁO CÁO
  // =========================

  rejectTicket(ticketId: string, moderatorUid: string) {
    return this.http.put(
      `${this.apiUrl}/reject-ticket/${ticketId}?moderatorUid=${moderatorUid}`,
      {}
    );
  }

  // =========================
  // LỊCH SỬ XỬ LÝ
  // =========================

  getHistory(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/history`
    );
  }
}