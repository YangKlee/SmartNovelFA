export class Novel {
    novelId?: string;
  title?: string;
  slug?: string;
  description?: string; 
  ageRating?: string;
  imageNovelUrl?: string;
  imageBanerNovelUrl?: string;
  status?: string;
  uid?: string;
  viewCount?: number;   
  authorName?: string;
  countChapter?: number;
  countChapterPublic?:number;
  countChapterDraf?:number;
  countChapterRemove?:number;
  novelRating?:number;
  novelCountComment?:number;
  likeCount?: number;
  createTime?: Date | string; 
  updateTime?: Date | string;
}
