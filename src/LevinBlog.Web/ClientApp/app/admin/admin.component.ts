import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { LinkService } from '../services';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit, OnDestroy {
  private endPageTitle: string = 'Levin Blog';
  private defaultPageTitle: string = 'Blog @ ';

  private routerSub$: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    private linkService: LinkService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit() {
    this._changeTitleOnNavigation();
  }

  toggleSidebar() {
    if (isPlatformBrowser(this.platformId)) {
      const dom: any = document.querySelector('#sidebar');
      dom.classList.toggle('push-right');
    }
  }

  ngOnDestroy() {
    this.routerSub$.unsubscribe();
  }

  private _changeTitleOnNavigation() {
    this.routerSub$ = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => {
        this._setMetaAndLinks(event);
      });
  }

  private _setMetaAndLinks(event) {
    const title = event['title']
      ? `${event['title']} - ${this.endPageTitle}`
      : `${this.defaultPageTitle} - ${this.endPageTitle}`;

    this.title.setTitle(title);

    const metaData = event['meta'] || [];
    const linksData = event['links'] || [];

    for (let i = 0; i < metaData.length; i++) {
      this.meta.updateTag(metaData[i]);
    }

    for (let i = 0; i < linksData.length; i++) {
      this.linkService.addTag(linksData[i]);
    }
  }
}
