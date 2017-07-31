import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation, RendererFactory2, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { Meta, Title, DOCUMENT, MetaDefinition } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { isPlatformServer, APP_BASE_HREF } from '@angular/common';
import { LinkService } from './services/link.service';
import { ORIGIN_URL } from './shared/constants/baseurl.constants';
import { REQUEST } from './shared/constants/request';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit, OnDestroy {

    // This will go at the END of your title for example "Home - Angular Universal..." <-- after the dash (-)
    private endPageTitle: string = ' - Isaac Levin';
    // If no Title is provided, we'll use a default one before the dash(-)

    private routerSub$: Subscription;
    private url: string;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private title: Title,
        private meta: Meta,
        private linkService: LinkService,
        @Inject(REQUEST) private request
    ) {
    }

    ngOnInit() {
        // Change "Title" on every navigationEnd event
        // Titles come from the data.title property on all Routes (see app.routes.ts)
        this._changeTitleOnNavigation();
    }

    ngOnDestroy() {
        // Subscription clean-up
        this.routerSub$.unsubscribe();
    }
    private getBaseUrl() {
        if (Zone.current.get('originUrl')) {
            return Zone.current.get('originUrl');
        } else if (location) {
            return location.href;
        } else {
            return 'something went wrong!';
        }
    }
    private _changeTitleOnNavigation() {

        this.routerSub$ = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => {
                return this.activatedRoute
            }
            )
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route =>
                route.outlet === 'primary'
            )
            .mergeMap(route => route.data.combineLatest(route.url))
            .subscribe((event) => {
                 this._setMetaAndLinks(event);
            });
    }

    private _setMetaAndLinks(event) {
        let title = '';
        let metaData = event[0]['meta'] || [];


        if (event[0]['post']) {
            title = `${event[0]['post'].title} - ${this.endPageTitle} `;
        } else if (event[1].join('/').toLowerCase().indexOf('category') > -1) {
            let category = event[1][1].path;           
            title = `${category} - ${this.endPageTitle} `;
            metaData.push({ name: 'og:title', content: category });
            metaData.push({ name: 'og:description', content: category });
        } else if (event[1].join('/').toLowerCase().indexOf('tag') > -1) {
            let tag = event[1][1].path;
            title = `${tag} - ${this.endPageTitle} `;
            metaData.push({ name: 'og:title', content: tag });
            metaData.push({ name: 'og:description', content: tag });
        } else {
            title = event[0]['title']
                ? `${event[0]['title']} - ${this.endPageTitle}`
                : `${this.endPageTitle}`;
        }

        this.title.setTitle(title.charAt(0).toUpperCase() + title.slice(1).toLowerCase());

        // get route related meta
        metaData.push({ name: 'og:url', content: `${this.getBaseUrl()}` });

        if (event[0]['post']) {
            metaData.push({ name: 'og:description', content: event[0]['post'].description });
            metaData.push({ name: 'og:title', content: event[0]['post'].title });
            metaData.push({ name: 'og:type', content: 'article' });
            metaData.push({ name: 'article:published_time', content: event[0]['post'].postedOn });
            metaData.push({ name: 'og:updated_time', content: event[0]['post'].modifiedOn });
            metaData.push({ name: 'article:section', content: event[0]['post'].category.name });
        }

        const linksData = event[0]['links'] || [];

        for (let i = 0; i < metaData.length; i++) {
            this.meta.updateTag(metaData[i]);
        }

        for (let i = 0; i < linksData.length; i++) {
            this.linkService.addTag(linksData[i]);
        }
    }
}
