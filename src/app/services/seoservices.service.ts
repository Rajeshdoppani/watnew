import { Injectable } from '@angular/core';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SEOservicesService {

  constructor(private titleService: Title,
    private meta: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  updateDescription(desc: string, keywords: string, title: string) {
    this.titleService.setTitle(title);
    this.meta.updateTag({ name: 'description', content: desc })
    this.meta.updateTag({ name: 'keywords', content: keywords })
  }

  updateTitle() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        this.updateDescription(event['description'], event['keywords'], event['title']);
      });
  }

}
