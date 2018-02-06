import { Injectable, Inject, Injector } from '@angular/core';
import { ORIGIN_URL } from '@nguniversal/aspnetcore-engine';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class SignupService {
  private baseUrl: string;
  constructor(private http: HttpClient, private injector: Injector
  ) {
    this.baseUrl = this.injector.get(ORIGIN_URL);
  }
  create(email: string) {
    let model: any = {};
    model.email = email;
    return this.http.post(`${this.baseUrl}/contacts`, model);
  }
}
