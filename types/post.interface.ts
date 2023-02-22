import { Author } from './author.interface';
import { Category } from './category.interface';

export interface Post {
  author?: Author;
  categories?: Category[];
  title: string;
  slug: string;
  excerpt?: string;
  createdAt: string;
  feturedImage: {
    url: string;
  };
  content?: any;
}
