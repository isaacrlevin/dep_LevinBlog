import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Post } from '../../models/index';
import { SearchService, LoadingService } from '../../services/index'
@Component({
  selector: 'app-home',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  posts: Post[];
  search: string;
  sentFromNav: boolean = false;
  private sub: any;
  loading = false;
  constructor(private searchService: SearchService, private route: ActivatedRoute, public loadingService: LoadingService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.search = params['search'];

      if (this.search !== undefined && this.search !== "") {
        this.sentFromNav = true;
        this.searchPosts();
      }
      else {
        this.loadingService.loaded = true;
      }
    });
  }

  searchPosts(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.loading = true;
    this.searchService.get(this.search)
      .subscribe(posts => {
        this.posts = posts;
        this.loading = false;
      });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
