import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, Inject, ElementRef, Renderer2, PLATFORM_ID } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services//category.service';
import { TagService } from '../../services/tag.service';
import { PostTagService } from '../../services/posttag.service';
import { Category } from '../../models/category';
import { Tag } from '../../models/tag';
import { Post } from '../../models/post';
import { Article } from '../../models/article';
import { Excerpt } from '../../models/excerpt';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs/Subscription";
import { HighlightJsService } from 'angular2-highlight-js';
import { Observable, BehaviorSubject } from 'rxjs';
@Component({
    selector: 'pc-posts-page',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
})

export class PostComponent implements OnInit {
    setTitle: string;
    posts: Post[];
    post: Post;
    url: string;
    private sub: any;
    width$: Observable<number>;
    constructor(private postService: PostService, private highLight: HighlightJsService, private route: ActivatedRoute, private elRef: ElementRef, private title: Title, private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            let windowSize$ = new BehaviorSubject(getWindowSize());
            this.width$ = (windowSize$.pluck('width') as Observable<number>).distinctUntilChanged();

            Observable.fromEvent(window, 'resize')
                .map(getWindowSize)
                .subscribe(windowSize$);
        }
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.url = params['url'];
            if (this.url !== undefined && this.url !== "") {
                this.route.data
                    .subscribe((data: { post: Post }) => {
                        this.post = data.post;
                    });
            }
            else {
                this.route.data
                    .subscribe((data: { posts: Post[] }) => {
                        this.posts = data.posts;
                        let title = this.title.getTitle().replace(' - Isaac Levin', '');
                        if (this.posts.length > 0) {
                            this.posts.forEach(function (post) {
                                if (post.category.url.toLowerCase() == title.toLowerCase()) {
                                    title = post.category.name + ' Posts';
                                }
                                post.tags.forEach(function (tag) {
                                    if (title.toLowerCase() == tag.url.toLowerCase()) {
                                        title = tag.name + ' Posts';
                                    }
                                });
                            });
                        }
                        else {
                            this.title.setTitle(title);
                        }
                        this.title.setTitle(title);
                        this.setTitle = title;
                    });
            }
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }



    ngAfterViewChecked() {
        if (isPlatformBrowser(this.platformId)) {
            let div = this.elRef.nativeElement.querySelector('#disqus_thread');
            if (div !== null) {
                this.renderer.addClass(div, 'container');
            }


            this.width$.subscribe(a => {
                let content = this.elRef.nativeElement.querySelector('.language-cs');
                if (content !== null) {
                    this.renderer.setStyle(content, "width", (a - 50) + 'px');
                    this.highLight.highlight(content);
                }
            });
        }
    }
}
function getWindowSize() {
    return {
        height: window.innerHeight,
        width: window.innerWidth
    };
}
