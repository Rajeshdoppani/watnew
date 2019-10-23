import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServicesService } from '../services/services.service';
import { Subscriber, Subscription } from 'rxjs';
import * as $ from 'jquery';
import { EmbedVideoService } from 'ngx-embed-video';
import { FollowingpagesfeedsService } from '../services/pagefeeds/followingpagesfeeds.service';
import { PostsService } from '../services/posts/posts.service';
import * as FileSaver from 'file-saver';
import { MyfavouritesService } from '../services/favourites/myfavourites.service';
import { SharedserviceService } from '../services/sharedservice.service';
import { SEOservicesService } from '../services/seoservices.service';

@Component({
  selector: 'app-followingpagefeeds',
  templateUrl: './followingpagefeeds.component.html',
  styleUrls: ['./followingpagefeeds.component.css']
})
export class FollowingpagefeedsComponent implements OnInit {
  pagefeeddata: any;
  @ViewChild('Single_feed') Single_feed: ElementRef;
  @ViewChild('loginpopup') loginpopup: ElementRef;
  @ViewChild('responsePOPUP') responsePOPUP: ElementRef;
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
  next_page_url: any;
  favouriteLength: any;
  thumbnail: any;
  loadservice: any;
  titlestrg: any;
  posDate: any;
  datefuture: any;
  currentdate: any;
  yt_iframe_html: any;
  iframevideo: any;
  postlikes: any;
  userID: any;
  message: any;
  mediafiles: any;
  isAuthenticated: any;
  myfav: any;
  post_title: any;
  post_single_title: any;
  post_description: any;
  feed_published_at: any;
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
  postslength: any;
  id: any;
  postData: any;
  postcatstatus: any;
  pageCommentstatus: any;
  page_comment_status: any;
  postviews_count: any;
  postimagesCount: any;
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
  postAdsPosition: any;
  postAds: any;
  adsConfig = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 2000, "arrows": false };
  NextPageURL: any;
  postimages: any;
  postyvideos: any;
  pageDetails: any;
  page_ID: any;
  page_name: any;
  page_icon: any;
  postcomment_count: any;
  postlikes_count: any;
  baseURL: any;
  PostID: any;
  Index: any;
  subscription: Subscription;
  checked: any;
  SlickCounter: any;
  finalfeeds = [];
  postConfigs = { "slidesToShow": 1, "rows": 1, "infinite": true, "autoplay": true, "autoplaySpeed": 2000, "slidesToScroll": 1, "arrows": false, "dots": false };
  constructor(private seoservice: SEOservicesService, private sharedservice: SharedserviceService, private myfavourite: MyfavouritesService, private postservice: PostsService, private cookieservice: CookieService, private Router: Router, private pagefeeds: FollowingpagesfeedsService, private embedvideo: EmbedVideoService, private sanitizer: DomSanitizer) {
    this.seoservice.updateTitle();
    $('body').removeClass('side-menu-active');
    this.isAuthenticated = this.cookieservice.get('isAuthenticated');
    this.subscription = this.sharedservice.getResponse().subscribe(data => {
      if (data.status_code == 200) {
        console.log(data);
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
    this.userID = this.cookieservice.get('id');
    this.baseURL = ServicesService.API_Share_URL;
    this.pagesFeed();
  }

  // remember me //
  toggleVisibility(e) {
    this.checked = e.target.checked;
    console.log(this.checked);
    if (this.checked == true) {
      localStorage.setItem('mobile', this.loginInfo.mobile);
      localStorage.setItem('password', this.loginInfo.password);
    } else {
      localStorage.removeItem('mobile');
      localStorage.removeItem('password');
    }
  }

  loadWhatsapp(id, title) {
    var text = title;
    var url = this.baseURL + '/share/' + id;
    var message = encodeURIComponent(text) + " - " + encodeURIComponent(url);
    var whatsapp_url = "whatsapp://send?text=" + message;
    window.location.href = whatsapp_url;
  }

  pagesFeed() {
    this.pagefeeds.Getpagefeeds().subscribe(data => {
      if (data.status_code == '200') {
        this.loadservice = 'true';
        this.pagefeeddata = data.data.data;
        this.postAds = data.data.adds_data;
        this.postAdsPosition = data.data.adds_configuration;
        // console.log(this.postAdsPosition);
        // console.log(this.postAds);
        var j = 0;
        var adspostion = 0;
        this.finalfeeds = [];
        for (let r = 0; r < this.pagefeeddata.length; r++) {
          // this.finalarray = [];
          this.pagefeeddata[r].postadvalue = 0;
          this.finalfeeds.push(this.pagefeeddata[r]);
          if (this.postAds.length != 0) {
            adspostion++;
            if (adspostion == this.postAdsPosition && j < this.postAds.length) {
              this.postAds[j].postadvalue = 1;
              // console.log(this.liveAdsarray);
              this.finalfeeds.push(this.postAds[j]);
              j++;
              adspostion = 0;
            }
          }
        }
        for (let i = 0; i < this.finalfeeds.length; i++) {
          if (this.finalfeeds[i].postadvalue == 0) {
            if (this.finalfeeds[i].status == '1') {
              if (this.finalfeeds[i].preview_url == null) {
                let mainTitle = this.finalfeeds[i].title;
                this.titlestrg = mainTitle.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" style="color:#0064c8;" target="_blank">$1</a> ');
                var loadTitle = this.sanitizer.bypassSecurityTrustHtml(this.titlestrg.replace(/#(\w+)/g, '<a href="/search/%23$1" style="color:#0064c8;" target="_blank">#$1</a>'));
                this.finalfeeds[i].main_title = loadTitle;
              } else {
                let mainTitle = this.finalfeeds[i].title;
                this.finalfeeds[i].main_title = mainTitle;
              }
              if (this.finalfeeds[i].postlikes_count == "0") {
                this.finalfeeds[i].postlikes_count = "";
              }
              if (this.finalfeeds[i].type == '2') {
                this.posDate = this.finalfeeds[i].post_end_at + '.000Z';
                this.datefuture = new Date(this.posDate.replace(' ', 'T'));
                var diffInSeconds = Math.abs(this.datefuture - this.currentdate) / 1000;
                var days = Math.floor(diffInSeconds / 60 / 60 / 24);
                var hours = Math.floor(diffInSeconds / 60 / 60 % 24);
                var minutes = Math.floor(diffInSeconds / 60 % 60);
                var seconds = Math.floor(diffInSeconds % 60);
                var milliseconds = Math.round((diffInSeconds - Math.floor(diffInSeconds)) * 1000);
                if (days != 0) {
                  if (days > 1) {
                    this.finalfeeds[i].post_end_at = days + ' days';
                  } else {
                    this.finalfeeds[i].post_end_at = days + ' day';
                  }
                } else if (hours != 0 && days == 0) {
                  if (hours > 1) {
                    if (minutes > 50) {
                      var Hours = hours + 1;
                      this.finalfeeds[i].post_end_at = Hours + ' hours';
                    } else {
                      this.finalfeeds[i].post_end_at = hours + ' hours';
                    }
                  } else {
                    this.finalfeeds[i].post_end_at = hours + ' hour';
                  }
                } else if (minutes != 0 && hours == 0) {
                  if (minutes > 1) {
                    if (seconds > 50) {
                      var Minutes = minutes + 1;
                      this.finalfeeds[i].post_end_at = Minutes + ' minutes';
                    } else {
                      this.finalfeeds[i].post_end_at = minutes + ' minutes';
                    }
                  } else {
                    this.finalfeeds[i].post_end_at = minutes + ' minute';
                  }
                } else if (seconds != 0 && minutes == 0 && hours == 0) {
                  if (seconds > 1) {
                    if (milliseconds > 50) {
                      var Seconds = seconds + 1;
                      this.finalfeeds[i].post_end_at = Seconds + ' seconds';
                    } else {
                      this.finalfeeds[i].post_end_at = seconds + ' seconds';
                    }
                  } else {
                    this.finalfeeds[i].post_end_at = seconds + ' second';
                  }
                }
                let respdata = this.finalfeeds[i].postvotesusers;
                // console.log(respdata.length);
                if (respdata.length != 0) {
                  var item = this.finalfeeds[i].postvotesusers.find(item => item.user_id == this.cookieservice.get('id'));
                }

                if (item != undefined) {
                  this.finalfeeds[i].pollshow = 'showresult';
                } else {
                  // console.log('Fired');
                  this.finalfeeds[i].pollshow = 'showpoll';
                }
              }
              this.posDate = this.finalfeeds[i].feed_published_at + '.000Z';
              this.datefuture = new Date(this.posDate.replace(' ', 'T'));
              this.currentdate = new Date();
              if (this.finalfeeds[i].postlikes_count == 0) {
                this.finalfeeds[i].postlikes_count = '';
              }

              if (this.finalfeeds[i].postcomment_count == 0) {
                this.finalfeeds[i].postcomment_count = '';
              }

              if (this.finalfeeds[i].postviews_count == 0) {
                this.finalfeeds[i].postviews_count = '';
              }
              // get total seconds between the times
              var diffInSeconds = Math.abs(this.datefuture - this.currentdate) / 1000;
              var days = Math.floor(diffInSeconds / 60 / 60 / 24);
              var hours = Math.floor(diffInSeconds / 60 / 60 % 24);
              var minutes = Math.floor(diffInSeconds / 60 % 60);
              var seconds = Math.floor(diffInSeconds % 60);
              var milliseconds = Math.round((diffInSeconds - Math.floor(diffInSeconds)) * 1000);
              if (days != 0) {
                if (days > 1) {
                  this.finalfeeds[i].feed_published_at = days + ' days ago';
                } else {
                  this.finalfeeds[i].feed_published_at = days + ' day ago';
                }
              } else if (hours != 0 && days == 0) {
                if (hours > 1) {
                  if (minutes > 50) {
                    var Hours = hours + 1;
                    this.finalfeeds[i].feed_published_at = Hours + ' hours ago';
                  } else {
                    this.finalfeeds[i].feed_published_at = hours + ' hours ago';
                  }
                } else {
                  this.finalfeeds[i].feed_published_at = hours + ' hour ago';
                }
              } else if (minutes != 0 && hours == 0) {
                if (minutes > 1) {
                  if (seconds > 50) {
                    var Minutes = minutes + 1;
                    this.finalfeeds[i].feed_published_at = Minutes + ' minutes ago';
                  } else {
                    this.finalfeeds[i].feed_published_at = minutes + ' minutes ago';
                  }
                } else {
                  this.finalfeeds[i].feed_published_at = minutes + ' minute ago';
                }
              } else if (seconds != 0 && minutes == 0 && hours == 0) {
                if (seconds > 1) {
                  if (milliseconds > 50) {
                    var Seconds = seconds + 1;
                    this.finalfeeds[i].feed_published_at = Seconds + ' seconds ago';
                  } else {
                    this.finalfeeds[i].feed_published_at = seconds + ' seconds ago';
                  }
                } else {
                  this.finalfeeds[i].feed_published_at = seconds + ' second ago';
                }
              }

              var count = this.pagefeeddata.length;
              for (let a = 0; a < count; a++) {
                if (this.pagefeeddata[a].yvideos.length !== 0) {
                  this.embedvideo.embed_image(this.pagefeeddata[a].yvideos[0].path, { image: 'maxresdefault' }).then(res => {
                    // console.log(res.link);
                    this.pagefeeddata[a].yvideos[0].youtubeimage = res.link;
                  });
                }
              }

              if (this.finalfeeds[i].videos.length != 0) {
                var pattern = new RegExp('(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))'); // fragment locator
                var id = pattern.test(this.finalfeeds[i].videos[0].path);
                if (id != true) {
                  this.iframevideo = 'NormalVideo';
                  this.finalfeeds[i].videos[0].path = this.finalfeeds[i].videos[0].path;
                }
              }


            }
          }
        }
        this.next_page_url = data.data.next_page_url;
        if (this.next_page_url == null) {
          this.message = "Following Pages Feeds Not Found";
        }
        this.cookieservice.set('favouriteURL', this.next_page_url);
      }
    });
  }


  fetchNextpagefeeds() {
    var req = this.cookieservice.get('favouriteURL');
    this.pagefeeds.Nextpagefeeds(req).subscribe(resp => {
      if (resp.status_code == '200') {
        this.loadservice = 'true';
        // let pagefeedres = resp.data.data;
        let nextfeedres = resp.data.data
        var postnextAds = resp.data.adds_data;
        var postnextAdsPosition = resp.data.adds_configuration;
        var pagefeedres = [];
        // console.log(this.postAdsPosition);
        // console.log(postnextAds);
        var j = 0;
        var adspostion = 0;
        for (let r = 0; r < nextfeedres.length; r++) {
          nextfeedres[r].postadvalue = 0;
          pagefeedres.push(nextfeedres[r]);
          if (postnextAds.length != 0) {
            adspostion++;
            if (adspostion == postnextAdsPosition && j < postnextAds.length) {
              postnextAds[j].postadvalue = 1;
              pagefeedres.push(postnextAds[j]);
              j++;
              adspostion = 0;
            }
          }
        }

        for (let r = 0; r < pagefeedres.length; r++) {
          if (pagefeedres[r].postadvalue == 0) {
            if (pagefeedres[r].status == '1') {
              if (pagefeedres[r].preview_url == null) {
                let mainTitle = pagefeedres[r].title;
                this.titlestrg = mainTitle.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" style="color:#0064c8;" target="_blank">$1</a> ');
                var loadTitle = this.sanitizer.bypassSecurityTrustHtml(this.titlestrg.replace(/#(\w+)/g, '<a href="/search/%23$1" style="color:#0064c8;" target="_blank">#$1</a>'));
                pagefeedres[r].main_title = loadTitle;
              } else {
                let mainTitle = pagefeedres[r].title;
                pagefeedres[r].main_title = mainTitle;
              }
              if (pagefeedres[r].postlikes_count == "0") {
                pagefeedres[r].postlikes_count = "";
              }
              if (pagefeedres[r].type == '2') {
                this.posDate = pagefeedres[r].post_end_at + '.000Z';
                this.datefuture = new Date(this.posDate.replace(' ', 'T'));
                var diffInSeconds = Math.abs(this.datefuture - this.currentdate) / 1000;
                var days = Math.floor(diffInSeconds / 60 / 60 / 24);
                var hours = Math.floor(diffInSeconds / 60 / 60 % 24);
                var minutes = Math.floor(diffInSeconds / 60 % 60);
                var seconds = Math.floor(diffInSeconds % 60);
                var milliseconds = Math.round((diffInSeconds - Math.floor(diffInSeconds)) * 1000);
                if (days != 0) {
                  if (days > 1) {
                    pagefeedres[r].post_end_at = days + ' days';
                  } else {
                    pagefeedres[r].post_end_at = days + ' day';
                  }
                } else if (hours != 0 && days == 0) {
                  if (hours > 1) {
                    if (minutes > 50) {
                      var Hours = hours + 1;
                      pagefeedres[r].post_end_at = Hours + ' hours';
                    } else {
                      pagefeedres[r].post_end_at = hours + ' hours';
                    }
                  } else {
                    pagefeedres[r].post_end_at = hours + ' hour';
                  }
                } else if (minutes != 0 && hours == 0) {
                  if (minutes > 1) {
                    if (seconds > 50) {
                      var Minutes = minutes + 1;
                      pagefeedres[r].post_end_at = Minutes + ' minutes';
                    } else {
                      pagefeedres[r].post_end_at = minutes + ' minutes';
                    }
                  } else {
                    pagefeedres[r].post_end_at = minutes + ' minute';
                  }
                } else if (seconds != 0 && minutes == 0 && hours == 0) {
                  if (seconds > 1) {
                    if (milliseconds > 50) {
                      var Seconds = seconds + 1;
                      pagefeedres[r].post_end_at = Seconds + ' seconds';
                    } else {
                      pagefeedres[r].post_end_at = seconds + ' seconds';
                    }
                  } else {
                    pagefeedres[r].post_end_at = seconds + ' second';
                  }
                }
                let respdata = pagefeedres[r].postvotesusers;
                // console.log(respdata.length);
                if (respdata.length != 0) {
                  var item = pagefeedres[r].postvotesusers.find(item => item.user_id == this.cookieservice.get('id'));
                }

                if (item != undefined) {
                  pagefeedres[r].pollshow = 'showresult';
                } else {
                  // console.log('Fired');
                  pagefeedres[r].pollshow = 'showpoll';
                }
              }
              // console.log(pagefeedres[r].postvotesusers);

              // this.image = pagefeedres[r].images[0].path;
              // this.posDate = pagefeedres[r].feed_published_at;
              // console.log(this.posDate);
              // this.posDate = pagefeedres[r].feed_published_at + ' ' + 'UTC';
              this.posDate = pagefeedres[r].feed_published_at + '.000Z';
              // this.namesg = pagefeedres[r].feed_published_at+' '+'UTC'+pagefeedres[r].title;
              // console.log(this.namesg);
              this.datefuture = new Date(this.posDate.replace(' ', 'T'));
              this.currentdate = new Date();
              if (pagefeedres[r].postlikes_count == 0) {
                pagefeedres[r].postlikes_count = '';
              }

              if (pagefeedres[r].postcomment_count == 0) {
                pagefeedres[r].postcomment_count = '';
              }

              if (pagefeedres[r].postviews_count == 0) {
                pagefeedres[r].postviews_count = '';
              }
              // get total seconds between the times

              var diffInSeconds = Math.abs(this.datefuture - this.currentdate) / 1000;
              var days = Math.floor(diffInSeconds / 60 / 60 / 24);
              var hours = Math.floor(diffInSeconds / 60 / 60 % 24);
              var minutes = Math.floor(diffInSeconds / 60 % 60);
              var seconds = Math.floor(diffInSeconds % 60);
              var milliseconds = Math.round((diffInSeconds - Math.floor(diffInSeconds)) * 1000);
              if (days != 0) {
                if (days > 1) {
                  pagefeedres[r].feed_published_at = days + ' days ago';
                } else {
                  pagefeedres[r].feed_published_at = days + ' day ago';
                }
              } else if (hours != 0 && days == 0) {
                if (hours > 1) {
                  if (minutes > 50) {
                    var Hours = hours + 1;
                    pagefeedres[r].feed_published_at = Hours + ' hours ago';
                  } else {
                    pagefeedres[r].feed_published_at = hours + ' hours ago';
                  }
                } else {
                  pagefeedres[r].feed_published_at = hours + ' hour ago';
                }
              } else if (minutes != 0 && hours == 0) {
                if (minutes > 1) {
                  if (seconds > 50) {
                    var Minutes = minutes + 1;
                    pagefeedres[r].feed_published_at = Minutes + ' minutes ago';
                  } else {
                    pagefeedres[r].feed_published_at = minutes + ' minutes ago';
                  }
                } else {
                  pagefeedres[r].feed_published_at = minutes + ' minute ago';
                }
              } else if (seconds != 0 && minutes == 0 && hours == 0) {
                if (seconds > 1) {
                  if (milliseconds > 50) {
                    var Seconds = seconds + 1;
                    pagefeedres[r].feed_published_at = Seconds + ' seconds ago';
                  } else {
                    pagefeedres[r].feed_published_at = seconds + ' seconds ago';
                  }
                } else {
                  pagefeedres[r].feed_published_at = seconds + ' second ago';
                }
              }

              var count = pagefeedres.length;
              for (let a = 0; a < count; a++) {
                if (pagefeedres[a].postadvalue == 0) {
                  if (pagefeedres[a].yvideos.length !== 0) {
                    this.embedvideo.embed_image(pagefeedres[a].yvideos[0].path, { image: 'maxresdefault' }).then(res => {
                      // console.log(res.link);
                      pagefeedres[a].yvideos[0].youtubeimage = res.link;
                    });
                  }
                }
              }

              if (pagefeedres[r].videos.length != 0) {
                var pattern = new RegExp('(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))'); // fragment locator
                var id = pattern.test(pagefeedres[r].videos[0].path);
                if (id != true) {
                  this.iframevideo = 'NormalVideo';
                  pagefeedres[r].videos[0].path = pagefeedres[r].videos[0].path;
                }
              }

            }
          }
        }
        this.finalfeeds = this.finalfeeds.concat(pagefeedres);
        this.favouriteLength = pagefeedres;
        this.next_page_url = resp.data.next_page_url;
        if (this.next_page_url == null) {
          this.message = "Following Pages Feeds Not Found";
        }
        this.cookieservice.set('favouriteURL', this.next_page_url);
      }
    });
  }


  postcomment = function (id, index) {
    this.loadPost(id, index);
  }


  postlike(id, index) {
    if (this.cookieservice.get("isAuthenticated") == "true") {
      var reqbody = {
        post_id: id,
      }
      this.postservice.postlike(reqbody).subscribe(data => {
        $(".heart_icon" + index).toggleClass("is-active");
        // console.log(data);
        if (data.status_code == "200") {
          this.postlikes = data.postlikes;
          if (this.postlikes == "0") {
            $('.heart_filled_' + index).removeClass('fa-heart');
            $('.heart_filled_' + index).addClass('fa-heart-o');
            this.finalfeeds[index].postlikes_count = "";
            this.postlikes_count = "";
          } else {
            $('.heart_filled_' + index).removeClass('fa-heart-o');
            $('.heart_filled_' + index).addClass('fa-heart');
            this.finalfeeds[index].postlikes_count = data.postlikes;
            this.postlikes_count = data.postlikes;
          }
        }
      });
    } else {
      this.PostID = id;
      this.Index = index;
      // this.Router.navigate(['login']);
      this.cookieservice.set('favouriteID', JSON.stringify(this.PostID));
      this.loginpopup.nativeElement.click();
    }
  }

  mediaDownload(imgFile, metaimage) {
    // console.log(imgFile);
    if (metaimage == null && imgFile.length == '0') {
      alert('No media to download');
    } else if (metaimage == null) {
      for (let r = 0; r < imgFile.length; r++) {
        this.mediafiles = this.sanitizer.bypassSecurityTrustHtml(imgFile[r].path);
        var res = this.mediafiles.changingThisBreaksApplicationSecurity;
        FileSaver.saveAs(res, "mediafiles");
      }
    } else if (metaimage != null) {
      this.mediafiles = this.sanitizer.bypassSecurityTrustHtml(metaimage);
      var res = this.mediafiles.changingThisBreaksApplicationSecurity;
      FileSaver.saveAs(res, "mediafiles");
    }
  }

  // poll submit //
  pollclick(option_id, post_id, page_id, index) {
    if (this.cookieservice.get("isAuthenticated") == "true") {
      const pollrequest = new FormData();
      pollrequest.append('post_id', post_id);
      pollrequest.append('option_id', option_id);
      pollrequest.append('page_id', page_id);
      this.postservice.submitPoll(pollrequest).subscribe(data => {
        if (data.status_code == 200) {
          this.finalfeeds[index].postoptions = data.data.postoptions;
          var respData = data.data.postvotesusers;
          if (respData.length != 0) {
            var item = respData.find(item => item.user_id == this.userID);
          }
          if (item != undefined) {
            this.finalfeeds[index].pollshow = 'showresult';
          } else {
            console.log('Fired');
            this.finalfeeds[index].pollshow = 'showpoll';
          }

        }
      });
    } else {
      this.Router.navigate(['login']);
      this.cookieservice.set('afterLoginURL', JSON.stringify('mypagefeeds'));
    }
  }


  // postdetail popup //
  loadPost(postID, index) {
    this.postimages = '';
    this.postVideosiframe = '';
    this.postVideoslength = '';
    this.postVideos = '';
    this.postyvideos = '';
    this.id = postID;
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
          this.finalfeeds[indexID].postviews_count = this.postData.postviews_count;
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
        this.postimagesCount = this.postData.images.length;
        this.postVideoslength = this.postData.videos;
        if (this.postData.yvideos.length != 0) {
          this.yt_iframe_html = this.embedvideo.embed(this.postData.yvideos[0].path, {
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
        this.Single_feed.nativeElement.click();
      } else {
        alert('Error Occured. Please refresh the page.');
      }
      // this.postsdata[i].feed_published_at;
      // console.log(this.postsdata[i].created_at);
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
      this.cookieservice.set('afterLoginURL', JSON.stringify('mypagefeeds'));
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
      this.cookieservice.set('afterLoginURL', JSON.stringify('mypagefeeds'));
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
              //  alert(this.message);
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
            // alert(this.message);
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
      this.cookieservice.set('afterLoginURL', JSON.stringify('mypagefeeds'));
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
              //  alert(this.message);
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
        alert(data.message);
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
      this.cookieservice.set('afterLoginURL', JSON.stringify('mypagefeeds'));
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
    console.log(e.currentSlide + 1 + ' / ' + e.slick.slideCount);
    this.finalfeeds[index].SlickCounter = e.currentSlide + 1 + ' / ' + e.slick.slideCount;
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
  }

}
