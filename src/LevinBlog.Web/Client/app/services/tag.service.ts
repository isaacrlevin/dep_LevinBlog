import { Injectable } from '@angular/core';
import { Tag } from '../models/tag';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TagService {
    private url = '/tags';

    constructor(private http: Http) { }


    getAll(): Promise<Tag[]> {
        const url = `${this.url}`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Tag[]
            )
            .catch(this.handleError);
    }

    getById(id: number): Promise<Tag> {
        const url = `${this.url}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Tag)
            .catch(this.handleError);
    }

    create(tag: Tag): Promise<Tag> {
        return this.http
            .post(this.url, tag, this.jwt())
            .toPromise()
            .then(res => res.json() as Tag)
            .catch(this.handleError)
    }

    update(tag: Tag): Promise<void> {
        const url = `${this.url}/${tag.id}`;
        return this.http
            .put(url, tag, this.jwt())
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.url}/${id}`;
        return this.http.delete(url, this.jwt())
            .toPromise()
            .then(() => null)
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
        console.error('An error occurred (Tag Repository)', error);
        return Promise.reject(error.message || error);
    }
}
