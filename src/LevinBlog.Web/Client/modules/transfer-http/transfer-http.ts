import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TransferState } from '../transfer-state/transfer-state';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

type HttpClientOptions = {
    body?: any;
    headers?: HttpHeaders,
    observe?: 'body',
    params?: HttpParams,
    responseType?: 'json',
    reportProgress?: boolean,
    withCredentials?: boolean
};

type HttpCallback = (uri: string | Request, options?: any) => Observable<Object>;
type HttpPostCallback = (uri: string | Request, body: any, options?: any) => Observable<Object>;

@Injectable()
export class TransferHttp {

    private isServer = isPlatformServer(this.platformId);

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private httpClient: HttpClient,
        protected transferState: TransferState
    ) { }

    public request(method: string, uri: string | Request, options?: HttpClientOptions): Observable<any> {
        return this.getData(uri, options, (url: string, options: HttpClientOptions) => this.httpClient.request(method, url, options));
    }

    public get<T>(url: string, options?: HttpClientOptions): Observable<T> {
        return this.getData(url, options, (url: string, options: HttpClientOptions) => this.httpClient.get<T>(url, options));
    }

    public post(url: string, body: any, options?: HttpClientOptions): Observable<any> {
        return this.getPostData(url, body, options, (url: string, options: HttpClientOptions) => this.httpClient.post(url, body, options));
    }

    public put(url: string, body: any, options?: HttpClientOptions): Observable<any> {
        return this.getPostData(url, body, options, (url: string, options: HttpClientOptions) => this.httpClient.put(url, body, options));
    }

    public delete(url: string, options?: HttpClientOptions): Observable<any> {
        return this.getData(url, options, (url: string, options: HttpClientOptions) => this.httpClient.delete(url, options));
    }

    public patch(url: string, body: any, options?: HttpClientOptions): Observable<any> {
        return this.getPostData(url, body, options, (url: string, options: HttpClientOptions) => this.httpClient.patch(url, options));
    }

    public head(url: string, options?: HttpClientOptions): Observable<any> {
        return this.getData(url, options, (url: string, options: HttpClientOptions) => this.httpClient.head(url, options));
    }

    public options(url: string, options?: HttpClientOptions): Observable<any> {
        return this.getData(url, options, (url: string, options: HttpClientOptions) => this.httpClient.options(url, options));
    }

    private getData(uri: string | Request, options: HttpClientOptions, callback: HttpCallback): Observable<any> {

        const key = this.getKey(uri, options);

        try {
            const data = this.resolveData(key);
        } catch (e) {
            return callback(uri, options).do((data) => this.tryCache(key, data));
        }
    }

    private getPostData(uri: string | Request, body: any, options: HttpClientOptions, callback: HttpPostCallback): Observable<any> {

        const key = this.getKey(uri, options, body);

        try {
            return this.resolveData(key);
        } catch (e) {
            return callback(uri, body, options).do((data) => this.tryCache(key, data));
        }
    }

    private getKey(uri: string | Request, options: HttpClientOptions, body?: any): string {

        let url = uri;

        if (typeof uri !== 'string') {
            url = uri.url;
        }

        if (body) {
            return url + JSON.stringify(body);
        }

        return url + JSON.stringify(options);
    }

    private tryCache(key: string, data: any): void {
        if (this.isServer) {
            this.setCache(key, data);
        }
    }

    private resolveData(key: string): Observable<any> {
        const data = this.getFromCache(key);
        if (!data) {
            throw new Error();
        }
        return Observable.fromPromise(Promise.resolve(data));
    }

    private setCache(key: string, data: any): Map<string, any> {
        return this.transferState.set(key, data);
    }

    private getFromCache(key: string): any {
        return this.transferState.get(key);
    }
}
