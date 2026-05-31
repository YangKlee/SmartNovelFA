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
  viewCount?: number;   // int? trong C# chuyển thành number trong TS
  likeCount?: number;
  createTime?: Date | string; // Có thể xử lý dạng Date hoặc chuỗi ISO String từ API
  updateTime?: Date | string;


}
