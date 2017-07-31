import { Component, OnInit, Inject, VERSION } from '@angular/core';
import { LoadingService, AboutService } from '../../services/index';
import { ActivatedRoute, Router } from '@angular/router';
import {  } from 'webpack';
@Component({
    selector: 'app-home',
    templateUrl: './about.component.html',
     styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    version: string;
    about: any;
    title: string = 'About';
    email: string;
    image: string;

    constructor(public loadingService: LoadingService, private aboutService: AboutService, private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.route.data
            .subscribe((data: { about: any }) => {
                this.about = data.about;
                this.loadingService.loaded = true;
                this.version = VERSION.full;
                this.image = 'dist/assets/csotW.jpg'
            });
    }
}
