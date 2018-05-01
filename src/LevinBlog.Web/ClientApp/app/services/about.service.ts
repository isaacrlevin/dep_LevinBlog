import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ORIGIN_URL } from '@nguniversal/aspnetcore-engine/tokens';
@Injectable()
export class AboutService {
  private url = '/api/about';
  private baseUrl: string;
  constructor(private http: HttpClient, private injector: Injector) {
    this.baseUrl = this.injector.get(ORIGIN_URL);
  }

  get(): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.url}`)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
