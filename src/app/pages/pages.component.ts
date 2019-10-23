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
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SEOservicesService } from '../services/seoservices.service';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  catpage = [];
  limit;
  url;
  subid;
  followid;
  getdate
  morepages = [];
  categoryList = [];
  date;
  morepage = [];
  next_page_url;
  subMenuData = [];
  value;
  getdata;
  catname;
  follow_page;
  datefuture;
  following_page;
  hidepage;
  isLoggedIn: any;
  category_id;
  currentdate;
  follow_data: any;
  follow = {
    page_id: ""
  }
  serach = {
    pagename: ""
  }
  alertnodata;
  catrgory_name;
  alertmessage;
  followingpage;
  loggedInUserId;
  searchdata: any;
  constructor(private seoservice: SEOservicesService, private categoryservice: CategoriesService, private spinner: NgxSpinnerService, private Router: Router, private route: ActivatedRoute, private CookieService: CookieService, private pages: PageService) {
    this.seoservice.updateTitle();
    $('body').removeClass('side-menu-active');
    this.loggedInUserId = this.CookieService.get('id');
    localStorage.setItem("following", "following");
    this.followingpage = window.location.href;
   // console.log(this.followingpage)
    this.pagecategorys();
    this.GetCategory();
    this.limit = 1;
  }

  pagecategorys() {
    this.spinner.show();
    this.pages.pagecategorys().subscribe(data => {
      if (data.status_code == "200") {
        this.spinner.hide();
        this.catpage = data.data.data;
        // console.log(this.catpage);
        for (var i = 0; i < this.catpage.length; i++) {
          // get total seconds between the times
          this.date = this.catpage[i].created_at;
          var d = new Date(this.date);
          this.getdate = d.toDateString();
          // console.log(this.getdate);
          this.catpage[i].created_at = this.getdate.slice(4, 15);
          //  console.log(this.catpage[i].created_at);
        }

        this.next_page_url = data.data.next_page_url;
        // console.log(this.next_page_url);
        var res = this.next_page_url;
        this.hidepage = res.slice(32, 37);

      }
    });
  }

  //search
  onKeyUp(pagename) {
    var req = {
      "title": pagename
    }
    this.pages.onKeyUp(req).subscribe(data => {
      if (data.status_code == "200") {
        this.spinner.hide();
        this.catpage = data.data;
        if (this.catpage.length == 0) {
          this.searchdata = 'No results found';
        } else {
         // console.log(this.catpage);
          for (var i = 0; i < this.catpage.length; i++) {
            // if(this.catpage){

            // }
            this.date = this.catpage[i].created_at;
            this.datefuture = new Date(this.date);
            this.currentdate = new Date();
            // get total seconds between the times
            this.date = this.catpage[i].created_at;
            var d = new Date(this.date);
            this.getdate = d.toDateString();
            // console.log(this.getdate);
            this.catpage[i].created_at = this.getdate.slice(4, 15);
            // console.log(this.catpage[i].created_at);
          }

          this.next_page_url = data.data.next_page_url;
         // console.log(this.next_page_url);
          var res = this.next_page_url;
          this.hidepage = res.slice(32, 37);
        }
      }
    });
  }
  getPageFollowStatus(cat, id) {
    // var item = cat.follow.find(item => item.user_id == this.CookieService.get('id'));
    // console.log(item);
    if (cat.page_follow_user != null) {
      $('.pagesfollow' + id).addClass('active');
      return 'Following';
    } else {
      $('.pagesfollow' + id).removeClass('active');
      return 'Follow';
    }
  }

  GetCategory() {
    this.spinner.show();
    this.categoryservice.Getcategory().subscribe(data => {
      //   sessionStorage.setItem('id', this.id);
      if (data.status_code == 200) {
        this.spinner.hide();
        this.categoryList = data.data;
        // console.log(this.categoryList);
      }
    });
  }
  getpagesforcat(id) {
    this.spinner.show();
  //  console.log(id);
    //this.getdata = event.target.value;
    var index = this.categoryList.findIndex(function (item, i) {
      return item.id == id;
    });
    this.catrgory_name = this.categoryList[index].category_name;
    this.getdata = this.categoryList[index].id;
    this.subMenuData = this.categoryList[index].subcategories;
    // console.log(this.subMenuData);
    this.alertnodata = false;
    this.spinner.hide();
  }
  getpagesubforcat(event) {
    this.spinner.show();
    this.subid = event.target.value
  //  console.log(event.target.value);
    const fd = new FormData();
    fd.append("category_id", this.getdata);
    fd.append("subcategory_id", event.target.value);
    localStorage.setItem("page_categoryid", this.getdata);
    localStorage.setItem("page_subcatgoryid", event.target.value);
    localStorage.setItem("value", "pagesfollow");
    this.pages.getpagesubforcat(fd).subscribe(data => {
      //   sessionStorage.setItem('id', this.id);
      if (data.status_code == "200") {
        this.spinner.hide();
        this.catpage = data.data.data;
        this.next_page_url = data.data.next_page_url;
       // console.log(this.next_page_url);
        for (var i = 0; i < this.catpage.length; i++) {
          this.date = this.catpage[i].created_at;
          this.datefuture = new Date(this.date);
          this.currentdate = new Date();
          // get total seconds between the times
          this.date = this.catpage[i].created_at;
          var d = new Date(this.date);
          this.getdate = d.toDateString();
          // console.log(this.getdate);
          this.catpage[i].created_at = this.getdate.slice(4, 15);
          // console.log(this.catpage[i].created_at);
        }
        if (this.catpage.length == 0) {
          this.alertnodata = true;
          this.alertmessage = "No pages avilable in this"
        }
      };
    });
  }


  following(cat, index) {
    if (this.CookieService.get("isAuthenticated") == "true") {
      // console.log(cat);
      var reqbody = {
        page_id: cat.id,
      }
      this.pages.following(reqbody).subscribe(data => {
        if (data.status_code == '201') {
          this.follow_data = data.data;
          this.follow_data.page_follow_user
          // this.follow_data.follow_count
          this.catpage[index].pagefollow_count = this.follow_data.follow_count;
          this.catpage[index].page_follow_user = this.follow_data.page_follow_user;
        }

      });
    } else {
      this.Router.navigate(['login']);
      this.CookieService.set('afterLoginURL', JSON.stringify('pages'));
    }
  }

  onScroll() {
    this.url = this.next_page_url;
    const fd = new FormData();
    fd.append("res", '');
    this.pages.pagecategoryspagination(fd,this.url).subscribe(data => {
      if (data.status_code == "200") {
        // this.postsdata = this.postsdata.concat(data.data.data);
        this.morepage = data.data.data;
        this.next_page_url = data.data.next_page_url;
        // console.log(this.next_page_url);
        for (var i = 0; i < this.morepage.length; i++) {
          // this.image = this.postsdata[i].images[0].path;
        }
        this.catpage = this.catpage.concat(this.morepage);
        for (var i = 0; i < this.catpage.length; i++) {
          this.date = this.catpage[i].created_at;
          this.datefuture = new Date(this.date);
          this.currentdate = new Date();
          // get total seconds between the times
          this.date = this.catpage[i].created_at;
          var d = new Date(this.date);
          this.getdate = d.toDateString();
          // console.log(this.getdate);
          this.catpage[i].created_at = this.getdate.slice(4, 15);
          // console.log(this.catpage[i].created_at);
        }

        // console.log(this.catpage);
      }


    });

  }



  ngOnInit() {
    this.alertnodata = false;
  }

}
