import * as Tag from './tag';
import * as Article from './article';
import * as Category from './category';
import * as Excerpt from './excerpt';
export enum PreviousCurrentNextPosition {
  Previous = 0,
  Current,
  Next
};

export class Post {
  id: number;
  title: string;
  meta: string;
  description: string;
  image: string;
  smallImage: string;
  iconImage: string;
  url: string;
  link: string;
  postedOn: string;
  modifedOn: string;
  tags: Tag.Tag[];
  article: Article.Article;
  category: Category.Category;
  excerpt: Excerpt.Excerpt;
}
