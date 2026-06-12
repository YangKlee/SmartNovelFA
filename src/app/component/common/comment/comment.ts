import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { DatePipe, NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Comment as CommentModel } from '../../../models/comment/comment.model';
import { WriteComment } from '../write-comment/write-comment';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { CommentServices } from '../../../services/comment/comment-services';
import { CommentRes } from '../../../models/comment/comment-res';

@Component({
  selector: 'app-comment',
  imports: [DatePipe, NgIf, NgFor, MatIconModule, WriteComment, AsyncPipe],
  templateUrl: './comment.html',
  styleUrl: './comment.css',
})
export class Comment implements OnInit {
  @Input() comment?: CommentModel;
  @Input() isParent?: boolean = false;
  isShowReplies: boolean = false;
  isReplying: boolean = false;

  childComment!: Observable<CommentModel[]>

  countComment: number = 0;
  limitComment: number = 5;
  totalComment: number = 0;

  constructor(private commentServices: CommentServices, private crl: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.commentServices.isReloadChildComment.subscribe({
      next: (data: string) => {
        if (data == this.comment?.commentId?.toString()) {
          this.loadComment();
          this.crl.detectChanges();
        }
      }
    })
  }
  toggleReplies() {
    this.isShowReplies = !this.isShowReplies;
    if (this.isShowReplies) {
      this.loadComment();
      this.crl.detectChanges();
    }
  }
  loadComment() {
    console.log(this.comment?.novelId);
    console.log(this.comment?.chapterId);
    console.log(this.comment?.commentId);
    if (this.comment?.novelId != null && this.comment?.chapterId != null) {
      this.commentServices.getComment(
        this.comment.novelId.toString(),
        this.comment.chapterId.toString(),
        this.countComment,
        this.limitComment,
        this.comment.commentId?.toString()
      ).subscribe({
        next: (data: CommentRes) => {
          this.childComment = of(data.comments);
          this.totalComment = data.totalComment;
          this.crl.detectChanges();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
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
    if (this.comment?.novelId != null && this.comment?.chapterId != null) {
      let body = {
        novelId: this.comment.novelId,
        chapterId: this.comment.chapterId,
        content: content,
        parentComment: this.comment.commentId
      };

      this.commentServices.addComment(body).subscribe({
        next: (data: CommentModel) => {
          if (this.comment) {
            this.comment.countChildComment++;
          }
          this.loadComment();
          this.crl.detectChanges();
          this.isShowReplies = true;
          this.commentServices.isReloadChildComment.next(this.comment?.commentId?.toString() ?? '');
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    this.isReplying = false;
  }
}
