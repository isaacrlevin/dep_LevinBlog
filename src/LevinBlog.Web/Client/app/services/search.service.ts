import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Post } from '../models/post';

@Injectable()
export class SearchService {
    private url = '/api/search';

    constructor(private http: Http) { }

    get(search: string): Promise<Post[]> {
        return this.http.get(this.url + '/' + search)
            .toPromise()
            .then((res: Response) => {
                const body: Post[] = res.json();
                return body || {} as Post[];
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
