import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation, PLATFORM_ID, Injector } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { LinkService } from './services/link.service';
import 'rxjs/add/operator/combineLatest';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit, OnDestroy {
  private endPageTitle: string = 'Isaac Levin';
  private routerSub$: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    private linkService: LinkService
  ) { }

  ngOnInit() {
    this._changeTitleOnNavigation();
  }

  ngOnDestroy() {
    this.routerSub$.unsubscribe();
  }

  private _changeTitleOnNavigation() {
    this.routerSub$ = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => {
        return this.activatedRoute;
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

  private isEmptyObject(obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return true;
  }

  private _setMetaAndLinks(event) {
    let title = '';
    let metaData = event[0]['meta'] || [];
    let route = event[1].join('/') || '';
    if (!this.isEmptyObject(event[0])) {
      if (event[0]['post']) {
        title = event[0]['post'].title + ' - ' + this.endPageTitle + ' ';
      } else if (route.toLowerCase().indexOf('category') > -1) {
        let category = event[1][1].path.charAt(0).toUpperCase() + event[1][1].path.slice(1).toLowerCase();
        title = category + ' - ' + this.endPageTitle + ' ';
        metaData.push({ name: 'og:title', content: category });
        metaData.push({ name: 'og:description', content: category });
        metaData.push({ name: 'description', content: category });
      } else if (route.toLowerCase().indexOf('tag') > -1) {
        let tag = event[1][1].path.charAt(0).toUpperCase() + event[1][1].path.slice(1).toLowerCase();
        title = tag + ' - ' + this.endPageTitle + ' ';
        metaData.push({ name: 'og:title', content: tag });
        metaData.push({ name: 'og:description', content: tag });
        metaData.push({ name: 'description', content: tag });
      } else {
        title = event[0]['title']
          ? event[0]['title'].charAt(0).toUpperCase() + event[0]['title'].slice(1).toLowerCase() + ' - ' + this.endPageTitle
          : '' + this.endPageTitle;
      }
      this.title.setTitle(title);
      // get route related meta
      if (event[0]['post']) {
        if (event[0]['post'].excerpt.content !== undefined) {
          let description = (event[0]['post'].excerpt.content.replace("'", '').replace(/"/g, '').substring(0, 150));
          metaData.push({ name: 'og:description', content: description });
          metaData.push({ name: 'description', content: description });
        }
        metaData.push({ name: 'keywords', content: event[0]['post'].keywords });
        metaData.push({ name: 'og:title', content: event[0]['post'].title });
        metaData.push({ name: 'og:type', content: 'article' });
        metaData.push({ name: 'article:published_time', content: event[0]['post'].postedOn });
        metaData.push({ name: 'og:updated_time', content: event[0]['post'].modifiedOn });
        metaData.push({ name: 'article:section', content: event[0]['post'].category.name });
      }
      let linksData = event[0]['links'] || [];
      for (let i = 0; i < metaData.length; i++) {
        this.meta.updateTag(metaData[i]);
      }
      for (let i = 0; i < linksData.length; i++) {
        this.linkService.addTag(linksData[i]);
      }
    }
  }
}
