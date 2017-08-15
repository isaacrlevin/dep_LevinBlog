import { Injectable, Inject } from '@angular/core';
import { ORIGIN_URL } from '../shared/constants/baseurl.constants';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Tag } from '../models/tag';

@Injectable()
export class PostTagService {
    private url = '/api/post-tags';

    constructor(private transferHttp: TransferHttp, private http: HttpClient, @Inject(ORIGIN_URL) private baseUrl: string) { }

    add(tagId: number, postId: number): Observable<Tag> {
        return this.http.post(`${this.baseUrl}${this.url}`, { tagId: tagId, postId: postId })
            .catch(this.handleError);
    }

    removeByCompound(tagId: number, postId: number): Observable<Response> {
        return this.http.post(`${this.baseUrl }${this.url }/remove/compound`, { tagId: tagId, postId: postId })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
