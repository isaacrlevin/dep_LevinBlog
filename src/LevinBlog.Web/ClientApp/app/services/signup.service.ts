import { Injectable, Inject } from '@angular/core';
import { ORIGIN_URL } from '../shared/constants/baseurl.constants';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class SignupService {
    constructor(private transferHttp: TransferHttp, private http: HttpClient, @Inject(ORIGIN_URL) private baseUrl: string) { }
    create(email: string) {
        let model: any = {};
        model.email = email;
        return this.http.post(`${this.baseUrl }/contacts`, model);
    }
}
