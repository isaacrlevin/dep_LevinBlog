import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../models/user';

@Injectable()
export class SignupService {
    constructor(private http: Http) { }
    create(email: string) {
        let model: any = {};
        model.email = email;
        return this.http.post('/contacts', model);
    }
}
