import { Injectable, Inject, Injector } from '@angular/core';
import { ORIGIN_URL } from '@nguniversal/aspnetcore-engine/tokens';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Category } from '../models/index';
@Injectable()
export class CategoryService {
  private url = '/categories';
  private baseUrl: string;
  constructor(private http: HttpClient, private injector: Injector
  ) {
    this.baseUrl = this.injector.get(ORIGIN_URL);
  }

  getAll(): Observable<Category[]> {
    const url = `${this.url}`;
    return this.http.get(url)
      .catch(this.handleError);
  }

  getById(id: number): Observable<Category> {
    const url = `${this.url}/${id}`;
    return this.http.get(url)
      .catch(this.handleError);
  }

  create(category: Category): Observable<Category> {
    return this.http
      .post(this.url, category)
      .catch(this.handleError);
  }

  update(category: Category): Observable<void> {
    const url = `${this.url}/${category.id}`;
    return this.http
      .put(url, category)
      .catch(this.handleError);
  }

  delete(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred (Category Repository)', error);
    return Promise.reject(error.message || error);
  }
}
