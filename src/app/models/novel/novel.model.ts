import { User } from "../user/user.model";

export class Novel {
    novelId?: string;
  title?: string;
  slug?: string;
  description?: string; // Dấu ? tương đương với string? (nullable)
  ageRating?: string;
  imageNovelUrl?: string;
  imageBanerNovelUrl?: string;
  status?: string;
  uid?: string;
  viewCount?: number;   
  authorId?: string;

  countChapter?: number;
  countChapterPublic?:number;
  countChapterDraf?:number;
  countChapterRemove?:number;
  novelRating?:number;
  authorName?: string;
  likeCount?: number;
  createTime?: Date | string; 
  updateTime?: Date | string;
}
