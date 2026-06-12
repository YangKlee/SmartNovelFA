import { Component, Input } from '@angular/core';
import { DatePipe, NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Comment as CommentModel } from '../../../models/comment/comment.model';
import { WriteComment } from '../write-comment/write-comment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comment',
  imports: [DatePipe, NgIf, NgFor, MatIconModule, WriteComment, AsyncPipe],
  templateUrl: './comment.html',
  styleUrl: './comment.css',
})
export class Comment {
  @Input() comment?: CommentModel;
  @Input() isParent?: boolean = false;
  isShowReplies: boolean = false;
  isReplying: boolean = false;
  childComment: Observable<CommentModel[]> = new Observable<CommentModel[]>();
  constructor() { }

  toggleReplies() {
    this.isShowReplies = !this.isShowReplies;
  }

  deleteComment() {
    // TODO: implement delete logic
  }

  toggleReplyForm() {
    this.isReplying = !this.isReplying;
  }

  cancelReply() {
    this.isReplying = false;
  }

  submitReply(content: string) {
    // TODO: implement submit reply logic
    console.log('Reply submitted:', content);
    this.isReplying = false;
  }
}
