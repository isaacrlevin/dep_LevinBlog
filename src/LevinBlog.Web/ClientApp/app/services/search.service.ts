import { Injectable, Inject } from '@angular/core';
import { ORIGIN_URL } from '../shared/constants/baseurl.constants';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Post } from '../models/post';

@Injectable()
export class SearchService {
    private url = '/api/search';

    constructor(private transferHttp: TransferHttp, private http: HttpClient, @Inject(ORIGIN_URL) private baseUrl: string) { }

    get(search: string): Observable<Post[]> {
        return this.http.get(`${this.baseUrl}${this.url}/${search}`)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
