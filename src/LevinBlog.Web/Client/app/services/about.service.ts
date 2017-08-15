import { Injectable, Inject } from '@angular/core';
import { ORIGIN_URL } from '../shared/constants/baseurl.constants';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable()
export class AboutService {
    private url = '/api/about';

    constructor(private transferHttp: TransferHttp, private http: HttpClient, @Inject(ORIGIN_URL) private baseUrl: string) { }

    get(): Observable<any> {
        return this.http.get(`${this.baseUrl}${this.url}`)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
