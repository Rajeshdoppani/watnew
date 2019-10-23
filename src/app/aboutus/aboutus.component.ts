import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PostsService } from '../services/posts/posts.service';
import { ServicesService } from '../services/services.service';
import { EmbedVideoService } from 'ngx-embed-video';
import { DomSanitizer } from '@angular/platform-browser';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SEOservicesService } from '../services/seoservices.service';
import { CategoriesService } from '../services/categories/categories.service';

@Component({
  selector: 'aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  Bannerdata: any[];
  slideConfigs = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 6000, "arrows": false };
  constructor(private seoservice: SEOservicesService, private postservice: PostsService, private CookieService: CookieService, private CategoriesService: CategoriesService) {
    this.seoservice.updateTitle();
    this.getBanner();
  }

  getBanner = function () {
    const bannerVal = new FormData;
    bannerVal.append('location', 'ABOUT');
    this.postservice.GetBanners(bannerVal).subscribe(data => {
      if (data.status_code == 200) {
        this.Bannerdata = data.data;
        // console.log(this.adsarray);
      }
    });
  }


  ngOnInit() {
  }

}
