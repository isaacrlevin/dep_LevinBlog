import { Injectable, Inject } from '@angular/core';
import { ORIGIN_URL } from '../shared/constants/baseurl.constants';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';
import { Post } from '../models/post';
import { Tag } from '../models/tag';
import { HttpParams, HttpClient } from '@angular/common/http';
@Injectable()
export class PostService {
    private url = '/api/posts';

    constructor(private transferHttp: TransferHttp, private http: HttpClient, @Inject(ORIGIN_URL) private baseUrl: string) { }

    get(idUrl: string, includeExcerpt: boolean = false): Observable<Post> {
        return this.http.get(`${this.baseUrl}${this.url}/${idUrl}`
            , {
                params: new HttpParams()
                    .set('includeExcerpt', includeExcerpt == null ? null : includeExcerpt.toString())
            })
            .catch(this.handleError);
    }

    getAll(count: number = null,
        page: number = null,
        includeExcerpt: boolean = true,
        includeArticle: boolean = true,
        includeUnpublished: boolean = true): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.baseUrl}${this.url}`
            , {
                params: new HttpParams()
                    .set('countPerPage', count == null ? null : count.toString())
                    .set('currentPageIndex', page == null ? null : page.toString())
                    .set('includeExceprt', includeExcerpt == null ? null : includeExcerpt.toString())
                    .set('includeArticle', includeArticle == null ? null : includeArticle.toString())
                    .set('includeUnpublished', includeUnpublished == null ? null : includeUnpublished.toString())
            }

        )
            .catch(this.handleError);
    }

    getAllByCategory(category: string, count: number = null,
        page: number = null): Observable<Post[]> {
        return this.http.get(`${this.baseUrl}${this.url}/GetAllByCategory`
            , {
                params: new HttpParams()
                    .set('countPerPage', count == null ? null : count.toString())
                    .set('currentPageIndex', page == null ? null : page.toString())
                    .set('category', category == null ? null : category.toString())
            }
        )
            .catch(this.handleError);
    }

    getAllByTag(tag: string, count: number = null,
        page: number = null): Observable<Post[]> {
        return this.http.get(`${this.baseUrl}${this.url}/GetAllByTag`
            , {
                params: new HttpParams()
                    .set('countPerPage', count == null ? null : count.toString())
                    .set('currentPageIndex', page == null ? null : page.toString())
                    .set('tag', tag == null ? null : tag.toString())
            })
            .catch(this.handleError);
    }

    create(post: Post): Observable<Post> {
        return this.http.post(`${this.baseUrl}${this.url}`, post as Post)
            .catch(this.handleError);
    }

    save(post: Post): Observable<Response> {
        return this.http.put(`${this.baseUrl}${this.url}/${post.id}`, post)
            .catch(this.handleError);
    }

    remove(idUrl: string): Observable<Response> {
        return this.http.delete(`${this.baseUrl}${this.url}/${idUrl}`)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
