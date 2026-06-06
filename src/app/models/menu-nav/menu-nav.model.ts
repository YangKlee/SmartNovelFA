export interface MenuNav {
  id: number;
  iconBootstrap?: string;
  content: string;
  urlLink?: string;
  slots?: number;
  children: MenuNav[];
}