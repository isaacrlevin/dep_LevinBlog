import { Injectable, Inject, Injector } from '@angular/core';
import { ORIGIN_URL } from '@nguniversal/aspnetcore-engine/tokens';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Tag } from '../models/tag';

@Injectable()
export class PostTagService {
  private url = '/api/post-tags';
  private baseUrl: string;
  constructor(private http: HttpClient, private injector: Injector
  ) {
    this.baseUrl = this.injector.get(ORIGIN_URL);
  }

  add(tagId: number, postId: number): Observable<Tag> {
    return this.http.post(`${this.baseUrl}${this.url}`, { tagId: tagId, postId: postId })
      .catch(this.handleError);
  }

  removeByCompound(tagId: number, postId: number): Observable<Response> {
    return this.http.post(`${this.baseUrl}${this.url}/remove/compound`, { tagId: tagId, postId: postId })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
