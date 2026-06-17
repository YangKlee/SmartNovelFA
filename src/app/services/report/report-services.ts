import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModerationReportServices { // 🌟 Đổi tên class để phân biệt rõ ràng với User

  private apiUrl = 'https://localhost:7134/api/moderation';

  constructor(private http: HttpClient) {}

  // ==========================================
  // DANH SÁCH NỘI DUNG VI PHẠM (Nhận JSON)
  // ==========================================

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

  // ==========================================
  // GỠ NỘI DUNG (🌟 Thêm responseType: 'text' để nhận chuỗi thuần)
  // ==========================================

  removeNovel(ticketId: string, moderatorUid: string) {
    return this.http.put(
      `${this.apiUrl}/remove-novel/${ticketId}?moderatorUid=${moderatorUid}`,
      {},
      { responseType: 'text' } 
    );
  }

  removeChapter(ticketId: string, moderatorUid: string) {
    return this.http.put(
      `${this.apiUrl}/remove-chapter/${ticketId}?moderatorUid=${moderatorUid}`,
      {},
      { responseType: 'text' }
    );
  }

  removeComment(ticketId: string, moderatorUid: string) {
    return this.http.put(
      `${this.apiUrl}/remove-comment/${ticketId}?moderatorUid=${moderatorUid}`,
      {},
      { responseType: 'text' }
    );
  }

  // ==========================================
  // BÁC BỎ BÁO CÁO (🌟 Nhận phản hồi chuỗi text từ .NET)
  // ==========================================

  rejectTicket(ticketId: string, moderatorUid: string) {
    return this.http.put(
      `${this.apiUrl}/reject-ticket/${ticketId}?moderatorUid=${moderatorUid}`,
      {},
      { responseType: 'text' }
    );
  }

  // ==========================================
  // LỊCH SỬ XỬ LÝ (Nhận JSON)
  // ==========================================

  getHistory(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/history`
    );
  }
}