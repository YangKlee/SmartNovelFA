import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(
    private commentServices: CommentServices, 
    private crl: ChangeDetectorRef, 
    private snackBar: MatSnackBar,
    private router: Router
  ) { }
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

  goToChapter() {
    if (this.comment?.novelId && this.comment?.chapterId) {
      this.router.navigate(['/novel', this.comment.novelId, 'chapter', this.comment.chapterId]);
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
    this.commentServices.deleteComment(this.comment?.commentId?.toString() ?? '').subscribe({
      next: (data: CommentModel) => {
        if (this.comment?.parentCommentId) {
          this.commentServices.isReloadChildComment.next(this.comment.parentCommentId.toString());
        } else {
          this.commentServices.isReloadComment.next(true);
        }
        this.crl.detectChanges();
        this.snackBar.open('Xóa bình luận thành công!', 'Đóng', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      },
      error: (err) => {
        this.snackBar.open('Xóa bình luận không thành công!', 'Đóng', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']

        });
        console.error(err.error.msg);
      }
    });
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
          this.commentServices.isReloadChildComment.
            next(this.comment?.commentId?.toString() ?? '');
          this.snackBar.open('Thêm bình luận thành công!', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });

        },
        error: (err) => {
          this.snackBar.open('Thêm bình luận không thành công!', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
          console.error(err.error.msg);
        }
      });
    }
    this.isReplying = false;
  }
}
