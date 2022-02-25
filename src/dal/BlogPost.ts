export interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: { fullName: string; id: string };
}
