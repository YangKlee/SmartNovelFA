import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment as CommentModel } from '../../models/comment/comment.model';
import { environment } from '../../env';
import { CommentRes } from '../../models/comment/comment-res';

@Injectable({
  providedIn: 'root',
})
export class CommentServices {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json"
    }),
  };
  public isReloadComment = new BehaviorSubject<boolean>(false);
  public isReloadChildComment = new BehaviorSubject<string>(''); // reload child comment id cha taget
  private URL_COMMENT = `${environment.apiUrl}/Comment`;

  constructor(private httpClient: HttpClient) { }

  public getComment(novelID: string, chapterId: string, currentComment: number = 0,
    limitComment: number = 5, parentComment?: string | null): Observable<CommentRes> {
    let params = new HttpParams()
      .set('novelID', novelID)
      .set('chapterId', chapterId)
      .set('currentComment', currentComment.toString())
      .set('limitComment', limitComment.toString());

    if (parentComment) {
      params = params.set('parentComment', parentComment);
    }

    return this.httpClient.get<any>(`${this.URL_COMMENT}/getComment`, {
      headers: this.httpOptions.headers,
      params
    });
  }
  public addComment(body: any) {
    return this.httpClient.post<any>(`${this.URL_COMMENT}/addComment`, body, this.httpOptions);
  }
  public deleteComment(commentId: string) {
    return this.httpClient.delete<any>(`${this.URL_COMMENT}/deleteComment`, {
      headers: this.httpOptions.headers,
      body: `"${commentId}"`
    });
  }
}
