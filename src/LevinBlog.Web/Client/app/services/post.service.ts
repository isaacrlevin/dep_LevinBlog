import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Post } from '../models/post';
import { Tag } from '../models/tag';

@Injectable()
export class PostService {
    private url = '/api/posts';

    constructor(private http: Http) { }

    get(idUrl: string, includeExcerpt: boolean = false): Promise<Post> {
        return this.http.get(this.url + '/' + idUrl + '?includeExcerpt=' + includeExcerpt)
            .toPromise()
            .then((res: Response) => {
                const body: Post = res.json();
                return body || {} as Post;
            })
            .catch(this.handleError);
    }

    getAll(count: number = null,
        page: number = null,
        includeExcerpt: boolean = true,
        includeArticle: boolean = true,
        includeUnpublished: boolean = true): Promise<Post[]> {
        return this.http.get(this.url + '?countPerPage=' + count + '&currentPageIndex=' + page + '&ncludeExceprt=' + includeExcerpt + '&includeArticle=' + includeArticle + '&includeUnpublished=' + includeUnpublished)
            .toPromise()
            .then((res: Response) => {
                const body: Post[] = res.json();
                return body || [] as Post[];
            })
            .catch(this.handleError);
    }

    getAllByCategory(category: string, count: number = null,
        page: number = null): Promise<Post[]> {
        return this.http.get(`${this.url}/GetAllByCategory`+ '?category=' + category + '&countPerPage=' + count + '&currentPageIndex=' + page)
            .toPromise()
            .then((res: Response) => {
                const body: Post[] = res.json();
                return body || [] as Post[];
            })
            .catch(this.handleError);
    }

    getAllByTag(tag: string, count: number = null,
        page: number = null): Promise<Post[]> {
        return this.http.get(`${this.url}/GetAllByTag` + '?tag=' + tag + '&countPerPage=' + count + '&currentPageIndex=' + page)
            .toPromise()
            .then((res: Response) => {
                const body: Post[] = res.json();
                return body || [] as Post[];
            })
            .catch(this.handleError);
    }

    create(post: Post): Promise<Post> {
        return this.http.post(this.url, post as Post, this.jwt())
            .toPromise()
            .then((res: Response) => {
                const body: Post = res.json();
                return body || [];
            })
            .catch(this.handleError);
    }

    save(post: Post): Promise<Response> {
        return this.http.put(this.url + '\\' + post.id, post, this.jwt())
            .toPromise()
            .catch(this.handleError);
    }

    remove(idUrl: string): Promise<Response> {
        return this.http.delete(this.url + '\\' + idUrl, this.jwt())
            .toPromise()
            .catch(this.handleError);
    }

    getTotalNumberOfPosts(): Promise<number> {
        return this.http.get(this.url + '\\count\\total')
            .toPromise()
            .then((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
