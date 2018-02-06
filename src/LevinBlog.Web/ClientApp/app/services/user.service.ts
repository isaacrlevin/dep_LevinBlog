import { Injectable, Inject, Injector } from '@angular/core';
import { ORIGIN_URL } from '@nguniversal/aspnetcore-engine';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class UserService {
  private baseUrl: string;
  private url = '/user';
  constructor(private http: HttpClient, private injector: Injector
  ) {
    this.baseUrl = this.injector.get(ORIGIN_URL);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}${this.url}`);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}${this.url}/${id}`);
  }

  create(user: User) {
    return this.http.post(`${this.baseUrl}${this.url}`, user);
  }

  update(user: User) {
    return this.http.put(`${this.baseUrl}${this.url}/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}${this.url}/${id}`);
  }
}
