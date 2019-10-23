import { Component, OnInit, ViewChild, ElementRef, HostListener, Output, EventEmitter, asNativeElements } from '@angular/core';
import { CategoriesService } from '../services/categories/categories.service';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServicesService } from '../services/services.service';
import { Subscription } from 'rxjs';
import { Observable } from "rxjs";
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
import * as FileSaver from 'file-saver';
import { MyfavouritesService } from '../services/favourites/myfavourites.service';
import { SharedserviceService } from '../services/sharedservice.service';
import { SEOservicesService } from '../services/seoservices.service';

@Component({
  selector: 'home',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  postsdata = [];
  whatsappLink: any;
  showpoll: any;
  showresult: any;
  naturalHeight: any;
  naturalWidth: any;
  postlikes;
  moredata = [];
  trendarray = [];
  length;
  shareLink: any;
  titlestrg;
  obj: any[];
  showload;
  arryPost: any[];
  @ViewChild('Single_post') Single_post: ElementRef;
  @ViewChild('loginpopup') loginpopup: ElementRef;
  @ViewChild('responsePOPUP') responsePOPUP: ElementRef;
  data = [];
  assets;
  _masonry: Masonry;
  // masonryItems: any[]; // NgMasonryGrid Grid item list
  // public masonryOptions: NgxMasonryOptions = {
  //   transitionDuration: '0.2s',
  //   horizontalOrder: true
  // };
  loginInfo = {
    mobile: "",
    password: ''
  }
  regInfo = {
    nick_name: "",
    mobile: "",
    password: ""
  }
  otp = {
    otpNumber: '', otpemail: '', otppassword: '', otptype: ''
  }
  counter;
  post_single_title: any;
  trenddata = [];
  limit;
  message;
  posDate;
  nodata;
  loginshow;
  redheart;
  blueheart;
  order: string = 'id';
  datefuture;
  currentdate;
  categoriesID;
  likes;
  yt_iframe_html: any;
  iframevideo;
  paddings;
  img;
  heights;
  fullyloaded;
  clearshow;
  postimages: any;
  postyvideos: any;
  pageDetails: any;
  postimagesCount: any;
  page_ID: any;
  page_name: any;
  page_icon: any;
  postcomment_count: any;
  postlikes_count: any;
  next_page_url: any;
  postid: any;
  commentInfo = {
    comment: ''
  }
  replyInfo = {
    comment: '',
    parent_id: ''
  }
  editInfo = {
    comment: ''
  }
  subreplyInfo = {
    comment: ''
  }
  subeditInfo = {
    comment: ''
  }
  youtubeimage: any;
  NextPageURL: any;
  template: string = `<img class="loader-img" src="assets/img/loading.gif" />`;
  postConfigs = { "slidesToShow": 1, "rows": 1, "infinite": true, "autoplay": true, "autoplaySpeed": 2000, "slidesToScroll": 1, "arrows": false, "dots": false };
  slideConfig = {
    "slidesToShow": 5, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 999, "arrows": false, responsive: [{

      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        infinite: true
      }

    }, {

      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        dots: false
      }

    }, {

      breakpoint: 300,
      settings: "unslick" // destroys slick

    }]
  };
  contentConfig = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 2000, "arrows": false };
  adsConfig = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 2000, "arrows": false };
  baseURL: string;
  isAuthenticated;
  mobileWidth: any;
  mobileparam: any;
  userID: any;
  mediafiles: any;
  postslength: any;
  id: any;
  postData: any;
  postcatstatus: any;
  pageCommentstatus: any;
  page_comment_status: any;
  postviews_count: any;
  feed_published_at: any;
  myfav: any;
  post_title: any;
  post_description: any;
  rssfeed: any;
  CommentData: any[];
  CommentDatas: any;
  CommentLength: any;
  showfavourite: any;
  postcategories_comment_count: any;
  post_comment_status: any;
  postVideos: any;
  postVideosiframe: any;
  postVideoslength: any;
  postIndex: any;
  PostID: any;
  Index: any;
  subscription: Subscription;
  checked: any;
  postAdsPosition: any;
  postAds: any;
  finalarray = [];
  SlickCounter: any;
  notifynextURL: any;
  scrollValue: any;
  constructor(private meta: Meta, private title: Title, private seoservice: SEOservicesService, private sharedservice: SharedserviceService, private myfavourite: MyfavouritesService, private Router: Router, private CookieService: CookieService, private categoryservice: CategoriesService, private spinner: NgxSpinnerService, private postservice: PostsService, private embedService: EmbedVideoService, private sanitizer: DomSanitizer, private loginservice: LoginService) {
    this.seoservice.updateTitle();
    $('body').removeClass('side-menu-active');
    this.baseURL = ServicesService.API_Share_URL;
    this.subscription = this.sharedservice.getResponse().subscribe(data => {
      if (data.status_code == 200) {
        // console.log(data);
        if (data.user_verify == 'Mobile') {
          if (data.type == 1) {
            $('#login').fadeOut(800);
            $('#OTP_section').fadeIn(800);
            this.otp.otpemail = this.loginInfo.mobile;
            this.otp.otppassword = this.loginInfo.password;
            this.otp.otptype = data.type;
          } else if (data.type == 2) {
            $('#register').fadeOut(800);
            $('#OTP_section').fadeIn(800);
            this.otp.otpemail = this.regInfo.mobile;
            this.otp.otppassword = this.regInfo.password;
            this.otp.otptype = data.type;
          }
          this.message = data.message;
          var count = 120,
            timer = setInterval(function () {
              $("#countdown-numbers_login").html(count--);
              if (count == 0) {
                clearInterval(timer);
                $("#countdowns_login").addClass('countreset');
                $("#countdown-numbers_login").html(0);
              }
            }, 1000);
        } else if (data.session_id != '' && data.user_verify == 'Mobile') {
          $("#countdowns").removeClass('countreset');
          $("#countdowns").addClass('resendreset');
          var count = 120, timer = setInterval(function () {
            $("#countdown-numbers").html(count--);
            if (count == 0) {
              clearInterval(timer);
              $("#countdowns").addClass('countreset');
              $("#countdown-numbers").html(0);
            }
          }, 1000);

        } else if (data.data.token != '' && data.data.mobile != '') {
          $("#LoginClose .modal button").click();
          // this.CookieService.set('Login_cookies', '1');
          // this.ngOnInit();
          // this.Router.navigateByUrl('home');
          window.location.reload();
        }
      } else {
        this.message = data.message;
      }
    });
    this.Getallpostdata();
    this.limit = 1;
    this.mobileWidth = screen.width;
    if (this.mobileWidth <= '767') {
      this.mobileparam = 'true';
    } else {
      this.mobileparam = 'false';
    }
    // console.log(this.mobileWidth);
    this.isAuthenticated = this.CookieService.get('isAuthenticated');
    this.userID = this.CookieService.get('id');
    this.categoriesID = JSON.parse(this.CookieService.get('subcategory'));
    // this.reorderItems();
  }

  // remember me //
  toggleVisibility(e) {
    this.checked = e.target.checked;
    // console.log(this.checked);
    if (this.checked == true) {
      localStorage.setItem('mobile', this.loginInfo.mobile);
      localStorage.setItem('password', this.loginInfo.password);
    } else {
      localStorage.removeItem('mobile');
      localStorage.removeItem('password');
    }
  }

  loadshareMetas(type, id, title, image) {
    // console.log(image);
    var text = title;
    var url = this.baseURL + '/share/' + id;
    var message = encodeURIComponent(text) + " - " + encodeURIComponent(url);
    if (type == 'whatsapp') {
      this.shareLink = "whatsapp://send?text=" + message;
      this.Set_Metas(title, image);
      location.href = this.shareLink;
      // loca= this.shareLink;
    } else if (type == 'facebook') {
      var fbmessage = encodeURIComponent(url);
      this.shareLink = "https://www.facebook.com/sharer.php?u=" + fbmessage;
      this.Set_Metas(title, image);
      location.href = this.shareLink;
    } else if (type == 'twitter') {
      var twmessage = encodeURIComponent(url);
      this.shareLink = "https://twitter.com/share?url=" + twmessage;
      this.Set_twitterMetas(title, image);
      location.href = this.shareLink;
    } else {
      this.Set_Metas(title, image);
      location.href = this.shareLink;
    }
  }

  Set_twitterMetas(name, image) {
    this.title.setTitle(name);
    this.meta.updateTag({ name: 'twitter:card', content: "summary" });
    this.meta.updateTag({ name: 'twitter:title', content: name });
    this.meta.updateTag({ name: 'twitter:description', content: name });
    this.meta.updateTag({ name: 'twitter:image', content: image });
  }

  Set_Metas(name, image) {
    this.title.setTitle(name);
    this.meta.updateTag({ property: 'og:title', content: name });
    this.meta.updateTag({ property: 'og:description', content: name });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'image', content: image });
    this.meta.updateTag({ property: 'og:url', content: 'https://www.watnew.com' });
  }


  Getallpostdata = function () {
    const fd = new FormData();
    // var maincatids = JSON.parse(this.CookieService.get('category'));
    var subcatids = JSON.parse(this.CookieService.get('subcategory'));
    for (let q = 0; q < subcatids.length; q++) {
      if (subcatids[q].subcategory_id != undefined && subcatids[q].category_id != undefined) {
        fd.append("posts[" + [q] + "][category_id]", subcatids[q].category_id);
        fd.append("posts[" + [q] + "][subcategory_id]", subcatids[q].subcategory_id);
      }
    }
    this.categoryservice.getpostpagination(fd).subscribe(data => {
      if (data.status_code == 200) {
        this.postsdata = data.data.data;
        this.postslength = this.postsdata;
        if (this.postslength.length != 0) {
          var title = this.postsdata[0];
          this.postAds = data.data.adds_data;
          this.postAdsPosition = data.data.adds_configuration;
          // console.log(this.postAdsPosition);
          // console.log(this.postAds);
          var j = 0;
          var adspostion = 0;
          this.finalarray = [];
          for (let r = 0; r < this.postsdata.length; r++) {
            // this.finalarray = [];
            this.postsdata[r].postadvalue = 0;
            this.finalarray.push(this.postsdata[r]);
            if (this.postAds.length != 0) {
              adspostion++;
              if (adspostion == this.postAdsPosition && j < this.postAds.length) {
                this.postAds[j].postadvalue = 1;
                // console.log(this.liveAdsarray);
                this.finalarray.push(this.postAds[j]);
                j++;
                adspostion = 0;
              }
            }
          }
          // console.log(this.finalarray);
          for (var i = 0; i < this.finalarray.length; i++) {
            if (this.finalarray[i].postadvalue == 0) {
              // this.titlestrg = this.finalarray[i].title;
              if (this.finalarray[i].preview_url == null) {
                let mainTitle = this.finalarray[i].title;
                this.titlestrg = mainTitle.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" style="color:#0064c8;" target="_blank">$1</a> ');
                var loadTitle = this.sanitizer.bypassSecurityTrustHtml(this.titlestrg.replace(/#(\w+)/g, '<a href="/search/%23$1" style="color:#0064c8;" target="_blank">#$1</a>'));
                this.finalarray[i].main_title = loadTitle;
              } else {
                let mainTitle = this.finalarray[i].title;
                this.finalarray[i].main_title = mainTitle;
              }
              // var res = this.titlestrg.slice(0, 85);
              // var res = this.titlestrg;
              // this.finalarray[i].title = res;
              if (this.finalarray[i].type == '2') {
                var pollenddate = this.finalarray[i].post_end_at + '.000Z';
                var poll_ENDDATE = new Date(pollenddate);
                this.posDate = this.finalarray[i].post_end_at + '.000Z';
                this.datefuture = new Date(this.posDate.replace(' ', 'T'));
                this.currentdate = new Date();
                var diffInSeconds = Math.abs(this.datefuture - this.currentdate) / 1000;
                var days = Math.floor(diffInSeconds / 60 / 60 / 24);
                var hours = Math.floor(diffInSeconds / 60 / 60 % 24);
                var minutes = Math.floor(diffInSeconds / 60 % 60);
                var seconds = Math.floor(diffInSeconds % 60);
                var milliseconds = Math.round((diffInSeconds - Math.floor(diffInSeconds)) * 1000);
                if (days != 0) {
                  if (days > 1) {
                    this.finalarray[i].post_end_at = 'This Poll ends in ' + days + ' days';
                  } else {
                    this.finalarray[i].post_end_at = 'This Poll ends in ' + days + ' day';
                  }
                } else if (hours != 0 && days == 0) {
                  if (hours > 1) {
                    if (minutes > 50) {
                      var Hours = hours + 1;
                      this.finalarray[i].post_end_at = 'This Poll ends in ' + Hours + ' hours';
                    } else {
                      this.finalarray[i].post_end_at = 'This Poll ends in ' + hours + ' hours';
                    }
                  } else {
                    this.finalarray[i].post_end_at = 'This Poll ends in ' + hours + ' hour';
                  }
                } else if (minutes != 0 && hours == 0) {
                  if (minutes > 1) {
                    if (seconds > 50) {
                      var Minutes = minutes + 1;
                      this.finalarray[i].post_end_at = 'This Poll ends in ' + Minutes + ' minutes';
                    } else {
                      this.finalarray[i].post_end_at = 'This Poll ends in ' + minutes + ' minutes';
                    }
                  } else {
                    this.finalarray[i].post_end_at = 'This Poll ends in ' + minutes + ' minute';
                  }
                } else if (seconds != 0 && minutes == 0 && hours == 0) {
                  if (seconds > 1) {
                    if (milliseconds > 50) {
                      var Seconds = seconds + 1;
                      this.finalarray[i].post_end_at = 'This Poll ends in ' + Seconds + ' seconds';
                    } else {
                      this.finalarray[i].post_end_at = 'This Poll ends in ' + seconds + ' seconds';
                    }
                  } else {
                    this.finalarray[i].post_end_at = 'This Poll ends in ' + seconds + ' second';
                  }
                }
                let respdata = this.finalarray[i].postvotesusers;
                // console.log(this.finalarray[i].post_end_at);
                // console.log(this.finalarray[i].feed_published_at);
                // console.log(respdata.length);
                if (this.currentdate > poll_ENDDATE) {
                  this.finalarray[i].pollshow = 'showresult';
                  this.finalarray[i].post_end_at = "This Poll is Ended.";
                } else {
                  if (respdata.length != 0) {
                    var item = this.finalarray[i].postvotesusers.find(item => item.user_id == this.CookieService.get('id'));
                  }

                  if (item != undefined) {
                    this.finalarray[i].pollshow = 'showresult';
                  } else {
                    // console.log('Fired');
                    this.finalarray[i].pollshow = 'showpoll';
                  }
                }
              }

              this.posDate = this.finalarray[i].feed_published_at + '.000Z';
              this.datefuture = new Date(this.posDate.replace(' ', 'T'));
              this.currentdate = new Date();
              if (this.finalarray[i].postlikes_count == 0) {
                this.finalarray[i].postlikes_count = '';
              } else {
                this.finalarray[i].postlikes_count = this.finalarray[i].postlikes_count;
              }

              if (this.finalarray[i].postcomment_count == 0) {
                this.finalarray[i].postcomment_count = '';
              } else {
                this.finalarray[i].postcomment_count = this.finalarray[i].postcomment_count;
              }

              if (this.finalarray[i].postviews_count == 0) {
                this.finalarray[i].postviews_count = '';
              } else {
                this.finalarray[i].postviews_count = this.finalarray[i].postviews_count;
              }

              var diffInSeconds = Math.abs(this.datefuture - this.currentdate) / 1000;
              var days = Math.floor(diffInSeconds / 60 / 60 / 24);
              var hours = Math.floor(diffInSeconds / 60 / 60 % 24);
              var minutes = Math.floor(diffInSeconds / 60 % 60);
              var seconds = Math.floor(diffInSeconds % 60);
              var milliseconds = Math.round((diffInSeconds - Math.floor(diffInSeconds)) * 1000);
              if (days != 0) {
                if (days > 1) {
                  this.finalarray[i].feed_published_at = days + ' days ago';
                } else {
                  this.finalarray[i].feed_published_at = days + ' day ago';
                }
              } else if (hours != 0 && days == 0) {
                if (hours > 1) {
                  if (minutes > 50) {
                    var Hours = hours + 1;
                    this.finalarray[i].feed_published_at = Hours + ' hours ago';
                  } else {
                    this.finalarray[i].feed_published_at = hours + ' hours ago';
                  }
                } else {
                  this.finalarray[i].feed_published_at = hours + ' hour ago';
                }
              } else if (minutes != 0 && hours == 0) {
                if (minutes > 1) {
                  if (seconds > 50) {
                    var Minutes = minutes + 1;
                    this.finalarray[i].feed_published_at = Minutes + ' minutes ago';
                  } else {
                    this.finalarray[i].feed_published_at = minutes + ' minutes ago';
                  }
                } else {
                  this.finalarray[i].feed_published_at = minutes + ' minute ago';
                }
              } else if (seconds != 0 && minutes == 0 && hours == 0) {
                if (seconds > 1) {
                  if (milliseconds > 50) {
                    var Seconds = seconds + 1;
                    this.finalarray[i].feed_published_at = Seconds + ' seconds ago';
                  } else {
                    this.finalarray[i].feed_published_at = seconds + ' seconds ago';
                  }
                } else {
                  this.finalarray[i].feed_published_at = seconds + ' second ago';
                }
              }

              // if (this.finalarray[i].yvideos.length != 0) {
              //   this.yt_iframe_html = this.embedService.embed(this.finalarray[i].yvideos[0].path, {
              //     attr: { width: 700, height: 450 }
              //   });
              //   // console.log(this.yt_iframe_html);
              //   if (this.yt_iframe_html.changingThisBreaksApplicationSecurity != undefined) {
              //     this.finalarray[i].yvideos[0].path = this.sanitizer.bypassSecurityTrustHtml(this.yt_iframe_html.changingThisBreaksApplicationSecurity);
              //   } else {
              //     this.finalarray[i].yvideos[0].path = this.yt_iframe_html;
              //   }
              // }

              var count = this.finalarray.length;
              for (let a = 0; a < count; a++) {
                if (this.finalarray[a].postadvalue == 0) {
                  if (this.finalarray[a].yvideos.length !== 0) {
                    this.embedService.embed_image(this.finalarray[a].yvideos[0].path, { image: 'maxresdefault' }).then(res => {
                      // console.log(res.link);
                      this.finalarray[a].yvideos[0].youtubeimage = res.link;
                    });
                  }
                }
              }

              if (this.finalarray[i].videos.length != 0) {
                var pattern = new RegExp('(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))'); // fragment locator
                var id = pattern.test(this.finalarray[i].videos[0].path);
                if (id != true) {
                  this.iframevideo = 'NormalVideo';
                  this.finalarray[i].videos[0].path = this.finalarray[i].videos[0].path;
                }
              }

            }
          }
          this.next_page_url = data.data.next_page_url;
          if (this.next_page_url == 'null') {
            $('.loadSpinner').hide();
            $('#nohomePosts').show();
          } else {
            $('.loadMore').show();
            this.CookieService.set('scrollVal', '0');
            this.CookieService.set('HomePageURL', this.next_page_url);
          }
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 2000);
        } else {
          $('#nohomePosts').show();
        }
      } else {
        this.message = data.message;
        this.responsePOPUP.nativeElement.click();
      }
    });
  }

  // Home Page Pagination //
  onScroll() {
    $('.loadSpinner').show();
    this.scrollValue = this.CookieService.get('scrollVal');
    if (this.scrollValue == '0') {
      this.LoadContent();
    }
  }

  LoadContent() {
    this.notifynextURL = this.CookieService.get('HomePageURL');
    var setScrollval = this.CookieService.set('scrollVal', '1');
    if (this.notifynextURL != null) {
      // this.spinner.show();
      const gh = new FormData();
      var subcatids = JSON.parse(this.CookieService.get('subcategory'));
      for (let q = 0; q < subcatids.length; q++) {
        if (subcatids[q].subcategory_id != undefined && subcatids[q].category_id != undefined) {
          gh.append("posts[" + [q] + "][category_id]", subcatids[q].category_id);
          gh.append("posts[" + [q] + "][subcategory_id]", subcatids[q].subcategory_id);
        }
      }
      var req = this.CookieService.get('HomePageURL');
      this.categoryservice.getnextpostpageination(req, gh).subscribe(data => {
        if (data.status_code == 200) {
          let postpagination = data.data.data;
          let postADS = data.data;
          let adsData = postADS.adds_data;
          var postsnextdata = [];
          if (postpagination.length != 0) {
            var title = postpagination[0];
            var postnextAds = adsData;
            var postnextAdsPosition = postADS.adds_configuration;
            // console.log(this.postAdsPosition);
            // console.log(postnextAds);
            var j = 0;
            var adspostion = 0;
            for (let r = 0; r < postpagination.length; r++) {
              postpagination[r].postadvalue = 0;
              postsnextdata.push(postpagination[r]);
              if (postnextAds.length != 0) {
                adspostion++;
                if (adspostion == postnextAdsPosition && j < postnextAds.length) {
                  postnextAds[j].postadvalue = 1;
                  postsnextdata.push(postnextAds[j]);
                  j++;
                  adspostion = 0;
                }
              }
            }
            for (var i = 0; i < postsnextdata.length; i++) {
              if (postsnextdata[i].postadvalue == 0) {
                if (postsnextdata[i].preview_url == null) {
                  let mainTitle = postsnextdata[i].title;
                  this.titlestrg = mainTitle.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" style="color:#0064c8;" target="_blank">$1</a> ');
                  var loadTitle = this.sanitizer.bypassSecurityTrustHtml(this.titlestrg.replace(/#(\w+)/g, '<a href="/search/%23$1" style="color:#0064c8;" target="_blank">#$1</a>'));
                  postsnextdata[i].main_title = loadTitle;
                } else {
                  let mainTitle = postsnextdata[i].title;
                  postsnextdata[i].main_title = mainTitle;
                }
                if (postsnextdata[i].type == '2') {
                  var pollenddate = postsnextdata[i].post_end_at + '.000Z';
                  var poll_ENDDATE = new Date(pollenddate);
                  this.posDate = postsnextdata[i].post_end_at + '.000Z';
                  this.datefuture = new Date(this.posDate.replace(' ', 'T'));
                  this.currentdate = new Date();
                  var diffInSeconds = Math.abs(this.datefuture - this.currentdate) / 1000;
                  var days = Math.floor(diffInSeconds / 60 / 60 / 24);
                  var hours = Math.floor(diffInSeconds / 60 / 60 % 24);
                  var minutes = Math.floor(diffInSeconds / 60 % 60);
                  var seconds = Math.floor(diffInSeconds % 60);
                  var milliseconds = Math.round((diffInSeconds - Math.floor(diffInSeconds)) * 1000);
                  if (days != 0) {
                    if (days > 1) {
                      postsnextdata[i].post_end_at = 'This Poll ends in ' + days + ' days';
                    } else {
                      postsnextdata[i].post_end_at = 'This Poll ends in ' + days + ' day';
                    }
                  } else if (hours != 0 && days == 0) {
                    if (hours > 1) {
                      if (minutes > 50) {
                        var Hours = hours + 1;
                        postsnextdata[i].post_end_at = 'This Poll ends in ' + Hours + ' hours';
                      } else {
                        postsnextdata[i].post_end_at = 'This Poll ends in ' + hours + ' hours';
                      }
                    } else {
                      postsnextdata[i].post_end_at = 'This Poll ends in ' + hours + ' hour';
                    }
                  } else if (minutes != 0 && hours == 0) {
                    if (minutes > 1) {
                      if (seconds > 50) {
                        var Minutes = minutes + 1;
                        postsnextdata[i].post_end_at = 'This Poll ends in ' + Minutes + ' minutes';
                      } else {
                        postsnextdata[i].post_end_at = 'This Poll ends in ' + minutes + ' minutes';
                      }
                    } else {
                      postsnextdata[i].post_end_at = 'This Poll ends in ' + minutes + ' minute';
                    }
                  } else if (seconds != 0 && minutes == 0 && hours == 0) {
                    if (seconds > 1) {
                      if (milliseconds > 50) {
                        var Seconds = seconds + 1;
                        postsnextdata[i].post_end_at = 'This Poll ends in ' + Seconds + ' seconds';
                      } else {
                        postsnextdata[i].post_end_at = 'This Poll ends in ' + seconds + ' seconds';
                      }
                    } else {
                      postsnextdata[i].post_end_at = 'This Poll ends in ' + seconds + ' second';
                    }
                  }
                  let respdata = postsnextdata[i].postvotesusers;
                  // console.log(postsnextdata[i].post_end_at);
                  // console.log(postsnextdata[i].feed_published_at);
                  // console.log(respdata.length);
                  if (this.currentdate > poll_ENDDATE) {
                    postsnextdata[i].pollshow = 'showresult';
                    postsnextdata[i].post_end_at = "This Poll is Ended.";
                  } else {
                    if (respdata.length != 0) {
                      var item = postsnextdata[i].postvotesusers.find(item => item.user_id == this.CookieService.get('id'));
                    }

                    if (item != undefined) {
                      postsnextdata[i].pollshow = 'showresult';
                    } else {
                      // console.log('Fired');
                      postsnextdata[i].pollshow = 'showpoll';
                    }
                  }
                }
                this.posDate = postsnextdata[i].feed_published_at + '.000Z';
                this.datefuture = new Date(this.posDate.replace(' ', 'T'));
                this.currentdate = new Date();
                if (postsnextdata[i].postlikes_count == 0) {
                  postsnextdata[i].postlikes_count = '';
                } else {
                  postsnextdata[i].postlikes_count = postsnextdata[i].postlikes_count;
                }

                if (postsnextdata[i].postcomment_count == 0) {
                  postsnextdata[i].postcomment_count = '';
                } else {
                  postsnextdata[i].postcomment_count = postsnextdata[i].postcomment_count;
                }

                if (postsnextdata[i].postviews_count == 0) {
                  postsnextdata[i].postviews_count = '';
                } else {
                  postsnextdata[i].postviews_count = postsnextdata[i].postviews_count;
                }

                var diffInSeconds = Math.abs(this.datefuture - this.currentdate) / 1000;
                var days = Math.floor(diffInSeconds / 60 / 60 / 24);
                var hours = Math.floor(diffInSeconds / 60 / 60 % 24);
                var minutes = Math.floor(diffInSeconds / 60 % 60);
                var seconds = Math.floor(diffInSeconds % 60);
                var milliseconds = Math.round((diffInSeconds - Math.floor(diffInSeconds)) * 1000);
                if (days != 0) {
                  if (days > 1) {
                    postsnextdata[i].feed_published_at = days + ' days ago';
                  } else {
                    postsnextdata[i].feed_published_at = days + ' day ago';
                  }
                } else if (hours != 0 && days == 0) {
                  if (hours > 1) {
                    if (minutes > 50) {
                      var Hours = hours + 1;
                      postsnextdata[i].feed_published_at = Hours + ' hours ago';
                    } else {
                      postsnextdata[i].feed_published_at = hours + ' hours ago';
                    }
                  } else {
                    postsnextdata[i].feed_published_at = hours + ' hour ago';
                  }
                } else if (minutes != 0 && hours == 0) {
                  if (minutes > 1) {
                    if (seconds > 50) {
                      var Minutes = minutes + 1;
                      postsnextdata[i].feed_published_at = Minutes + ' minutes ago';
                    } else {
                      postsnextdata[i].feed_published_at = minutes + ' minutes ago';
                    }
                  } else {
                    postsnextdata[i].feed_published_at = minutes + ' minute ago';
                  }
                } else if (seconds != 0 && minutes == 0 && hours == 0) {
                  if (seconds > 1) {
                    if (milliseconds > 50) {
                      var Seconds = seconds + 1;
                      postsnextdata[i].feed_published_at = Seconds + ' seconds ago';
                    } else {
                      postsnextdata[i].feed_published_at = seconds + ' seconds ago';
                    }
                  } else {
                    postsnextdata[i].feed_published_at = seconds + ' second ago';
                  }
                }

                var count = postsnextdata.length;
                for (let a = 0; a < count; a++) {
                  if (postsnextdata[a].postadvalue == 0) {
                    if (postsnextdata[a].yvideos.length !== 0) {
                      this.embedService.embed_image(postsnextdata[a].yvideos[0].path, { image: 'maxresdefault' }).then(res => {
                        // console.log(res.link);
                        postsnextdata[a].yvideos[0].youtubeimage = res.link;
                      });
                    }
                  }
                }

                if (postsnextdata[i].videos.length != 0) {
                  var pattern = new RegExp('(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))'); // fragment locator
                  var id = pattern.test(postsnextdata[i].videos[0].path);
                  if (id != true) {
                    this.iframevideo = 'NormalVideo';
                    postsnextdata[i].videos[0].path = postsnextdata[i].videos[0].path;
                  }
                }

              }

            }
            this.finalarray = this.finalarray.concat(postsnextdata);
            $('.loadSpinner').hide();
            console.log(this.finalarray);
            this.postslength = postsnextdata;
            this.next_page_url = data.data.next_page_url;
            if (this.next_page_url == 'null') {
              $('.loadSpinner').hide();
              $('#nohomePosts').show();
            } else {
              $('.loadMore').show();
              this.CookieService.set('scrollVal', '0');
              this.CookieService.set('HomePageURL', this.next_page_url);
            }
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 2000);
          } else {
            $('#nohomePosts').show();
          }
        } else {
          this.message = data.message;
          this.responsePOPUP.nativeElement.click();
        }
      });
    }
  }

  // post likes //
  postlike(id, i) {
    if (this.CookieService.get("isAuthenticated") == "true") {
      var reqbody = {
        post_id: id,
      }
      // console.log(i);
      this.postservice.postlike(reqbody).subscribe(data => {
        $(".heart_icon" + i).toggleClass("is-active");
        // console.log(data);
        if (data.status_code == "200") {
          this.postlikes = data.postlikes;
          if (this.postlikes == "0") {
            $('.heart_filled_' + i).removeClass('fa-heart');
            $('.heart_filled_' + i).addClass('fa-heart-o');
            this.finalarray[i].postlikes_count = "";
            this.postlikes_count = "";
          } else {
            $('.heart_filled_' + i).removeClass('fa-heart-o');
            $('.heart_filled_' + i).addClass('fa-heart');
            this.finalarray[i].postlikes_count = data.postlikes;
            this.postlikes_count = data.postlikes;
          }
        }
      });
    } else {
      this.PostID = id;
      this.Index = i;
      // this.Router.navigate(['login']);
      this.CookieService.set('favouriteID', JSON.stringify(this.PostID));
      this.loginpopup.nativeElement.click();
      this.CookieService.set('afterLoginURL', JSON.stringify('home'));
    }
  }

  // media download //
  mediaDownload(imgFile, metaimage) {
    if (metaimage == null && imgFile.length == '0') {
      alert('No media to download');
    } else if (metaimage == null) {
      // console.log(metaimage);
      for (let r = 0; r < imgFile.length; r++) {
        this.mediafiles = this.sanitizer.bypassSecurityTrustHtml(imgFile[r].path);
        var res = this.mediafiles.changingThisBreaksApplicationSecurity;
        FileSaver.saveAs(res, "mediafiles");
      }
    } else if (metaimage != null) {
      // console.log(metaimage);
      this.mediafiles = this.sanitizer.bypassSecurityTrustHtml(metaimage);
      var res = this.mediafiles.changingThisBreaksApplicationSecurity;
      FileSaver.saveAs(res, "mediafiles");
    }
  }

  // poll submit //
  pollclick(option_id, post_id, page_id, index) {
    if (this.CookieService.get("isAuthenticated") == "true") {
      const pollrequest = new FormData();
      pollrequest.append('post_id', post_id);
      pollrequest.append('option_id', option_id);
      pollrequest.append('page_id', page_id);
      this.postservice.submitPoll(pollrequest).subscribe(data => {
        if (data.status_code == 200) {
          this.finalarray[index].postoptions = data.data.postoptions;
          var respData = data.data.postvotesusers;
          // console.log(respData);
          if (respData.length != 0) {
            var item = respData.find(item => item.user_id == this.userID);
          }
          console.log(item);
          if (item != undefined) {
            this.finalarray[index].pollshow = 'showresult';
          } else {
            this.finalarray[index].pollshow = 'showpoll';
          }

        }
      });
    } else {
      this.Router.navigate(['login']);
      this.CookieService.set('afterLoginURL', JSON.stringify('home'));
    }
  }


  postcomment(id, index) {
    this.loadPost(id, index);
  }

  // postdetail popup //
  loadPost(postID, index) {
    this.postimages = '';
    this.postVideosiframe = '';
    this.postVideoslength = '';
    this.postVideos = '';
    this.postyvideos = '';
    this.id = postID;
    this.spinner.show();
    var request = {
      id: postID
    }
    this.postservice.postsviews(request).subscribe(data => {
      if (data.status_code == '200') {
        // console.log(this.adsarray);
      }
    });
    this.mypostdetails(this.id, index);
    this.getComments();
  }

  // postdetails //
  mypostdetails(PID, indexID) {
    var req = {
      "id": PID,
    }
    this.postservice.mypostdetails(req).subscribe(resp => {
      if (resp.status_code == '200') {
        this.postData = resp.data;
        this.postIndex = indexID;
        this.postid = this.postData.id;
        this.myfav = this.postData.my_favourite;
        this.rssfeed = this.postData.rss_feed;
        this.postcatstatus = this.postData.postcategories;
        this.pageCommentstatus = this.postData.page.courtesy_status;
        this.page_comment_status = this.postData.page.page_comment_status;
        this.postcategories_comment_count = this.postData.postcategories_comment_count;
        this.post_comment_status = this.postData.post_comment_status;
        this.pageDetails = this.postData.page;
        this.page_ID = this.pageDetails.id;
        this.page_name = this.pageDetails.name;
        this.page_icon = this.pageDetails.page_icon;

        // console.log(this.postcatstatus);

        if (this.postData.postlikes_count == 0) {
          this.postData.postlikes_count = '';
        } else {
          this.postlikes_count = this.postData.postlikes_count;
        }

        if (this.postData.postcomment_count == 0) {
          this.postcomment_count = '';
        } else {
          this.postcomment_count = this.postData.postcomment_count;
        }

        if (this.postData.postviews_count == 0) {
          this.postviews_count = '';
        } else {
          this.postviews_count = this.postData.postviews_count;
          this.finalarray[indexID].postviews_count = this.postData.postviews_count;
        }
        this.post_single_title = this.postData.title;
        // this.postviews_count = this.postData.postviews_count;
        // this.postlikes_count = this.postData.postlikes_count;
        // this.postcomment_count = this.postData.postcomment_count;
        // if (this.postData.title.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" target="_blank">$1</a> ')) {
        var post_title = this.postData.title.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" target="_blank">$1</a> ');
        // } else {
        //   this.postData.title = this.sanitizer.bypassSecurityTrustHtml(this.postData.title.replace(/#(\w+)/g, '<a href="#">#$1</a>'));
        // }
        this.postData.title = this.sanitizer.bypassSecurityTrustHtml(post_title.replace(/#(\w+)/g, '<a href="/search/%23$1" target="_blank">#$1</a>'));

        this.post_title = this.postData.title;
        // this.postData.title = this.postData.title.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
        if (this.postData.description != null) {
          var post_desc = this.postData.description.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" target="_blank">$1</a> ');

          this.postData.description = this.sanitizer.bypassSecurityTrustHtml(post_desc.replace(/#(\w+)/g, '<a href="/search/%23$1" target="_blank">#$1</a>'));
          this.post_description = this.postData.description
        }
        this.posDate = this.postData.feed_published_at + '.000Z';
        this.datefuture = new Date(this.posDate.replace(' ', 'T'));
        this.currentdate = new Date();
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
            this.postData.feed_published_at = days + ' days ago';
          } else {
            this.postData.feed_published_at = days + ' day ago';
          }
        } else if (hours != 0 && days == 0) {
          if (hours > 1) {
            if (minutes > 50) {
              var Hours = hours + 1;
              this.postData.feed_published_at = Hours + ' hours ago';
            } else {
              this.postData.feed_published_at = hours + ' hours ago';
            }
          } else {
            this.postData.feed_published_at = hours + ' hour ago';
          }
        } else if (minutes != 0 && hours == 0) {
          if (minutes > 1) {
            if (seconds > 50) {
              var Minutes = minutes + 1;
              this.postData.feed_published_at = Minutes + ' minutes ago';
            } else {
              this.postData.feed_published_at = minutes + ' minutes ago';
            }
          } else {
            this.postData.feed_published_at = minutes + ' minute ago';
          }
        } else if (seconds != 0 && minutes == 0 && hours == 0) {
          if (seconds > 1) {
            if (milliseconds > 50) {
              var Seconds = seconds + 1;
              this.postData.feed_published_at = Seconds + ' seconds ago';
            } else {
              this.postData.feed_published_at = seconds + ' seconds ago';
            }
          } else {
            this.postData.feed_published_at = seconds + ' second ago';
          }
        }
        this.feed_published_at = this.postData.feed_published_at;
        this.postimages = this.postData.images;
        this.postimagesCount = this.postimages.length;
        this.postVideoslength = this.postData.videos;
        if (this.postData.yvideos.length != 0) {
          this.yt_iframe_html = this.embedService.embed(this.postData.yvideos[0].path, {
            attr: { width: 600, height: 400 }
          });
          // console.log(this.yt_iframe_html);
          this.postData.yvideos[0].path = this.sanitizer.bypassSecurityTrustHtml(this.yt_iframe_html.changingThisBreaksApplicationSecurity);
          this.postyvideos = this.postData.yvideos[0].path;
        }
        if (this.postData.videos.length != 0) {
          var pattern = new RegExp('(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))'); // fragment locator
          var id = pattern.test(this.postData.videos[0].path);
          if (id == true) {
            var res = this.postData.videos[0].path.replace("'\'", "");
            // var regEx = /(width|height)=["']([^"']*)["']/gi;
            // var resconvert = res.replace(regEx);
            // var result = resconvert.replace('undefined undefined', 'width="100%" height="550"');
            // // console.log(result);
            this.iframevideo = 'iframeVideo';
            this.postData.videos[0].path = this.sanitizer.bypassSecurityTrustHtml(res);
            this.postVideosiframe = this.postData.videos[0].path;
          } else {
            this.iframevideo = '';
            this.postData.videos[0].path = this.postData.videos[0].path;
            this.postVideos = this.postData.videos[0].path;
          }
        }
        this.Single_post.nativeElement.click();
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 2000);
        // this.finalarray[i].feed_published_at;
        // console.log(this.finalarray[i].created_at);
      } else {
        alert('Error Occured. Please refresh the page.');
      }
    });

  }

  // get comments //
  getComments() {
    $('.subcomment_list').trigger('click');
    var request = {
      post_id: this.id
    }
    this.postservice.getComments(request).subscribe(data => {
      if (data.status_code == '200') {
        this.CommentDatas = data.post_comments;
        this.CommentData = this.CommentDatas.data;
        this.CommentLength = this.CommentData.length;
        this.NextPageURL = this.CommentDatas.next_page_url;
        // console.log(this.NextPageURL);
        localStorage.setItem('NextPageURL', this.NextPageURL);
      }
    });
  }

  // fetch comments //
  fetchNextCommnets() {
    var req = localStorage.getItem('NextPageURL');
    const fd = new FormData();
    this.postservice.NextComments(req, fd).subscribe(resp => {
      if (resp.status_code == '200') {
        let Commentres = resp.post_comments;
        this.CommentData = this.CommentData.concat(Commentres.data);
        this.CommentLength = this.CommentData.length;
        this.NextPageURL = Commentres.next_page_url;
        localStorage.setItem('NextPageURL', this.NextPageURL);
      }
    });
  }

  // add comment //
  AddComment(event) {
    if (this.isAuthenticated == '') {
      this.Router.navigate(['/login']);
      this.CookieService.set('afterLoginURL', JSON.stringify('home'));
    } else {
      if (event.key === "Enter") {
        if (event.target.value != '') {
          var request = {
            text: event.target.value,
            post_id: this.id,
            parent_id: '0'
          }
          this.postservice.AddComment(request).subscribe(data => {
            if (data.status_code == '201') {
              this.message = data.message;
              // alert(this.message);
              this.commentInfo.comment = '';
              this.getComments();
              // console.log(this.adsarray);
            } else {
              this.message = data.message;
              this.responsePOPUP.nativeElement.click();
            }
          });
        }
      }
    }
  }


  // main comment reply //
  replyCommnt(event, parent_id, index) {
    if (this.isAuthenticated == '') {
      this.Router.navigate(['/login']);
      this.CookieService.set('afterLoginURL', JSON.stringify('home'));
      // this.CookieService.set('postID', JSON.stringify(this.id));
    } else {
      if (event.key === "Enter") {
        if (event.target.value != '') {
          var request = {
            text: event.target.value,
            post_id: this.id,
            parent_id: parent_id
          }
          // console.log(request);
          this.postservice.replyComment(request).subscribe(data => {
            if (data.status_code == '201') {
              this.message = data.message;
              // alert(this.message);
              this.CommentData[index].commentsreplies.unshift(data.recent_comments[0]);
              this.replyInfo.comment = '';
              $('#editreply' + parent_id).removeClass('active');
              // this.getComments();
              // console.log(this.adsarray);
            } else {
              this.message = data.message;
              this.responsePOPUP.nativeElement.click();
            }
          });
        }
      }
    }
  }

  // main comment edit //
  editCommnt(event, id, index) {
    if (event.key === "Enter") {
      if (event.target.value != '') {
        var request = {
          text: event.target.value,
          post_id: this.id,
          parent_id: '0',
          id: id
        }
        // console.log(request);
        this.postservice.editComment(request).subscribe(data => {
          if (data.status_code == '200') {
            this.message = data.message;
            //  alert(this.message);
            this.CommentData[index].text = data.recent_comments[0].text;
            this.editInfo.comment = '';
            $('#editcmnt' + id).toggleClass('active');
            // this.getComments();
            // console.log(this.adsarray);
          } else {
            this.message = data.message;
            this.responsePOPUP.nativeElement.click();
          }
        });
      }
    }
  }

  // sub comment reply // 
  subreplyCommnt(event, subid, subparent_id, index) {
    if (this.isAuthenticated == '') {
      this.Router.navigate(['/login']);
      this.CookieService.set('afterLoginURL', JSON.stringify('home'));
      // this.CookieService.set('postID', JSON.stringify(this.id));
    } else {
      if (event.key === "Enter") {
        if (event.target.value != '') {
          var request = {
            text: event.target.value,
            post_id: this.id,
            parent_id: subparent_id
          }
          // console.log(request);
          // console.log(subid);
          this.postservice.replyComment(request).subscribe(data => {
            if (data.status_code == '201') {
              this.message = data.message;
              // alert(this.message);
              this.CommentData[index].commentsreplies.unshift(data.recent_comments[0]);
              this.subreplyInfo.comment = '';
              $('#subeditreply' + subid).toggleClass('active');
              // this.getComments();
              // console.log(this.adsarray);
            } else {
              this.message = data.message;
              this.responsePOPUP.nativeElement.click();
            }
          });
        }
      }
    }
  }

  // sub comment edit //
  subeditCommnt(event, subid, subparentid, main_index, sub_index) {
    if (event.key === "Enter") {
      if (event.target.value != '') {
        var request = {
          text: event.target.value,
          post_id: this.id,
          parent_id: subparentid,
          id: subid
        }
        // console.log(request);
        this.postservice.editComment(request).subscribe(data => {
          if (data.status_code == '200') {
            this.message = data.message;
            // alert(this.message);
            this.CommentData[main_index].commentsreplies[sub_index].text = data.recent_comments[0].text;
            this.subeditInfo.comment = '';
            $('#subeditcmnt' + subid).toggleClass('active');
            // this.getComments();
            // console.log(this.adsarray);
          } else {
            this.message = data.message;
            this.responsePOPUP.nativeElement.click();
          }
        });
      }
    }
  }

  // Show Replies //
  ShowReplies() {
    $('.subcomment_list').toggle();
  }


  // sub comment buttons //
  subeditComment(id, text) {
    this.subeditInfo.comment = text;
    $('#subeditcmnt' + id).toggleClass('active');
    $('#subeditreply' + id).removeClass('active');
  }

  // sub comment reply //
  subreplyComment(id) {
    $('#subeditreply' + id).toggleClass('active');
    $('#subeditcmnt' + id).removeClass('active');
  }


  // main comment buttons //
  editComment(id, text) {
    this.editInfo.comment = text;
    $('#editcmnt' + id).toggleClass('active');
    $('#editreply' + id).removeClass('active');
  }

  // main comment reply //
  replyComment(id) {
    $('#editreply' + id).toggleClass('active');
    $('#editcmnt' + id).removeClass('active');
  }

  // delete comment //
  deleteComment(id) {
    var request = {
      post_id: this.id,
      id: id
    }
    this.postservice.deletecomment(request).subscribe(data => {
      if (data.status_code == '200') {
        this.message = data.message;
        // alert(this.message);
        this.getComments();
      } else {
        this.message = data.message;
        this.responsePOPUP.nativeElement.click();
      }
    });
  }

  // subcomment delete //
  subdeleteComment(subid) {
    var request = {
      post_id: this.id,
      id: subid
    }
    this.postservice.deletecomment(request).subscribe(data => {
      if (data.status_code == '200') {
        this.message = data.message;
        // alert(this.message);
        this.getComments();
      } else {
        this.message = data.message;
        this.responsePOPUP.nativeElement.click();
      }
    });
  }

  disablePost(pageID) {
    var request = {
      "page_id": pageID
    }
    this.postservice.disablePOST(request).subscribe(data => {
      if (data.status_code == '200') {
        // alert(data.message);
        // console.log(this.adsarray);
      } else {
        this.message = data.message;
        this.responsePOPUP.nativeElement.click();
      }
    });
  }

  // add favourite //
  Addfavourite() {
    if (this.isAuthenticated != '') {
      $('.rotate').toggleClass("down");
      var request = {
        "post_id": this.id
      }
      this.myfavourite.Addfourite(request).subscribe(data => {
        if (data.status_code == 200) {
          if (data.postlikes == 1) {
            $('.addfav').addClass('hide');
            $('.addedfav').removeClass('show');
            this.showfavourite = 'true';
          } else {
            $('.addfav').removeClass('hide');
            $('.addedfav').addClass('show');
          }
          // alert(data.message);
          // console.log(this.adsarray);
        } else {
          this.message = data.message;
          this.responsePOPUP.nativeElement.click();
        }
      });
    } else {
      this.Router.navigate(['/login']);
      this.CookieService.set('afterLoginURL', JSON.stringify('home'));
    }
  }




  // Login Popup //
  showLog() {
    $('#login').fadeToggle("slow");
    $("#register").fadeToggle("slow");
  }

  showReg() {
    $('#login').fadeOut(800);
    $('#register').fadeIn(800);
  }

  Login(info) {
    this.sharedservice.LoginAuth(info);
  }

  SignUp(regInfo) {
    this.sharedservice.UserRegister(regInfo);
  }

  verifyotp(res) {
    this.sharedservice.verifyotp(res);
  }

  resendOtp(res) {
    this.sharedservice.resendOtp(res);
  }

  afterChange(e, index) {
    // console.log(e.currentSlide + 1 + ' / ' + e.slick.slideCount);
    this.finalarray[index].SlickCounter = e.currentSlide + 1 + ' / ' + e.slick.slideCount;
  }

  afterpostChange(e) {
    this.SlickCounter = e.currentSlide + 1 + ' / ' + e.slick.slideCount;
  }

  TriggerSection() {
    $('#openSection').toggleClass('active');
  }

  MainCommentSection(i) {
    $('#mainComment' + i).toggleClass('active');
  }

  SubCommentSection(j) {
    $('#subComment' + j).toggleClass('active');
  }

  ngOnInit() {
    $('#register').hide()
    this.clearshow = false;
    // this.Getallpostdata();
    /** spinner starts on init */
    // this.spinner.show();

  }

}
