import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscriber } from 'rxjs';
import * as $ from 'jquery';
import { EmbedVideoService } from 'ngx-embed-video';
import { MyfavouritesService } from '../services/favourites/myfavourites.service';
import { SEOservicesService } from '../services/seoservices.service';

@Component({
  selector: 'app-myfavourites',
  templateUrl: './myfavourites.component.html',
  styleUrls: ['./myfavourites.component.css']
})
export class MyfavouritesComponent implements OnInit {
  favouritedata: any;
  next_page_url: any;
  favouriteLength: any;
  thumbnail: any;
  loadservice: any;
  message: any;
  constructor(private seoservice: SEOservicesService, private sanitizer: DomSanitizer, private embedService: EmbedVideoService, private Router: Router, private route: ActivatedRoute, private CookieService: CookieService, private myfavouriteservice: MyfavouritesService) {
    this.seoservice.updateTitle();
    $('body').removeClass('side-menu-active');
    this.getfavourites();
  }

  getfavourites() {
    this.myfavouriteservice.GetFavourite().subscribe(data => {
      if (data.status_code == '200') {
        this.loadservice = 'true';
        this.favouritedata = data.data.data;
        this.favouriteLength = this.favouritedata;
        if (this.favouritedata.length == 0) {
          this.message = "Favourites Not Found";
        }
        for (let r = 0; r < this.favouritedata.length; r++) {
          if (this.favouritedata[r].postyvideos.length != 0) {
            this.embedService
              .embed_image(
                this.favouritedata[r].postyvideos[0].path,
                { image: 'maxresdefault' }
              )
              .then(res => {
                this.favouritedata[r].postyvideos[0].path = res.html;
              });
          }
        }
        this.next_page_url = data.data.next_page_url;
        if (this.next_page_url == null) {
          // this.message = "Favourites Not Found";
        } else {
          this.CookieService.set('favouriteURL', this.next_page_url);
          $('.loadMore').show();
        }
      }
    });
  }

  fetchNextFavourites() {
    var req = this.CookieService.get('favouriteURL');
    this.myfavouriteservice.NextFavourites(req).subscribe(resp => {
      if (resp.status_code == '200') {
        this.loadservice = 'true';
        let favouriteres = resp.data.data;
        if (favouriteres.length == 0) {
          this.message = "Favourites Not Found";
        }
        for (let r = 0; r < favouriteres.length; r++) {
          if (favouriteres[r].postyvideos.length != 0) {
            this.embedService
              .embed_image(
                favouriteres[r].postyvideos[0].path,
                { image: 'maxresdefault' }
              )
              .then(res => {
                favouriteres[r].postyvideos[0].path = res.html;
              });
          }
        }
        this.favouritedata = this.favouritedata.concat(favouriteres);
        this.favouriteLength = favouriteres;
        this.next_page_url = resp.data.next_page_url;
        if (this.next_page_url == null) {
          // this.message = "Favourites Not Found";
          $('.loadMore').hide();
        } else {
          $('.loadMore').show();
        }
        this.CookieService.set('favouriteURL', this.next_page_url);
      }
    });
  }

  ngOnInit() {
  }

}
