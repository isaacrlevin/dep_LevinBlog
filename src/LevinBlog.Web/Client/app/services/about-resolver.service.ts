import { Injectable } from '@angular/core';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';

import { AboutService } from './about.service';
import { LoadingService } from './loading.service';


@Injectable()
export class AboutResolver implements Resolve<any> {
    constructor(private as: AboutService, private router: Router, public loadingService: LoadingService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        this.loadingService.loaded = false;
        return this.as.get().then(about => {
            if (about) {
                this.loadingService.loaded = true;
                return about;
            } else { // id not found
                this.router.navigate(['']);
                return null;
            }
        });
    }
}
