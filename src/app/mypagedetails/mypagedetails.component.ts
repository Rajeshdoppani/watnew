import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../services/page/page.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { NgxMasonryOptions } from 'ngx-masonry';
import { CookieService } from 'ngx-cookie-service';
import { PostsService } from '../services/posts/posts.service';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { EmbedVideoService } from 'ngx-embed-video';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as FileSaver from 'file-saver';
import { MyfavouritesService } from '../services/favourites/myfavourites.service';
import { ServicesService } from '../services/services.service';
import { SharedserviceService } from '../services/sharedservice.service';
import { SEOservicesService } from '../services/seoservices.service';

@Component({
  selector: 'mypagedetails',
  templateUrl: './mypagedetails.component.html',
  styleUrls: ['./mypagedetails.component.css']
})
export class MypagedetailsComponent implements OnInit {
  pageid;
  pageData: any
  date;
  pagecity: any;
  pagecountry: any;
  pageabout: any;
  posDate: any;
  datefuture;
  currentdate;
  // embedService;
  getdate;
  yt_iframe_html;
  iframevideo: any;
  postConfigs = { "slidesToShow": 1, "rows": 1, "infinite": true, "autoplay": true, "autoplaySpeed": 2000, "slidesToScroll": 1, "arrows": false, "dots": false };
  postdatadetails: any[];
  titlestrg;
  img;
  followCount: any;
  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.8s',
    horizontalOrder: true
  };
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
  pagecreated: any;
  userID: any;
  pageIcon: any;
  pageName: any;
  pageHeader: any;
  mediafiles: any;
  next_page_url: any;
  message: any;
  followingcount: any;
  template: string = `<img class="loader-img" src="assets/images/loading.gif" />`;
  @ViewChild('mypagedetail_post') mypagedetail_post: ElementRef;
  @ViewChild('loginpopup') loginpopup: ElementRef;
  @ViewChild('responsePOPUP') responsePOPUP: ElementRef;
  postimages: any;
  postyvideos: any;
  pageDetails: any;
  postimagesCount: any;
  page_ID: any;
  page_name: any;
  page_icon: any;
  postcomment_count: any;
  postlikes_count: any;
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
  post_single_title: any;
  isAuthenticated: any;
  youtubeimage: any;
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
  id: any;
  NextPageURL: any;
  postlikes: any;
  baseURL: any;
  metaData = [];
  page_follow_user: any;
  follow_data: any;
  followstatus: any;
  SlickCounter: any;
  private parametersObservable: any;
  constructor(private seoservice: SEOservicesService, private sharedservice: SharedserviceService, private meta: Meta, private title: Title, private myfavourite: MyfavouritesService, private embedService: EmbedVideoService, private sanitizer: DomSanitizer, private spinner: NgxSpinnerService, private spinnerService: Ng4LoadingSpinnerService, private Router: Router, private route: ActivatedRoute, private mypage: PageService, private CookieService: CookieService, private postservice: PostsService) {
    this.seoservice.updateTitle();
    $('body').removeClass('side-menu-active');
    this.parametersObservable = this.route.params.subscribe(params => {
      //"product" is obtained from 'ProductResolver'
      this.pageid = this.route.snapshot.params['page_id'];
      this.mypagedatails();
    });
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
    this.userID = this.CookieService.get('id');
    this.baseURL = ServicesService.API_Share_URL;
    // this.mypagedatails();
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

  postlike(id, i) {
    if (this.CookieService.get("isAuthenticated") == "true") {
      // console.log(id, i);
      var reqbody = {
        post_id: id,
      }
      this.postservice.postlike(reqbody).subscribe(data => {
        $(".heart_icon" + i).toggleClass("is-active");
        // console.log(data);
        if (data.status_code == "200") {
          this.spinner.hide();
          // this.postdatadetails[i].postlikes_count = data.postlikes;
          this.postlikes = data.postlikes;
          if (this.postlikes == "0") {
            $('.heart_filled_' + i).removeClass('fa-heart');
            $('.heart_filled_' + i).addClass('fa-heart-o');
            this.postdatadetails[i].postlikes_count = "";
            this.postlikes_count = "";
          } else {
            $('.heart_filled_' + i).removeClass('fa-heart-o');
            $('.heart_filled_' + i).addClass('fa-heart');
            this.postdatadetails[i].postlikes_count = data.postlikes;
            this.postlikes_count = data.postlikes;
          }
          // console.log(this.postdatadetails[i].postlikes_count);
          // this.Getallpostdata();
        }
      });
    } else {
      this.PostID = id;
      this.Index = i;
      this.CookieService.set('favouriteID', JSON.stringify(this.PostID));
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
        ///console.log(res);
        FileSaver.saveAs(res, "mediafiles");
      }
    } else if (metaimage != null) {
      this.mediafiles = this.sanitizer.bypassSecurityTrustHtml(metaimage);
      var res = this.mediafiles.changingThisBreaksApplicationSecurity;
      FileSaver.saveAs(res, "mediafiles");
    }
  }

  getPageFollowStatus(pageval) {
    // var item = cat.follow.find(item => item.user_id == this.CookieService.get('id'));
    // console.log(item);
    if (pageval != null) {
      $('.pagesfollow').addClass('active');
      return 'Following';
    } else {
      $('.pagesfollow').removeClass('active');
      return 'Follow';
    }
  }

  following(id) {
    if (this.CookieService.get("isAuthenticated") == "true") {
      var reqbody = {
        page_id: id,
      }
      this.mypage.following(reqbody).subscribe(data => {
        if (data.status_code == '201') {
          this.follow_data = data.data;
          this.page_follow_user = this.follow_data.page_follow_user;
        }

      });
    } else {
      this.Router.navigate(['login']);
      this.CookieService.set('afterLoginURL', JSON.stringify('pages'));
    }
  }


  mypagedatails() {
    this.spinner.show();
    var req = {
      "id": this.pageid,
    }
    this.mypage.mypagedatails(req).subscribe(resp => {
      if (resp.status_code == "200") {
        this.spinner.hide();
        this.pageData = resp.data.page;
        // this.metaData.push({
        //   title: this.pageData.meta_title,
        //   description: this.pageData.meta_description,
        //   keywords: this.pageData.keywords
        // });.log()
        // console.log(this.pageData.keywords);
        this.updateMeta(this.pageData.meta_title, this.pageData.meta_description, this.pageData.meta_keywords);
        this.pageHeader = this.pageData.page_header;
        this.pageIcon = this.pageData.page_icon;
        this.pageName = this.pageData.name;
        this.pageabout = this.pageData.about;
        this.pagecity = this.pageData.city;
        this.pagecountry = this.pageData.country;
        this.page_follow_user = this.pageData.page_follow_user;
        this.followingcount = resp.data.followers_count;
        if (this.followingcount != 0) {
          this.followCount = this.followingcount;
        } else {
          this.followCount = '0';
        }
        this.date = this.pageData.created_at;
        // get total seconds between the times
        this.date = this.pageData.created_at;
        var d = new Date(this.date);
        this.getdate = d.toDateString();
        // console.log(this.getdate);
        this.pagecreated = this.getdate.slice(4, 15);
        // console.log(this.pageData.created_at);

        this.postdatadetails = resp.data.posts;
        for (var i = 0; i < this.postdatadetails.length; i++) {
          if (this.postdatadetails[i].preview_url == null) {
            let mainTitle = this.postdatadetails[i].title;
            this.titlestrg = mainTitle.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" style="color:#0064c8;" target="_blank">$1</a> ');
            var loadTitle = this.sanitizer.bypassSecurityTrustHtml(this.titlestrg.replace(/#(\w+)/g, '<a href="/search/%23$1" style="color:#0064c8;" target="_blank">#$1</a>'));
            this.postdatadetails[i].main_title = loadTitle;
          } else {
            let mainTitle = this.postdatadetails[i].title;
            this.postdatadetails[i].main_title = mainTitle;
          }
          // this.date = this.postdatadetails[i].feed_published_at;
          // this.datefuture = new Date(this.date);
          this.posDate = this.postdatadetails[i].feed_published_at + '.000Z';
          this.datefuture = new Date(this.posDate.replace(' ', 'T'));
          this.currentdate = new Date();
          // get total seconds between the times
          var diffInSeconds = Math.abs(this.datefuture - this.currentdate) / 1000;
          var days = Math.floor(diffInSeconds / 60 / 60 / 24);
          var hours = Math.floor(diffInSeconds / 60 / 60 % 24);
          var minutes = Math.floor(diffInSeconds / 60 % 60);
          var seconds = Math.floor(diffInSeconds % 60);
          var milliseconds = Math.round((diffInSeconds - Math.floor(diffInSeconds)) * 1000);
          if (days != 0) {
            if (days > 1) {
              this.postdatadetails[i].feed_published_at = days + ' days ago';
            } else {
              this.postdatadetails[i].feed_published_at = days + ' day ago';
            }
          } else if (hours != 0 && days == 0) {
            if (hours > 1) {
              if (minutes > 50) {
                var Hours = hours + 1;
                this.postdatadetails[i].feed_published_at = Hours + ' hours ago';
              } else {
                this.postdatadetails[i].feed_published_at = hours + ' hours ago';
              }
            } else {
              this.postdatadetails[i].feed_published_at = hours + ' hour ago';
            }
          } else if (minutes != 0 && hours == 0) {
            if (minutes > 1) {
              if (seconds > 50) {
                var Minutes = minutes + 1;
                this.postdatadetails[i].feed_published_at = Minutes + ' minutes ago';
              } else {
                this.postdatadetails[i].feed_published_at = minutes + ' minutes ago';
              }
            } else {
              this.postdatadetails[i].feed_published_at = minutes + ' minute ago';
            }
          } else if (seconds != 0 && minutes == 0 && hours == 0) {
            if (seconds > 1) {
              if (milliseconds > 50) {
                var Seconds = seconds + 1;
                this.postdatadetails[i].feed_published_at = Seconds + ' seconds ago';
              } else {
                this.postdatadetails[i].feed_published_at = seconds + ' seconds ago';
              }
            } else {
              this.postdatadetails[i].feed_published_at = seconds + ' second ago';
            }
          }


          if (this.postdatadetails[i].postlikes_count == 0) {
            this.postdatadetails[i].postlikes_count = '';
          }

          if (this.postdatadetails[i].postcomment_count == 0) {
            this.postdatadetails[i].postcomment_count = '';
          }

          if (this.postdatadetails[i].postviews_count == 0) {
            this.postdatadetails[i].postviews_count = '';
          }

          //  console.log(this.postdatadetails[i].feed_published_at);
          // if (this.postdatadetails[i].images.length != 0) {
          //   this.getMeta(this.postdatadetails[i].images[0].path, this.postdatadetails[i]);
          // }

          // if (this.postdatadetails[i].yvideos.length != 0) {
          //   this.yt_iframe_html = this.embedService.embed(this.postdatadetails[i].yvideos[0].path, {
          //     attr: { width: 300, height: 200 }
          //   });
          //   // console.log(this.yt_iframe_html);
          //   if (this.yt_iframe_html.changingThisBreaksApplicationSecurity != undefined) {
          //     this.postdatadetails[i].yvideos[0].path = this.sanitizer.bypassSecurityTrustHtml(this.yt_iframe_html.changingThisBreaksApplicationSecurity);
          //   } else {
          //     this.postdatadetails[i].yvideos[0].path = this.yt_iframe_html;
          //   }

          // }
          // if (this.postdatadetails[i].videos.length != 0) {
          //   var pattern = new RegExp('(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))'); // fragment locator
          //   var id = pattern.test(this.postdatadetails[i].videos[0].path);
          //   if (id == true) {
          //     var res = this.postdatadetails[i].videos[0].path.replace("'\'", "");
          //     var regEx = /(width|height)=["']([^"']*)["']/gi;
          //     var resconvert = res.replace(regEx);
          //     var result = resconvert.replace('undefined undefined', 'width="100%" height="350"');
          //     // console.log(result);
          //     this.iframevideo = 'iframeVideo';
          //     this.postdatadetails[i].videos[0].path = this.sanitizer.bypassSecurityTrustHtml(result);
          //   } else {
          //     this.iframevideo = 'NormalVideo';
          //     this.postdatadetails[i].videos[0].path = this.postdatadetails[i].videos[0].path;
          //   }
          // }


          var count = this.postdatadetails.length;
          for (let a = 0; a < count; a++) {
            if (this.postdatadetails[a].yvideos.length !== 0) {
              this.embedService.embed_image(this.postdatadetails[a].yvideos[0].path, { image: 'maxresdefault' }).then(res => {
                console.log(res);
                this.postdatadetails[a].yvideos[0].youtubeimage = res.link;
              });
            }
          }

          if (this.postdatadetails[i].videos.length != 0) {
            var pattern = new RegExp('(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))'); // fragment locator
            var id = pattern.test(this.postdatadetails[i].videos[0].path);
            if (id != true) {
              this.iframevideo = 'NormalVideo';
              this.postdatadetails[i].videos[0].path = this.postdatadetails[i].videos[0].path;
            }
          }

          // this.postsdata[i].feed_published_at;
          // console.log(this.postsdata[i].created_at);

          if (this.postdatadetails[i].type == '2') {
            var pollenddate = this.postdatadetails[i].post_end_at + '.000Z';
            var poll_ENDDATE = new Date(pollenddate);
            this.posDate = this.postdatadetails[i].post_end_at + '.000Z';
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
                this.postdatadetails[i].post_end_at = 'This Poll ends in ' + days + ' days';
              } else {
                this.postdatadetails[i].post_end_at = 'This Poll ends in ' + days + ' day';
              }
            } else if (hours != 0 && days == 0) {
              if (hours > 1) {
                if (minutes > 50) {
                  var Hours = hours + 1;
                  this.postdatadetails[i].post_end_at = 'This Poll ends in ' + Hours + ' hours';
                } else {
                  this.postdatadetails[i].post_end_at = 'This Poll ends in ' + hours + ' hours';
                }
              } else {
                this.postdatadetails[i].post_end_at = 'This Poll ends in ' + hours + ' hour';
              }
            } else if (minutes != 0 && hours == 0) {
              if (minutes > 1) {
                if (seconds > 50) {
                  var Minutes = minutes + 1;
                  this.postdatadetails[i].post_end_at = 'This Poll ends in ' + Minutes + ' minutes';
                } else {
                  this.postdatadetails[i].post_end_at = 'This Poll ends in ' + minutes + ' minutes';
                }
              } else {
                this.postdatadetails[i].post_end_at = 'This Poll ends in ' + minutes + ' minute';
              }
            } else if (seconds != 0 && minutes == 0 && hours == 0) {
              if (seconds > 1) {
                if (milliseconds > 50) {
                  var Seconds = seconds + 1;
                  this.postdatadetails[i].post_end_at = 'This Poll ends in ' + Seconds + ' seconds';
                } else {
                  this.postdatadetails[i].post_end_at = 'This Poll ends in ' + seconds + ' seconds';
                }
              } else {
                this.postdatadetails[i].post_end_at = 'This Poll ends in ' + seconds + ' second';
              }
            }
            let respdata = this.postdatadetails[i].postvotesusers;
            // console.log(this.postdatadetails[i].post_end_at);
            // console.log(this.postdatadetails[i].feed_published_at);
            // console.log(respdata.length);
            if (this.currentdate > poll_ENDDATE) {
              this.postdatadetails[i].pollshow = 'showresult';
              this.postdatadetails[i].post_end_at = "This Poll is Ended.";
            } else {
              if (respdata.length != 0) {
                var item = this.postdatadetails[i].postvotesusers.find(item => item.user_id == this.CookieService.get('id'));
              }

              if (item != undefined) {
                this.postdatadetails[i].pollshow = 'showresult';
              } else {
                // console.log('Fired');
                this.postdatadetails[i].pollshow = 'showpoll';
              }
            }
          }

        }

        this.next_page_url = resp.data.next_page_url;
        if (this.next_page_url == 'null') {
          $('.loadMore').hide();
          this.message = "Page Feeds Not Found";
        } else {
          $('.loadMore').show();
        }
        this.CookieService.set("Mypagedetailurl", this.next_page_url);
      }
    });
  }


  fetchNextmypagefeeds() {
    var req = this.CookieService.get('Mypagedetailurl');
    this.mypage.Nextpagefeeds(req).subscribe(data => {
      if (data.status_code == "200") {
        let mypagedatailsres = data.data.posts;
        for (var i = 0; i < mypagedatailsres.length; i++) {
          if (mypagedatailsres[i].preview_url == null) {
            let mainTitle = mypagedatailsres[i].title;
            this.titlestrg = mainTitle.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" style="color:#0064c8;" target="_blank">$1</a> ');
            var loadTitle = this.sanitizer.bypassSecurityTrustHtml(this.titlestrg.replace(/#(\w+)/g, '<a href="/search/%23$1" style="color:#0064c8;" target="_blank">#$1</a>'));
            mypagedatailsres[i].main_title = loadTitle;
          } else {
            let mainTitle = mypagedatailsres[i].title;
            mypagedatailsres[i].main_title = mainTitle;
          }
          // this.date = mypagedatailsres[i].feed_published_at;
          // this.datefuture = new Date(this.date);
          this.posDate = mypagedatailsres[i].feed_published_at + '.000Z';
          this.datefuture = new Date(this.posDate.replace(' ', 'T'));
          this.currentdate = new Date();
          // get total seconds between the times
          var diffInSeconds = Math.abs(this.datefuture - this.currentdate) / 1000;
          var days = Math.floor(diffInSeconds / 60 / 60 / 24);
          var hours = Math.floor(diffInSeconds / 60 / 60 % 24);
          var minutes = Math.floor(diffInSeconds / 60 % 60);
          var seconds = Math.floor(diffInSeconds % 60);
          var milliseconds = Math.round((diffInSeconds - Math.floor(diffInSeconds)) * 1000);
          if (days != 0) {
            if (days > 1) {
              mypagedatailsres[i].feed_published_at = days + ' days ago';
            } else {
              mypagedatailsres[i].feed_published_at = days + ' day ago';
            }
          } else if (hours != 0 && days == 0) {
            if (hours > 1) {
              if (minutes > 50) {
                var Hours = hours + 1;
                mypagedatailsres[i].feed_published_at = Hours + ' hours ago';
              } else {
                mypagedatailsres[i].feed_published_at = hours + ' hours ago';
              }
            } else {
              mypagedatailsres[i].feed_published_at = hours + ' hour ago';
            }
          } else if (minutes != 0 && hours == 0) {
            if (minutes > 1) {
              if (seconds > 50) {
                var Minutes = minutes + 1;
                mypagedatailsres[i].feed_published_at = Minutes + ' minutes ago';
              } else {
                mypagedatailsres[i].feed_published_at = minutes + ' minutes ago';
              }
            } else {
              mypagedatailsres[i].feed_published_at = minutes + ' minute ago';
            }
          } else if (seconds != 0 && minutes == 0 && hours == 0) {
            if (seconds > 1) {
              if (milliseconds > 50) {
                var Seconds = seconds + 1;
                mypagedatailsres[i].feed_published_at = Seconds + ' seconds ago';
              } else {
                mypagedatailsres[i].feed_published_at = seconds + ' seconds ago';
              }
            } else {
              mypagedatailsres[i].feed_published_at = seconds + ' second ago';
            }
          }

          //  console.log(mypagedatailsres[i].feed_published_at);
          // if (mypagedatailsres[i].images.length != 0) {
          //   this.getMeta(mypagedatailsres[i].images[0].path, mypagedatailsres[i]);
          // }

          // if (mypagedatailsres[i].yvideos.length != 0) {
          //   this.yt_iframe_html = this.embedService.embed(mypagedatailsres[i].yvideos[0].path, {
          //     attr: { width: 300, height: 200 }
          //   });
          //   // console.log(this.yt_iframe_html);
          //   if (this.yt_iframe_html.changingThisBreaksApplicationSecurity != undefined) {
          //     mypagedatailsres[i].yvideos[0].path = this.sanitizer.bypassSecurityTrustHtml(this.yt_iframe_html.changingThisBreaksApplicationSecurity);
          //   } else {
          //     mypagedatailsres[i].yvideos[0].path = this.yt_iframe_html;
          //   }

          // }
          // if (mypagedatailsres[i].videos.length != 0) {
          //   var pattern = new RegExp('(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))'); // fragment locator
          //   var id = pattern.test(mypagedatailsres[i].videos[0].path);
          //   if (id == true) {
          //     var res = mypagedatailsres[i].videos[0].path.replace("'\'", "");
          //     var regEx = /(width|height)=["']([^"']*)["']/gi;
          //     var resconvert = res.replace(regEx);
          //     var result = resconvert.replace('undefined undefined', 'width="100%" height="350"');
          //     // console.log(result);
          //     this.iframevideo = 'iframeVideo';
          //     mypagedatailsres[i].videos[0].path = this.sanitizer.bypassSecurityTrustHtml(result);
          //   } else {
          //     this.iframevideo = 'NormalVideo';
          //     mypagedatailsres[i].videos[0].path = mypagedatailsres[i].videos[0].path;
          //   }
          // }

          var count = mypagedatailsres.length;
          for (let a = 0; a < count; a++) {
            if (mypagedatailsres[a].yvideos.length !== 0) {
              this.embedService.embed_image(mypagedatailsres[a].yvideos[0].path, { image: 'maxresdefault' }).then(res => {
                console.log(res);
                mypagedatailsres[a].yvideos[0].youtubeimage = res.link;
              });
            }
          }

          if (mypagedatailsres[i].videos.length != 0) {
            var pattern = new RegExp('(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))'); // fragment locator
            var id = pattern.test(mypagedatailsres[i].videos[0].path);
            if (id != true) {
              this.iframevideo = 'NormalVideo';
              mypagedatailsres[i].videos[0].path = mypagedatailsres[i].videos[0].path;
            }
          }

          // this.postsdata[i].feed_published_at;
          // console.log(this.postsdata[i].created_at);

          if (mypagedatailsres[i].type == '2') {
            var pollenddate = mypagedatailsres[i].post_end_at + '.000Z';
            var poll_ENDDATE = new Date(pollenddate);
            this.posDate = mypagedatailsres[i].post_end_at + '.000Z';
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
                mypagedatailsres[i].post_end_at = 'This Poll ends in ' + days + ' days';
              } else {
                mypagedatailsres[i].post_end_at = 'This Poll ends in ' + days + ' day';
              }
            } else if (hours != 0 && days == 0) {
              if (hours > 1) {
                if (minutes > 50) {
                  var Hours = hours + 1;
                  mypagedatailsres[i].post_end_at = 'This Poll ends in ' + Hours + ' hours';
                } else {
                  mypagedatailsres[i].post_end_at = 'This Poll ends in ' + hours + ' hours';
                }
              } else {
                mypagedatailsres[i].post_end_at = 'This Poll ends in ' + hours + ' hour';
              }
            } else if (minutes != 0 && hours == 0) {
              if (minutes > 1) {
                if (seconds > 50) {
                  var Minutes = minutes + 1;
                  mypagedatailsres[i].post_end_at = 'This Poll ends in ' + Minutes + ' minutes';
                } else {
                  mypagedatailsres[i].post_end_at = 'This Poll ends in ' + minutes + ' minutes';
                }
              } else {
                mypagedatailsres[i].post_end_at = 'This Poll ends in ' + minutes + ' minute';
              }
            } else if (seconds != 0 && minutes == 0 && hours == 0) {
              if (seconds > 1) {
                if (milliseconds > 50) {
                  var Seconds = seconds + 1;
                  mypagedatailsres[i].post_end_at = 'This Poll ends in ' + Seconds + ' seconds';
                } else {
                  mypagedatailsres[i].post_end_at = 'This Poll ends in ' + seconds + ' seconds';
                }
              } else {
                mypagedatailsres[i].post_end_at = 'This Poll ends in ' + seconds + ' second';
              }
            }
            let respdata = mypagedatailsres[i].postvotesusers;
            // console.log(mypagedatailsres[i].post_end_at);
            // console.log(mypagedatailsres[i].feed_published_at);
            // console.log(respdata.length);
            if (this.currentdate > poll_ENDDATE) {
              mypagedatailsres[i].pollshow = 'showresult';
              mypagedatailsres[i].post_end_at = "This Poll is Ended.";
            } else {
              if (respdata.length != 0) {
                var item = mypagedatailsres[i].postvotesusers.find(item => item.user_id == this.CookieService.get('id'));
              }

              if (item != undefined) {
                mypagedatailsres[i].pollshow = 'showresult';
              } else {
                // console.log('Fired');
                mypagedatailsres[i].pollshow = 'showpoll';
              }
            }
          }
        }
        // console.log(mypagedatailsres);
        this.postdatadetails = this.postdatadetails.concat(mypagedatailsres);
        // console.log(this.postdatadetails);
        this.next_page_url = data.data.next_page_url;
        if (this.next_page_url == 'null') {
          $('.loadMore').hide();
          this.message = "Page Feeds Not Found";
        } else {
          $('.loadMore').show();
        }
        this.CookieService.set('Mypagedetailurl', this.next_page_url);
      }
    });
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
          this.postdatadetails[index].postoptions = data.data.postoptions;
          var respData = data.data.postvotesusers;
          if (respData.length != 0) {
            var item = respData.find(item => item.user_id == this.userID);
          }
          if (item != undefined) {
            this.postdatadetails[index].pollshow = 'showresult';
          } else {
            console.log('Fired');
            this.postdatadetails[index].pollshow = 'showpoll';
          }

        }
      });
    } else {
      this.Router.navigate(['login']);
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
          this.postdatadetails[indexID].postviews_count = this.postData.postviews_count;
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
        this.mypagedetail_post.nativeElement.click();
        // this.postsdata[i].feed_published_at;
        // console.log(this.postsdata[i].created_at);
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

  updateMeta(name, desc, metakeys) {
    // console.log(metakeys);
    this.title.setTitle(name);
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ name: 'keywords', content: metakeys })
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
    this.postdatadetails[index].SlickCounter = e.currentSlide + 1 + ' / ' + e.slick.slideCount;
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

  ngOnDestroy() {
    if (this.parametersObservable != null) {
      this.parametersObservable.unsubscribe();
    }
  }

}
