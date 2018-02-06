import { Component, OnInit, Inject } from '@angular/core';
import { Category, Post } from '../../models/index';
import { SignupService, CategoryService, PostService } from '../../services/index'
import { ActivatedRoute, Router } from '@angular/router';
//import { fadeInAnimation } from '../../shared/fade-in.animation';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // animations: [fadeInAnimation],
  // host: { '[@fadeInAnimation]': '' }
})
export class HomeComponent implements OnInit {
  loading = false;
  posts: Post[];
  constructor(private postService: PostService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { posts: Post[] }) => {
        this.posts = data.posts;
      });
  }
}
