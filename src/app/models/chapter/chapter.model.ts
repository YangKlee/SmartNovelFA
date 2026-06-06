export class Chapter {
    chapterId!: string;
  chaperOrder!: number;
  novelId!: string;
  chapterTitle!: string;
  summaryChapter?: string | null;
  chapterFileUrl?: string | null;
  status!: string;
  createTime?: Date | string | null;
  updateTime?: Date | string | null;
  allowComment?: boolean | null;
}
