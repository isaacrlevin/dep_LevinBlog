import { Injectable, Inject } from '@angular/core';
import { ORIGIN_URL } from '../shared/constants/baseurl.constants';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';
import { Tag } from '../models/tag';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable()
export class TagService {
    private url = '/tags';

    constructor(private transferHttp: TransferHttp, private http: HttpClient, @Inject(ORIGIN_URL) private baseUrl: string) { }


    getAll(): Observable<Tag[]> {
        return this.http.get(`${this.baseUrl}${this.url }`)
            .catch(this.handleError);
    }

    getById(id: number): Observable<Tag> {
        return this.http.get(`${this.baseUrl}${this.url }/${id}`)
            .catch(this.handleError);
    }

    create(tag: Tag): Observable<Tag> {
        return this.http
            .post(`${this.baseUrl}${this.url}`, tag)
            .catch(this.handleError)
    }

    update(tag: Tag): Observable<void> {
        const url = `${this.baseUrl}${this.url}/${tag.id}`;
        return this.http
            .put(url, tag)
            .catch(this.handleError);
    }

    delete(id: number): Observable<void> {
        const url = `${this.url}/${id}`;
        return this.http.delete(url)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred (Tag Repository)', error);
        return Promise.reject(error.message || error);
    }
}
