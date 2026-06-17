import { Component, Input, ChangeDetectorRef, OnInit, forwardRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe, NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Comment as CommentModel } from '../../../models/comment/comment.model';
import { WriteComment } from '../../common/write-comment/write-comment';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { CommentServices } from '../../../services/comment/comment-services';
import { PagedResponse } from '../../../modelels/paged-response';
import { UserServices } from '../../../services/user/user-services';
import { User } from '../../../models/user/user.model';

@Component({
  selector: 'app-author-comment',
  standalone: true,
  imports: [DatePipe, NgIf, NgFor, MatIconModule, WriteComment, AsyncPipe],
  templateUrl: './author-comment.html',
  styleUrl: './author-comment.css',
})
export class AuthorComment implements OnInit {
  @Input() comment?: CommentModel;
  @Input() isParent?: boolean = false;
  isShowReplies: boolean = false;
  isReplying: boolean = false;

  childComment!: Observable<CommentModel[]>

  countComment: number = 0;
  limitComment: number = 5;
  totalComment: number = 0;

  currentUser?: User;

  constructor(
    private commentServices: CommentServices, 
    private crl: ChangeDetectorRef, 
    private snackBar: MatSnackBar,
    private userServices: UserServices
  ) { }
  ngOnInit(): void {
    this.userServices.getUserInfo().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.crl.detectChanges();
      }
    });

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
    if (this.comment?.novelId != null && this.comment?.chapterId != null) {
      const req = {
        novelId: this.comment.novelId.toString(),
        chapterId: this.comment.chapterId.toString(),
        keyworld: '',
        pageLimit: this.limitComment.toString(),
        currentPage: ((this.countComment / this.limitComment) + 1).toString(),
        parentCommentID: this.comment.commentId?.toString()
      };

      this.commentServices.getAllCommentAuthor(req).subscribe({
        next: (data: PagedResponse<CommentModel>) => {
          this.childComment = of(data.data || (data as any).datas || []);
          this.totalComment = data.totalRecords;
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
