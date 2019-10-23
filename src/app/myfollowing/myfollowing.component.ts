import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CategoriesService } from '../services/categories/categories.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscriber } from 'rxjs';
import * as $ from 'jquery';
import { NgxMasonryOptions } from 'ngx-masonry';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PostsService } from '../services/posts/posts.service';
import { EmbedVideoService } from 'ngx-embed-video';
import { LoginService } from '../services/login/login.service';
import { PageService } from '../services/page/page.service';
import { SEOservicesService } from '../services/seoservices.service';

@Component({
  selector: 'myfollowing',
  templateUrl: './myfollowing.component.html',
  styleUrls: ['./myfollowing.component.css']
})
export class MyfollowingComponent implements OnInit {
  catpage = [];
  limit;
  url;
  followid;
  morepages = [];
  categoryList = [];
  morepage = [];
  next_page_url;
  subMenuData = [];
  value;
  getdata;
  catname;
  follow_page;
  following_page;
  category_id;
  follow = {
    page_id: ""
  }
  pageData: any;
  alertnodata;
  catrgory_name;
  alertmessage;
  myfollowarry = [];
  message: any;
  date; datefuture; currentdate; getdate;
  constructor(private seoservice: SEOservicesService, private categoryservice: CategoriesService, private Router: Router, private route: ActivatedRoute, private CookieService: CookieService, private pages: PageService) {
    this.seoservice.updateTitle();
    $('body').removeClass('side-menu-active');
    this.pageuserfollow();
  }

  pageuserfollow() {
    this.pages.pageuserfollow().subscribe(data => {
      if (data.status_code == "200") {
        this.catpage = data.data.data;
        if (this.catpage.length == 0) {
          this.message = "Your Following Pages Not Found";
        } else {
        this.next_page_url = data.data.next_page_url;
        if (this.next_page_url == null) {
          // this.message = "Your Following Pages Not Found";
        } else {
          $('.loadMore').show();
        }
        this.CookieService.set('followingnextURL', this.next_page_url);
        // console.log(this.next_page_url);
        for (var i = 0; i < this.catpage.length; i++) {
          if (this.catpage[i].page != null) {
            this.date = this.catpage[i].created_at;
            this.datefuture = new Date(this.date);
            this.currentdate = new Date();
            this.date = this.catpage[i].created_at;
            var d = new Date(this.date);
            this.getdate = d.toDateString();
            this.catpage[i].created_at = this.getdate.slice(4, 15);
            this.myfollowarry.push(this.catpage[i]);
          }
        }
      }
      };
    });
  }


  fetchNextfollowing() {
    var req = this.CookieService.get('followingnextURL');
    const fd = new FormData();
    fd.append("res", '');
    this.pages.pagecategoryspagination(fd,req).subscribe(resp => {
      if (resp.status_code == "200") {
        let pagefeedres = resp.data.data;
        if (pagefeedres.length == 0) {
          this.message = "Your Following Pages Not Found";
        } else {
          for (var i = 0; i < pagefeedres.length; i++) {
            if (pagefeedres[i].page != null) {
              this.date = pagefeedres[i].created_at;
              this.datefuture = new Date(this.date);
              this.currentdate = new Date();
              this.date = pagefeedres[i].created_at;
              var d = new Date(this.date);
              this.getdate = d.toDateString();
              pagefeedres[i].created_at = this.getdate.slice(4, 15);
              // this.myfollowarry.push(pagefeedres[i]);
              this.myfollowarry = this.myfollowarry.concat(pagefeedres[i]);
            }
          }
          this.next_page_url = resp.data.next_page_url;
          if (this.next_page_url == null) {
            $('.loadMore').hide();
          } else {
            $('.loadMore').show();
          }
          this.CookieService.set('followingnextURL', this.next_page_url);
        }
      }
    });
  }

  following(cat, index) {
    var reqbody = {
      page_id: cat.page_id,
    }
    this.pages.following(reqbody).subscribe(data => {
      if (data.status_code == "201") {
        console.log(index);
        this.myfollowarry.splice(index, 1);
      }
    });
  }


  ngOnInit() {
  }

}
