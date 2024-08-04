export class Tag {
  id: number;
  name: string;
  post_count: number;
  category: 0 | 1 | 3 | 4 | 5;
  created_at: Date;
  updated_at: Date;
  is_deprecated: boolean;
  words: string[];
}