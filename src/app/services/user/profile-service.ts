import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private api = `${environment.apiUrl}/account`;

  constructor(private http: HttpClient) {}

  getProfile(uid: string): Observable<any> {
    return this.http.get(`${this.api}/profile/${uid}`);
  }

  follow(uid: string) {
    return this.http.post(`${this.api}/follow/${uid}`, {});
  }

  unfollow(uid: string) {
    return this.http.delete(`${this.api}/follow/${uid}`);
  }

  block(uid: string) {
    return this.http.post(`${this.api}/block/${uid}`, {});
  }

  unblock(uid: string) {
    return this.http.delete(`${this.api}/block/${uid}`);
  }
}