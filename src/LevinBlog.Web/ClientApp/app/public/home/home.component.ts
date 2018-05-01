import { Component, OnInit, Inject } from '@angular/core';
import { Category, Post } from '../../models/index';
import { SignupService, CategoryService, PostService } from '../../services/index'
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  loading = false;
  posts: Post[];
  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { posts: Post[] }) => {
        this.posts = data.posts;
      });
  }
}
