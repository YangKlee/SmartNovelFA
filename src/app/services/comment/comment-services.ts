import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../env';

@Injectable({
  providedIn: 'root',
})
export class CommentServices {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json"
    }),
  };

  private URL_COMMENT = `${environment.apiUrl}/Comment`;

  constructor(private httpClient: HttpClient) { }
}
