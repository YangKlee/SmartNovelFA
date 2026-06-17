import { Comment } from "./comment.model";

export class CommentRes {
    comments!: Comment[];
    totalComment: number = 0;
}

