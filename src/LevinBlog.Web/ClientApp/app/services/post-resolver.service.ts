import { Injectable } from '@angular/core';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Post } from '../models/index';
import { PostService } from './post.service';
import { LoadingService } from './loading.service';
import 'rxjs/add/operator/map';
@Injectable()
export class AllPostResolver implements Resolve<Post[]> {
  constructor(private ps: PostService, private router: Router, public loadingService: LoadingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> {
    let id = route.paramMap.get('id');
    this.loadingService.loaded = true;
    return this.ps.getAll(null, null, true, false, false)
      .map(posts => {
        if (posts) {
          this.loadingService.loaded = true;
          return posts;
        } else { // id not found
          this.router.navigate(['']);
          return null;
        }
      });
  }
}

@Injectable()
export class PostResolver implements Resolve<Post> {
  constructor(private ps: PostService, private router: Router, public loadingService: LoadingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> {
    let url = route.paramMap.get('url');
    this.loadingService.loaded = false;
    return this.ps.get(url, true)
      .map(post => {
        if (post) {
          this.loadingService.loaded = true;
          return post;
        } else { // id not found
          this.router.navigate(['']);
          return null;
        }
      });
  }
}

@Injectable()
export class CategoryResolver implements Resolve<Post[]> {
  constructor(private ps: PostService, private router: Router, public loadingService: LoadingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> {
    let category = route.paramMap.get('category');
    this.loadingService.loaded = false;
    return this.ps.getAllByCategory(category)
      .map(posts => {
        if (posts) {
          this.loadingService.loaded = true;
          return posts;
        } else { // id not found
          this.router.navigate(['']);
          return null;
        }
      });
  }
}

@Injectable()
export class TagResolver implements Resolve<Post[]> {
  constructor(private ps: PostService, private router: Router, public loadingService: LoadingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> {
    let tag = route.paramMap.get('tag');
    this.loadingService.loaded = false;
    return this.ps.getAllByTag(tag)
      .map(posts => {
        if (posts) {
          this.loadingService.loaded = true;
          return posts;
        } else { // id not found
          this.router.navigate(['']);
          return null;
        }
      });
  }
}
