
import { Component, OnInit, ViewChild, ElementRef, HostListener, Output, EventEmitter, } from '@angular/core';
import { CategoriesService } from '../services/categories/categories.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServicesService } from '../services/services.service';
import { Subscriber } from 'rxjs';
import * as $ from 'jquery';
import { NgxMasonryOptions, NgxMasonryComponent, NgxMasonryModule, NgxMasonryDirective } from 'ngx-masonry';
import { Masonry, MasonryGridItem } from 'ng-masonry-grid';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PostsService } from '../services/posts/posts.service';
import { EmbedVideoService } from 'ngx-embed-video';
import { LoginService } from '../services/login/login.service';
import { TrendingService } from '../services/trending/trending.service';
import { SEOservicesService } from '../services/seoservices.service';

@Component({
  selector: 'recentactivity',
  templateUrl: './recentactivity.component.html',
  styleUrls: ['./recentactivity.component.css']
})
export class RecentactivityComponent implements OnInit {
  postsdata = [];
  titlestrg;
  date;
  getdate;
  profilepic;
  datefuture;
  currentdate;
  nodata;
  thumbnail: any;
  posDate: any;
  constructor(private seoservice: SEOservicesService, private trendingservice: TrendingService, private Router: Router, private CookieService: CookieService, private categoryservice: CategoriesService, private spinner: NgxSpinnerService, private postservice: PostsService, private embedService: EmbedVideoService, private sanitizer: DomSanitizer, private loginservice: LoginService) {
    this.seoservice.updateTitle();
    $('body').removeClass('side-menu-active');
    this.profilepic = this.CookieService.get('profile_pic');
    // console.log(this.profilepic);
    this.resentactivity();
  }

  resentactivity() {
    this.trendingservice.resentactivity().subscribe(resp => {
      if (resp.status_code == "200") {
        this.postsdata = resp.data;
        // console.log(this.postsdata);
        for (var i = 0; i < this.postsdata.length; i++) {
          if (this.postsdata[i].post == null) {
            this.nodata = "No Data Found"
          } else {
            this.titlestrg = this.postsdata[i].post.title;
            var res = this.titlestrg.slice(0, 40);
            this.postsdata[i].post.title = res;
            if (this.postsdata[i].postlikes_count == "0") {
              this.postsdata[i].postlikes_count = "";
            }
            if (this.postsdata[i].postyvideos.length != 0) {
              // console.log(this.postsdata[i].postyvideos)
              this.embedService
                .embed_image(
                  this.postsdata[i].postyvideos[0].path,
                  { image: 'mqdefault' }
                )
                .then(res => {
                  this.thumbnail = res.html;
                  // console.log(this.thumbnail);
                });
            }
            this.date = this.postsdata[i].post.created_at;
            this.postsdata[i].post.created_at = new Date(this.date);
            this.currentdate = new Date();
            // get total seconds between the times
            this.date = this.postsdata[i].post.created_at;
            var d = new Date(this.date);
            this.getdate = d.toDateString();
            // console.log(this.getdate);
            this.postsdata[i].post.created_at = this.getdate.slice(4, 15);
            // console.log(this.postsdata[i].post.created_at);

            this.posDate = this.postsdata[i].updated_at + '.000Z';
            this.datefuture = new Date(this.posDate.replace(' ', 'T'));
            // get total seconds between the times
            // console.log(this.date);
            // console.log(this.datefuture);
            // console.log(this.currentdate);
            var diffInSeconds = Math.abs(this.datefuture - this.currentdate) / 1000;
            var days = Math.floor(diffInSeconds / 60 / 60 / 24);
            var hours = Math.floor(diffInSeconds / 60 / 60 % 24);
            var minutes = Math.floor(diffInSeconds / 60 % 60);
            var seconds = Math.floor(diffInSeconds % 60);
            var milliseconds = Math.round((diffInSeconds - Math.floor(diffInSeconds)) * 1000);
            if (days != 0) {
              if (days > 1) {
                this.postsdata[i].updated_at = days + ' days ago';
              } else {
                this.postsdata[i].updated_at = days + ' day ago';
              }
            } else if (hours != 0 && days == 0) {
              if (hours > 1) {
                if (minutes > 50) {
                  var Hours = hours + 1;
                  this.postsdata[i].updated_at = Hours + ' hours ago';
                } else {
                  this.postsdata[i].updated_at = hours + ' hours ago';
                }
              } else {
                this.postsdata[i].updated_at = hours + ' hour ago';
              }
            } else if (minutes != 0 && hours == 0) {
              if (minutes > 1) {
                if (seconds > 50) {
                  var Minutes = minutes + 1;
                  this.postsdata[i].updated_at = Minutes + ' minutes ago';
                } else {
                  this.postsdata[i].updated_at = minutes + ' minutes ago';
                }
              } else {
                this.postsdata[i].updated_at = minutes + ' minute ago';
              }
            } else if (seconds != 0 && minutes == 0 && hours == 0) {
              if (seconds > 1) {
                if (milliseconds > 50) {
                  var Seconds = seconds + 1;
                  this.postsdata[i].updated_at = Seconds + ' seconds ago';
                } else {
                  this.postsdata[i].updated_at = seconds + ' seconds ago';
                }
              } else {
                this.postsdata[i].updated_at = seconds + ' second ago';
              }
            }

          }
        }
      };
    });
  }

  ngOnInit() {

  }

}

