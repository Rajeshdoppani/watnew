import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SEOservicesService } from '../services/seoservices.service';
import { PostsService } from '../services/posts/posts.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  template: string = `<img class="loader-img" src="assets/images/loader.gif" />`;
  GamesData: any;
  gameIframe: any;
  Finalframe: any;
  maxLength: any;
  Gamepagination: any;
  limit = 30;
  Opendata = {
    "name": '',
    "category": '',
    "description": '',
    "url": '',
    "width": '',
    "height": '',
  };
  @ViewChild('GameOpen') GameOpen: ElementRef;
  Bannerdata: any;
  slideConfigs = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 6000, "arrows": false };
  constructor(private postservice: PostsService, private seoservice: SEOservicesService, private loginservice: LoginService, private sanitizer: DomSanitizer) {
    this.seoservice.updateTitle();
    $('body').removeClass('side-menu-active');
    this.getGames();
    this.getBanner();
  }

  getBanner = function () {
    const bannerVal = new FormData;
    bannerVal.append('location', 'GAMES');
    this.postservice.GetBanners(bannerVal).subscribe(data => {
      if (data.status_code == 200) {
        this.Bannerdata = data.data;
        // console.log(this.adsarray);
      }
    });
  }

  getGames = function () {
    this.loginservice.Games().subscribe(data => {
      if (data.length != 0) {
        this.GamesData = data;
        this.maxLength = this.GamesData.length;
        this.Gamepagination = this.GamesData.slice(0, this.limit);
        //console.log(this.GamesData);
      }
    });
  }


  openGame(data) {
    console.log(data);
    this.Opendata.name = data.name;
    this.Opendata.url = data.url;
    this.Opendata.width = data.width;
    this.Opendata.height = data.height;
    this.gameIframe = '<iframe src="' + this.Opendata.url + '" height="' + this.Opendata.height + '" width="' + this.Opendata.width + '"></iframe>';
    this.Finalframe = this.sanitizer.bypassSecurityTrustHtml(this.gameIframe);
    this.GameOpen.nativeElement.click();
  }

  ngOnInit() {
  }

  showMoreImages() {
    this.limit += 30;
    this.Gamepagination = this.GamesData.slice(0, this.limit);
  }

}
