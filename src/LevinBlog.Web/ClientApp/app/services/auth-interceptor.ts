import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if ((req.method === 'DELETE' || req.method === 'POST' || req.method === 'PUT') && (req.url.indexOf('contact') === -1)) {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
        req = req.clone({
          setHeaders: {
            authorization: 'Bearer ' + currentUser.token
          }
        });
      }
    }
    return next.handle(req);
  }
}
