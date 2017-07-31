import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryService {
    private url = '/categories';

    constructor(private http: Http) { }


    getAll(): Promise<Category[]> {
        const url = `${this.url}`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Category[]
            )
            .catch(this.handleError);
    }

    getById(id: number): Promise<Category> {
        const url = `${this.url}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Category)
            .catch(this.handleError);
    }

    create(category: Category): Promise<Category> {
        return this.http
            .post(this.url, category, this.jwt())
            .toPromise()
            .then(res => res.json() as Category)
            .catch(this.handleError)
    }

    update(category: Category): Promise<void> {
        const url = `${this.url}/${category.id}`;
        return this.http
            .put(url, category, this.jwt())
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
        console.error('An error occurred (Category Repository)', error);
        return Promise.reject(error.message || error);
    }
}
