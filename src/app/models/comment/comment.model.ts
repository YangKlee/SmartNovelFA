export class Comment {
    public commentId?: number;
    public novelId?: number;
    public chapterId?: number;
    public parentCommentId?: number;
    public userId?: number;
    public content?: string;
    public displayName?: string;
    public userAvatarUrl?: string;
    public commentDateTime?: Date;
    public currentUserId?: string;
    public roleId?: string;
    public isAdminMode: boolean = false;
    public countChildComment: number = 0;

}
