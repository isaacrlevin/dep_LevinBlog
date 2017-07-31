import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AboutService {
    private url = '/api/about';

    constructor(private http: Http) { }

    get(): Promise<any> {
        return this.http.get(this.url)
            .toPromise()
            .then((res: Response) => {
                const body: any = res.json();
                return body || {} as any;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
