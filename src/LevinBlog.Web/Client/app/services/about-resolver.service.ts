import { Injectable } from '@angular/core';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AboutService } from './about.service';
import { LoadingService } from './loading.service';


@Injectable()
export class AboutResolver implements Resolve<any> {
    constructor(private as: AboutService, private router: Router, public loadingService: LoadingService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        this.loadingService.loaded = false;
        return this.as.get().map(about => {
            if (about) {
                this.loadingService.loaded = true;
                return about;
            } else { // id not found
                this.router.navigate(['']);
                return undefined;
            }
        });
    }
}
