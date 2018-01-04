import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import 'ckeditor';
import { PLATFORM_ID } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services//category.service';
import { TagService } from '../../services/tag.service';
import { PostTagService } from '../../services/posttag.service';
import { Category } from '../../models/category';
import { Tag } from '../../models/tag';
import { Post } from '../../models/post';
import { Article } from '../../models/article';
import { Excerpt } from '../../models/excerpt';
declare var CKEDITOR: any;
@Component({
  selector: 'pc-posts-page',
  templateUrl: './adminpost.component.html'
})

export class AdminPostComponent implements OnInit {
  loading = false;
  showEdit = false;
  posts = [] as Post[];
  tags = [] as Tag[];
  categories = [] as Category[];
  selectedPost = {} as Post;
  countPerPage = 10;
  currentPageIndex = 1;
  totalItemsInCollection = 0;
  public ckeditorContent: string = '<p>Hello CKEditor</p>';
  public config = {
    uiColor: '#F0F3F4',
    height: '600',
    allowedContent: {}
  }
  title: string = 'Manage Posts';
  constructor(public postService: PostService,
    public categoryService: CategoryService,
    public posttagService: PostTagService,
    public tagService: TagService, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  helpWindow(post) {
    window.open('/post/' + post.url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  }

  selectPost(post: Post): void {
    if (post === undefined) {
      this.selectedPost = new Post();
      this.selectedPost.article = new Article();
      this.selectedPost.excerpt = new Excerpt();
    }
    else {
      this.selectedPost = post;
    }
    this.showEdit = true;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window['CKEDITOR_BASEPATH'] = '//cdn.ckeditor.com/4.6.0/full/';

      this.config.
        allowedContent = {
          script: true,
          $1: {
            // This will set the default set of elements
            elements: CKEDITOR.dtd,
            attributes: true,
            styles: true,
            classes: true
          }
        }
    }
    this.loading = true;
    this.getAllCategories();
    this.getAllTags();
    this.getAllPosts();

  }

  getAllPosts(): void {
    this.loading = true;
    this.postService.getAll()
      .subscribe(posts => {
        this.posts = posts;
        this.totalItemsInCollection = posts.length;
        this.loading = false;
      });
  }

  getAllTags(): void {
    this.loading = true;
    this.tagService.getAll()
      .subscribe(tags => {
        this.tags = tags;
        this.loading = false;
      });
  }

  getAllCategories(): void {
    this.loading = true;
    this.categoryService.getAll()
      .subscribe(categories => {
        this.categories = categories;
        this.loading = false;
      });
  }

  getDescriptionLength(): number {
    return this.selectedPost.description ? this.selectedPost.description.length : 0;
  }
  /**
   * Subscribe to pc-page event
   */
  onPageClicked(selectedPage: number) {
    this.loading = true;
    this.currentPageIndex = selectedPage;
    this.resetPosts();
  }

  resetPosts(): void {
    // TODO: Abstract out - shared with init
    this.postService.getAll(this.countPerPage, this.currentPageIndex, false, false, true)
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.totalItemsInCollection = this.posts.length;
      });
  }

  deleteRecord(idUrl: string): void {
    if (confirm(`Are you sure you want to delete "${this.selectedPost.title}" from the posts list?`)) {
      this.loading = true;
      this.postService.remove(idUrl)
        .subscribe(() => {
          this.loading = false;
        });
    }
  }

  save(pos): void {
    if (confirm(`Are you sure you want to save "${this.selectedPost.title}" changes`)) {
      this.loading = true;

      if (pos.id === undefined) {
        this.postService.create(this.selectedPost)
          .subscribe(() => {
            this.loading = false;
          });
      } else {
        this.postService.save(this.selectedPost)
          .subscribe(() => {
            this.loading = false;
          });
      }
    }
    this.showEdit = false;
  }

  reset(): void {
    this.showEdit = false;
  }

  onCategoryClick(category: Category): void {
    this.loading = true;
    this.replaceCategory(category);
  }

  onTagClick(tag: Tag): void {
    this.loading = true;

    if (!this.isTagSet(tag)) {
      this.addTag(tag);
      this.loading = false;
      return;
    }

    this.removeTag(tag)
    this.loading = false;
  }

  replaceCategory(category: Category): void {
    this.selectedPost.category = category;
  }

  addTag(tag: Tag): void {
    if (this.selectedPost.tags === undefined) {
      this.selectedPost.tags = [];
    }
    this.selectedPost.tags.push(tag);
  }

  isTagSet(tag: Tag): boolean {
    if (!this.selectedPost.tags) {
      return false;
    }

    for (let i = 0; i < this.selectedPost.tags.length; i++) {
      if (tag.id === this.selectedPost.tags[i].id) {
        return true;
      }
    }
    return false;
  }

  removeTag(tag: Tag): void {

    for (let i = 0; i < this.selectedPost.tags.length; i++) {
      if (tag.id === this.selectedPost.tags[i].id) {
        this.selectedPost.tags.splice(i, 1);

      }
    }
  }
}
