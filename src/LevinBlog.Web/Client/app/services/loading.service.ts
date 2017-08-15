import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class LoadingService {
    constructor() { }

    public loaded: boolean;
}
