import { Injectable, Inject } from '@angular/core';
import { ORIGIN_URL } from '../shared/constants/baseurl.constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, @Inject(ORIGIN_URL) private baseUrl: string) { }

    login(username: string, password: string) {
        return this.http.post<any>('/users/authenticate', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            }).catch(this.handleError);
    }

    authenticated(): Observable<boolean> {
        return this.http.get('users/authenticate', { headers: this.jwt() })
            .map(() => true)
            .catch(() => {
                this.logout();
                return Observable.of(false);
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            return new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.token);
        }
    }

    private handleError(error: any): Promise<any> {
        this.logout();
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
