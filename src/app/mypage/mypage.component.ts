import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../services/posts/posts.service';
import { CookieService } from 'ngx-cookie-service';
import { CheckableSettings, CheckedState } from '@progress/kendo-angular-treeview';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { EmbedVideoService } from 'ngx-embed-video';
import { PageService } from '../services/page/page.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxMasonryOptions, NgxMasonryComponent, NgxMasonryModule, NgxMasonryDirective } from 'ngx-masonry';
import { TrendingService } from '../services/trending/trending.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as FileSaver from 'file-saver';
import { MyfavouritesService } from '../services/favourites/myfavourites.service';
import { ServicesService } from '../services/services.service';
import { SharedserviceService } from '../services/sharedservice.service';
import { SEOservicesService } from '../services/seoservices.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MypageComponent implements OnInit {
  private closeModal(): void {
    this.closePost.nativeElement.click();
  }
  externallink;
  date: Date = new Date();
  posDate: any;
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy hh:mm',
    defaultOpen: false
  };
  mm: any;
  dd: any;
  pollminutes: any;
  pollseconds: any;
  pollhours: any;
  videourls: any[];
  postpopdata = {
    title: "",
    schedule_at: "",
    text: "",
    page_id: "",
    id: "",
    category_id: "",
    sub_category_id: "",
    externallink: ''
  }
  yvideourls: any[];
  next_page_url;
  post_single_title: any;
  currentdate;
  pagedataurl;
  iframevideo: any;
  // @ViewChild('myDiv') myDiv: ElementRef;
  @ViewChild('FeedsPOPUP') FeedsPOPUP: ElementRef;
  @ViewChild('deletePost') deletePost: ElementRef;
  @ViewChild('delete_Poll') delete_Poll: ElementRef;
  @ViewChild('responsePOPUP', { read: ElementRef }) private responsePOPUP: ElementRef;
  // @ViewChild('addPoll') addPoll: ElementRef;
  @ViewChild('closePost') closePost: ElementRef;
  @ViewChild('Single_post', { read: ElementRef }) public Single_post: ElementRef;
  @ViewChild('completeModal') completeModal: ElementRef;
  @ViewChild('imageFile1') imageFile1: ElementRef;
  @ViewChild('imageFile2') imageFile2: ElementRef;
  udate;
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
  successMessage: any;
  getudate;
  postinfo = {
    title: "",
    schedule_at: "",
    text: "",
    externallink: "",
    category_id: "",
    sub_category_id: ""
  };
  pollinfo = {
    title: '',
    status: '',
    poll_end_at: '',
    post_option_type: '',
    id: '',
    category_id: "",
    sub_category_id: "",
    text1: '',
    text2: '',
    image1text: '',
    image2text: '',
    selecttimeFrame: ""
  };
  selectdefaultDate: any;
  previewinfo = {
    title: '',
    text: '',
    metaimage: '',
    preview_url: ''
  };
  previewfetch = {
    previewlink: ''
  }
  url;
  editpage;
  template: string = `<img src="assets/images/noimage.jpg" />`
  pageInfo = {
    id: "",
    name: '',
    about: '',
    category_id: '',
    sub_category_id: '',
    page_icon: "",
    page_header: ""
  }
  pollimage1: any;
  pollimage2: any;
  pollimage1data: File = null;
  pollimage2data: File = null;
  yt_iframe_html: any;
  pageHeaderUpload: File = null;
  coverdata = {
    id: "",
    user_id: "",
    name: "",
    about: "",
    category_id: "",
    sub_category_id: "",
    page_icon: "",
    page_header: "",
    status: "",
    created_at: "",
    updated_at: "",
    city: "",
    country: "",
    ip: "",
    device: "",
  };
  moredata;
  pagestringabout;
  postdatadetails: any[];
  message;
  coverName;
  catFinalTree: any[];
  checkedKeys: any[] = [];
  pageIconName: string;
  pageheader;
  fileToUpload: File = null;
  CatTree = [];
  postImagesUpload: any[];
  postimagenames: any[];
  postvideonames: any[];
  postVideoUpload: any[];
  categoryList: any[];
  pageDate = {
    page_name: "",
    page_about: "",
    page_header: "",
    page_icon: "",
    created_at: "",
    city: "",
    country: "",
    category_id: "",
    subcategory_id: "",
    id: ""
  };
  files;
  pagestrg;
  public imagePath;
  imgURL: any;
  category_name;
  subcategory_name;
  subcatname = [];
  datefuture;
  pagedata;
  img;
  urls = new Array<string>();
  public value: Date = new Date();
  public values: Date = new Date();
  dateValue: any;
  polldateValue: any;
  pollcusdate: any;
  updatedateValue: any;
  mediafiles: any;
  postConfigs = { "slidesToShow": 1, "rows": 1, "infinite": true, "autoplay": true, "autoplaySpeed": 2000, "slidesToScroll": 1, "arrows": false, "dots": false };
  timeValue: any;
  userID: any;
  updatetimeValue: any;
  followercount: any;
  followingcount: any;

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
  id: any;
  NextPageURL: any;
  postlikes: any;
  baseURL: any;
  postmessage: any;
  postID: any;
  pollID: any;
  PostID: any;
  Index: any;
  subscription: Subscription;
  checked: any;
  SlickCounter: any;
  constructor(private seoservice: SEOservicesService, private sharedservice: SharedserviceService, private myfavourite: MyfavouritesService, private sanitizer: DomSanitizer, private postservice: PostsService, private trendingservice: TrendingService, private embedService: EmbedVideoService, private PostsService: PostsService, private CookieService: CookieService, private Router: Router, private PageService: PageService, private spinnerService: Ng4LoadingSpinnerService) {
    this.seoservice.updateTitle();
    $('body').removeClass('side-menu-active');
    this.GetCategory();
    this.selectdefaultDate = 'true';
    this.userID = this.CookieService.get('id');
    this.baseURL = ServicesService.API_Share_URL;
    this.isAuthenticated = this.CookieService.get('isAuthenticated');
    this.Getmypage();
  }

  postlike(id, i) {
    if (JSON.parse(this.CookieService.get("isAuthenticated")) == true) {
      console.log(id, i);
      var reqbody = {
        post_id: id,
      }
      this.postservice.postlike(reqbody).subscribe(data => {
        $(".heart_icon" + i).toggleClass("is-active");
        // console.log(data);
        if (data.status_code == "200") {
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

          console.log(this.postdatadetails[i].postlikes_count);
          // this.Getallpostdata();
        }
      });
    } else {
      this.PostID = id;
      this.Index = i;
      this.Router.navigate(['login']);
    }
  }

  public onChangeDate(value): void {
    this.dateValue = value;
    // console.log(this.dateValue);
  }

  public onChangepollDate(value): void {
    this.polldateValue = value;
    // console.log(this.dateValue);
  }

  public onChangeTime(value): void {
    this.timeValue = value;
    // console.log(this.timeValue);
  }
  public onupdateChangeDate(values): void {
    this.updatedateValue = values;
    // console.log(this.dateValue);
  }

  public onupdateChangeTime(values): void {
    this.updatetimeValue = values;
    // console.log(this.timeValue);
  }
  // preview(files) {
  //   if (files.length === 0)
  //     return;

  //   var mimeType = files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.message = "Only images are supported.";
  //     return;
  //   }

  //   var reader = new FileReader();
  //   this.imagePath = files;
  //   reader.readAsDataURL(files[0]); 
  //   reader.onload = (_event) => { 
  //     this.imgURL = reader.result; 
  //   }
  // }

  loadWhatsapp(id, title) {
    var text = title;
    var url = this.baseURL + '/share/' + id;
    var message = encodeURIComponent(text) + " - " + encodeURIComponent(url);
    var whatsapp_url = "whatsapp://send?text=" + message;
    window.location.href = whatsapp_url;
  }

  Getmypage = function () {
    this.PageService.mypage().subscribe(data => {
      if (data.status_code == 200) {
        this.pagedata = data.data.page;
        this.followercount = data.data.followers_count;
        this.followingcount = data.data.following_count;
        this.pagedataurl = data.data.next_page_url;
        if (this.pagedataurl == 'null') {
          $('.loadMore').hide();
        } else {
          $('.loadMore').show();
        }
        this.CookieService.set("Mypageurl", this.pagedataurl);
        this.postdatadetails = data.data.posts;
        if (this.postdatadetails.length == 0) {
          this.postmessage = "Page Feeds Not Found";
          this.FeedsPOPUP.nativeElement.click();
        }
        // console.log(this.postdatadetails);
        this.pageDate = {
          'page_name': this.pagedata.name,
          'page_about': this.pagedata.about,
          'page_header': this.pagedata.page_header,
          'page_icon': this.pagedata.page_icon,
          'created_at': this.pagedata.created_at,
          'city': this.pagedata.city,
          'country': this.pagedata.country,
          "category_id": this.pagedata.category_id,
          "subcategory_id": this.pagedata.subcategory_id,
          "id": this.pagedata.id
        };
        this.pagestrg = this.pageDate.page_about;
        var res = this.pagestrg;
        this.pagestringabout = res;
        this.date = this.pageDate.created_at;

        // get total seconds between the times
        this.date = this.pageDate.created_at;
        var d = new Date(this.date);
        this.getdate = d.toDateString();
        // console.log(this.getdate);
        this.pageDate.created_at = this.getdate.slice(4, 15);
        // console.log(this.pageDate.created_at);
        this.datefuture = new Date(this.date);
        this.currentdate = new Date();

        for (var i = 0; i < this.postdatadetails.length; i++) {
          if (this.postdatadetails[i].preview_url == null) {
            let mainTitle = this.postdatadetails[i].title;
            let titlestrg = mainTitle.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" style="color:#0064c8;" target="_blank">$1</a> ');
            var loadTitle = this.sanitizer.bypassSecurityTrustHtml(titlestrg.replace(/#(\w+)/g, '<a href="/search/%23$1" style="color:#0064c8;" target="_blank">#$1</a>'));
            this.postdatadetails[i].main_title = loadTitle;
          } else {
            let mainTitle = this.postdatadetails[i].title;
            this.postdatadetails[i].main_title = mainTitle;
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
        }
      }
    });
  }

  fetchNextmypagefeeds() {
    var req = this.CookieService.get('Mypageurl');
    this.PageService.Nextmypagefeeds(req).subscribe(resp => {
      if (resp.status_code == '200') {
        let mypagefeedres = resp.data.posts;
        if (mypagefeedres.length == 0) {
          this.postmessage = "Page Feeds Not Found";
          this.FeedsPOPUP.nativeElement.click();
        }
        for (var i = 0; i < mypagefeedres.length; i++) {
          if (mypagefeedres[i].preview_url == null) {
            let mainTitle = mypagefeedres[i].title;
            let titlestrg = mainTitle.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" style="color:#0064c8;" target="_blank">$1</a> ');
            var loadTitle = this.sanitizer.bypassSecurityTrustHtml(titlestrg.replace(/#(\w+)/g, '<a href="/search/%23$1" style="color:#0064c8;" target="_blank">#$1</a>'));
            mypagefeedres[i].main_title = loadTitle;
          } else {
            let mainTitle = mypagefeedres[i].title;
            mypagefeedres[i].main_title = mainTitle;
          }
          if (mypagefeedres[i].postlikes_count == 0) {
            mypagefeedres[i].postlikes_count = '';
          }

          if (mypagefeedres[i].postcomment_count == 0) {
            mypagefeedres[i].postcomment_count = '';
          }

          if (mypagefeedres[i].postviews_count == 0) {
            mypagefeedres[i].postviews_count = '';
          }


          if (mypagefeedres[i].type == '2') {
            var pollenddate = mypagefeedres[i].post_end_at + '.000Z';
            var poll_ENDDATE = new Date(pollenddate);
            this.posDate = mypagefeedres[i].post_end_at + '.000Z';
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
                mypagefeedres[i].post_end_at = 'This Poll ends in ' + days + ' days';
              } else {
                mypagefeedres[i].post_end_at = 'This Poll ends in ' + days + ' day';
              }
            } else if (hours != 0 && days == 0) {
              if (hours > 1) {
                if (minutes > 50) {
                  var Hours = hours + 1;
                  mypagefeedres[i].post_end_at = 'This Poll ends in ' + Hours + ' hours';
                } else {
                  mypagefeedres[i].post_end_at = 'This Poll ends in ' + hours + ' hours';
                }
              } else {
                mypagefeedres[i].post_end_at = 'This Poll ends in ' + hours + ' hour';
              }
            } else if (minutes != 0 && hours == 0) {
              if (minutes > 1) {
                if (seconds > 50) {
                  var Minutes = minutes + 1;
                  mypagefeedres[i].post_end_at = 'This Poll ends in ' + Minutes + ' minutes';
                } else {
                  mypagefeedres[i].post_end_at = 'This Poll ends in ' + minutes + ' minutes';
                }
              } else {
                mypagefeedres[i].post_end_at = 'This Poll ends in ' + minutes + ' minute';
              }
            } else if (seconds != 0 && minutes == 0 && hours == 0) {
              if (seconds > 1) {
                if (milliseconds > 50) {
                  var Seconds = seconds + 1;
                  mypagefeedres[i].post_end_at = 'This Poll ends in ' + Seconds + ' seconds';
                } else {
                  mypagefeedres[i].post_end_at = 'This Poll ends in ' + seconds + ' seconds';
                }
              } else {
                mypagefeedres[i].post_end_at = 'This Poll ends in ' + seconds + ' second';
              }
            }
            let respdata = mypagefeedres[i].postvotesusers;
            // console.log(mypagefeedres[i].post_end_at);
            // console.log(mypagefeedres[i].feed_published_at);
            // console.log(respdata.length);
            if (this.currentdate > poll_ENDDATE) {
              mypagefeedres[i].pollshow = 'showresult';
              mypagefeedres[i].post_end_at = "This Poll is Ended.";
            } else {
              if (respdata.length != 0) {
                var item = mypagefeedres[i].postvotesusers.find(item => item.user_id == this.CookieService.get('id'));
              }

              if (item != undefined) {
                mypagefeedres[i].pollshow = 'showresult';
              } else {
                // console.log('Fired');
                mypagefeedres[i].pollshow = 'showpoll';
              }
            }
          }

          // this.date = mypagefeedres[i].feed_published_at;
          // this.datefuture = new Date(this.date);
          this.posDate = mypagefeedres[i].feed_published_at + '.000Z';
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
              mypagefeedres[i].feed_published_at = days + ' days ago';
            } else {
              mypagefeedres[i].feed_published_at = days + ' day ago';
            }
          } else if (hours != 0 && days == 0) {
            if (hours > 1) {
              if (minutes > 50) {
                var Hours = hours + 1;
                mypagefeedres[i].feed_published_at = Hours + ' hours ago';
              } else {
                mypagefeedres[i].feed_published_at = hours + ' hours ago';
              }
            } else {
              mypagefeedres[i].feed_published_at = hours + ' hour ago';
            }
          } else if (minutes != 0 && hours == 0) {
            if (minutes > 1) {
              if (seconds > 50) {
                var Minutes = minutes + 1;
                mypagefeedres[i].feed_published_at = Minutes + ' minutes ago';
              } else {
                mypagefeedres[i].feed_published_at = minutes + ' minutes ago';
              }
            } else {
              mypagefeedres[i].feed_published_at = minutes + ' minute ago';
            }
          } else if (seconds != 0 && minutes == 0 && hours == 0) {
            if (seconds > 1) {
              if (milliseconds > 50) {
                var Seconds = seconds + 1;
                mypagefeedres[i].feed_published_at = Seconds + ' seconds ago';
              } else {
                mypagefeedres[i].feed_published_at = seconds + ' seconds ago';
              }
            } else {
              mypagefeedres[i].feed_published_at = seconds + ' second ago';
            }
          }

          // if (mypagefeedres[i].yvideos.length != 0) {
          //   this.yt_iframe_html = this.embedService.embed(mypagefeedres[i].yvideos[0].path, {
          //     attr: { width: 300, height: 200 }
          //   });
          //   // console.log(this.yt_iframe_html);
          //   if (this.yt_iframe_html.changingThisBreaksApplicationSecurity != undefined) {
          //     mypagefeedres[i].yvideos[0].path = this.sanitizer.bypassSecurityTrustHtml(this.yt_iframe_html.changingThisBreaksApplicationSecurity);
          //   } else {
          //     mypagefeedres[i].yvideos[0].path = this.yt_iframe_html;
          //   }

          // }
          // if (mypagefeedres[i].videos.length != 0) {
          //   var pattern = new RegExp('(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))'); // fragment locator
          //   var id = pattern.test(mypagefeedres[i].videos[0].path);
          //   if (id == true) {
          //     var res = mypagefeedres[i].videos[0].path.replace("'\'", "");
          //     var regEx = /(width|height)=["']([^"']*)["']/gi;
          //     var resconvert = res.replace(regEx);
          //     var result = resconvert.replace('undefined undefined', 'width="100%" height="350"');
          //     // console.log(result);
          //     this.iframevideo = 'iframeVideo';
          //     mypagefeedres[i].videos[0].path = this.sanitizer.bypassSecurityTrustHtml(result);
          //   } else {
          //     this.iframevideo = 'NormalVideo';
          //     mypagefeedres[i].videos[0].path = mypagefeedres[i].videos[0].path;
          //   }
          // }

          var count = mypagefeedres.length;
          for (let a = 0; a < count; a++) {
            if (mypagefeedres[a].yvideos.length !== 0) {
              this.embedService.embed_image(mypagefeedres[a].yvideos[0].path, { image: 'maxresdefault' }).then(res => {
                // console.log(res.link);
                mypagefeedres[a].yvideos[0].youtubeimage = res.link;
              });
            }
          }

          if (mypagefeedres[i].videos.length != 0) {
            var pattern = new RegExp('(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))'); // fragment locator
            var id = pattern.test(mypagefeedres[i].videos[0].path);
            if (id != true) {
              this.iframevideo = 'NormalVideo';
              mypagefeedres[i].videos[0].path = mypagefeedres[i].videos[0].path;
            }
          }

          // this.postsdata[i].feed_published_at;
          // console.log(this.postsdata[i].created_at);
        }
        this.postdatadetails = this.postdatadetails.concat(mypagefeedres);
        this.pagedataurl = resp.data.next_page_url;
        if (this.pagedataurl == 'null') {
          $('.loadMore').hide();
          // this.message = "Page Feeds Not Found";
        } else {
          $('.loadMore').show();
        }
        this.CookieService.set('Mypageurl', this.pagedataurl);
      }
    });
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


  GetCategory = function () {
    this.PostsService.Getcategory().subscribe(data => {
      if (data.status_code == 200) {
        this.categoryList = data.data;
        for (let i = 0; i < this.categoryList.length; i++) {
          var CatSubTree = [];
          for (let j = 0; j < this.categoryList[i].subcategories.length; j++) {
            var subname = this.categoryList[i].subcategories[j];
            var subnames = subname.category_name;
            CatSubTree.push({
              'category_name': subnames, 'category_id': subname.id
            });

          }
          var maincat = this.categoryList[i];
          var maincats = maincat.category_name;
          if (CatSubTree.length != 0) {
            this.CatTree.push({
              'category_name': maincats, 'category_id': maincat.id, items: CatSubTree
            });
            var CatSubTree = [];
          } else {
            this.CatTree.push({
              'category_name': maincats, 'category_id': maincat.id
            });
          }
        }
        // console.log(this.CatTree);
      }
    });
  }

  // Checkbox check
  public key = 'category_name';
  public isChecked = (dataItem: any, index: string): CheckedState => {
    if (this.containsItem(dataItem)) { return 'checked'; }
    return 'none';
  }

  public containsItem(item: any): boolean {
    return this.checkedKeys.indexOf(item[this.key]) > -1;
  }

  resetForm() {
    this.value = new Date();
    this.postinfo = {
      title: '',
      text: '',
      schedule_at: '',
      externallink: '',
      category_id: "",
      sub_category_id: ""
    };
    this.previewinfo = {
      title: '',
      text: '',
      metaimage: '',
      preview_url: ''
    };
    this.pollinfo = {
      title: '',
      status: '',
      poll_end_at: '',
      post_option_type: '',
      id: '',
      category_id: "",
      sub_category_id: "",
      text1: '',
      text2: '',
      image1text: '',
      image2text: '',
      selecttimeFrame: ""
    }
    this.postVideoUpload = [];
    this.postvideonames = [];
    this.postImagesUpload = [];
    this.postimagenames = [];
    this.urls = [];
    this.dateValue = new Date();
    this.timeValue = new Date();
  }

  handleFileInput(files: FileList) {
    //this.fileToUpload = files.item(0);
    this.postVideoUpload = [];
    this.postvideonames = [];
    for (let e = 0; e < files.length; e++) {

      var str = files[e].name;
      var emailvalid = str.includes(".mp4");
      if (emailvalid == true) {
        console.log(files);
        var multivideofiles = files.item(e);
        this.postVideoUpload.push(multivideofiles);
        this.postvideonames.push({ "videos": multivideofiles.name });
        console.log(emailvalid);
      } else {
        alert("Please Upload Mp4 file");
      }

    }
  }

  postimagesFileInput(files) {
    this.postImagesUpload = [];
    this.postimagenames = [];
    this.urls = [];
    for (let s = 0; s < files.length; s++) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.urls.push(e.target.result);
        console.log(this.urls);
      }
      reader.readAsDataURL(files.item(s));
      var multifiles = files.item(s);
      this.postImagesUpload.push(multifiles);
      console.log(this.postImagesUpload);
      this.postimagenames.push({ "images": multifiles.name });

    }
    // console.log(this.postImagesUpload);
    // this.postImagesUpload = files.item(0);
  }

  handlepageFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.pageIconName = this.fileToUpload.name;
  }

  remove(i) {
    var index = this.urls.indexOf(i);
    this.urls.splice(index, 1);
    this.postImagesUpload.splice(index, 1);
    console.log(this.urls, this.postImagesUpload);
  }

  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.urls.push(e.target.result);
          console.log(this.urls);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  pageHeaderFileInput(files: FileList) {
    this.pageHeaderUpload = files.item(0);
    this.pageheader = this.pageHeaderUpload.name;
  }

  addPost(postinfo) {

    this.spinnerService.show();
    this.catFinalTree = [];
    for (let i = 0; i < this.categoryList.length; i++) {

      for (let j = 0; j < this.categoryList[i].subcategories.length; j++) {
        var subname = this.categoryList[i].subcategories[j];
        var subnames = subname.category_name;
        this.catFinalTree.push({
          'category_name': subnames, 'sub_category_id': subname.id, 'main_category_id': subname.category_id
        });
      }

      var maincat = this.categoryList[i];
      var maincats = maincat.category_name;
      this.catFinalTree.push({
        'category_name': maincats, 'category_id': maincat.id
      });
    }

    console.log(this.checkedKeys);

    var catcheck = this.checkedKeys;
    var filteredArray = this.catFinalTree.filter(function (items) {
      return catcheck.indexOf(items.category_name) > -1;
    });
    // console.log(this.catFinalTree);
    // console.log(filteredArray);
    // var maincatarry = [];
    var subcatarry = [];
    for (let h = 0; h < filteredArray.length; h++) {
      subcatarry.push({ "subcatid": filteredArray[h].sub_category_id, "submaincatid": filteredArray[h].main_category_id, "maincatid": filteredArray[h].category_id });
    }
    // console.log(maincatarry);
    console.log(subcatarry);

    // for (let m = 0; m < maincatarry.length; m++) {
    //   fr.append("categories[" + [m] + "][category_id]", maincatarry[m].maincatid);
    // }
    // for (let j = 0; j < subcatarry.length; j++) {
    //   fr.append("categories[" + [j] + "][subcategory_id]", subcatarry[j].subcatid);
    // }
    const fr = new FormData();
    for (let q = 0; q < subcatarry.length; q++) {
      if (subcatarry[q].subcatid != undefined && subcatarry[q].maincatid == undefined) {
        fr.append("categories[" + [q] + "][category_id]", subcatarry[q].submaincatid);
        fr.append("categories[" + [q] + "][subcategory_id]", subcatarry[q].subcatid);
      } else {
        fr.append("categories[" + [q] + "][category_id]", subcatarry[q].maincatid);
      }
    }
    if (this.postImagesUpload != undefined) {
      for (let d = 0; d < this.postImagesUpload.length; d++) {
        fr.append('images[' + [d] + '][path]', this.postImagesUpload[d]);
      }
    }
    // if (file != undefined) {
    //   fd.append('file', file);
    // } else if (file == undefined) {
    //   fd.append("file", new File([""], "emptyFile.jpg"));
    // }
    if (this.postVideoUpload != undefined) {
      for (let f = 0; f < this.postVideoUpload.length; f++) {
        fr.append('videos[' + [f] + '][path]', this.postVideoUpload[f]);
      }
    }

    console.log(this.dateValue);
    console.log(this.timeValue);

    var date = new Date(this.dateValue);
    var mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);
    var year = date.getFullYear();
    var Dnewdate = year + '-' + mnth + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;


    var Tdate = new Date(this.timeValue);
    var Tmnth = ("0" + (Tdate.getMonth() + 1)).slice(-2);
    var Tday = ("0" + Tdate.getDate()).slice(-2);
    var Thours = ("0" + Tdate.getHours()).slice(-2);
    var Tminutes = ("0" + Tdate.getMinutes()).slice(-2);
    var Tseconds = ("0" + Tdate.getSeconds()).slice(-2);
    var Tyear = Tdate.getFullYear();
    var Tnewdate = Tyear + '-' + Tmnth + '-' + Tday + ' ' + Thours + ':' + Tminutes + ':' + Tseconds;


    if (Dnewdate == Tnewdate) {
      var newdate = Dnewdate;
      console.log(newdate);
    } else if (Tnewdate != Dnewdate) {
      var Dateresults = Dnewdate.localeCompare(Tnewdate);
      if (Dateresults == 1) {
        var newdate = Dnewdate;
      } else if (Dateresults == -1) {
        var newdate = Tnewdate;
      }
      console.log(newdate);
    }


    var request = {
      title: postinfo.title,
      description: postinfo.text,
      schedule_at: newdate,
      externallink: postinfo.externallink,
    };

    if (request.externallink == '') {
      fr.append('title', request.title);
      fr.append('description', request.description);
      fr.append('schedule_at', request.schedule_at);
      fr.append('status', "1");
      // fr.append('yvideos[0][path]', request.externallink);
    } else {
      fr.append('title', request.title);
      fr.append('description', request.description);
      fr.append('schedule_at', request.schedule_at);
      fr.append('yvideos[0][path]', request.externallink);
      fr.append('status', "1");
    }
    // console.log(fr);
    this.PostsService.createPost(fr).subscribe(data => {
      if (data.status_code == 201) {
        document.getElementById('resetid').click();
        this.message = data.message;
        // alert(this.message);
        this.responsePOPUP.nativeElement.click();
        this.Getmypage();
      } else {
        alert(data.message);
      }
    });
  }


  coverInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.coverName = this.fileToUpload.name;
  }

  covernamepic() {
    this.PageService.mypage().subscribe(data => {
      if (data.status_code == "200") {
        this.coverdata = data.page;
        const fr = new FormData();
        fr.append('id', this.coverdata.id);
        //fr.append('user_id', this.coverdata.user_id);
        fr.append('name', this.coverdata.name);

        fr.append('about', this.coverdata.about);
        fr.append('category_id', this.coverdata.category_id);
        //fr.append('sub_category_id',this.coverdata.sub_category_id);
        fr.append('page_icon', this.coverdata.page_icon);
        fr.append('page_header', this.fileToUpload);
        this.PageService.createPage(fr).subscribe(
          data => {
            console.log(data);
            if (data.status_code == "200") {
              this.PageService.mypage().subscribe(data => { });
              this.message = data.message;
              alert(this.message);
              // this.myDiv.nativeElement.click();
            }
          });
      }
    });

  }


  deletePoll(pollId) {
    this.pollID = pollId;
    // var reqid = {
    //   post_id: pollId
    // }
    // this.PostsService.deletepoll(reqid).subscribe(data => {
    //   if (data.status_code == "200") {
    //     this.message = data.message;
    //     console.log(this.message);
    //     alert(this.message);
    //     this.Getmypage();
    //   }
    // });
    this.delete_Poll.nativeElement.click();
  }

  Cofirmpolldelete(pollId) {
    var reqid = {
      post_id: pollId
    }
    this.PostsService.deletepoll(reqid).subscribe(data => {
      if (data.status_code == "200") {
        this.message = data.message;
        // console.log(this.message);
        // document.getElementById('closePoll').click();
        $("#closePoll .modal button").click();
        this.responsePOPUP.nativeElement.click();
        // alert(this.message);
        this.Getmypage();
      }
    });
  }

  Cofirmpostdelete(id) {
    console.log(id);
    var reqid = {
      post_id: id
    }
    this.PostsService.deletepost(reqid).subscribe(data => {
      if (data.status_code == "200") {
        this.message = data.message;
        // console.log(this.message);
        $("#closePost .modal button").click();
        this.responsePOPUP.nativeElement.click();
        // alert(this.message);
        this.Getmypage();
      }
    });
  }

  deletepost(id) {
    this.postID = id;
    // console.log(this.deletePost.nativeElement);
    this.deletePost.nativeElement.click();
    // var reqid = {
    //   post_id: id
    // }
    // this.PostsService.deletepost(reqid).subscribe(data => {
    //   if (data.status_code == "200") {
    //     this.message = data.message;
    //     console.log(this.message);
    //     alert(this.message);
    //     this.Getmypage();
    //   }
    // });
  }

  editpost(pageDate) {
    this.editpage = true;
    console.log(pageDate);
    this.pageInfo = {
      id: pageDate.id,
      name: pageDate.page_name,
      about: pageDate.page_about,
      page_icon: pageDate.page_icon,
      page_header: pageDate.page_header,
      category_id: this.pageDate.category_id,
      sub_category_id: this.pageDate.subcategory_id,
    }
    this.PostsService.Getcategory().subscribe(data => {
      this.categoryList = data.data;
    });
    console.log(this.categoryList);
    console.log(pageDate);
    var index = this.categoryList.findIndex(function (item, i) {
      return item.id == pageDate.category_id.toString();
    });

    var indexed = this.categoryList[index].subcategories.findIndex(function (item, i) {
      return item.id == pageDate.subcategory_id.toString();
    });
    console.log(index);
    this.subcategory_name = this.categoryList[index].subcategories[indexed].category_name;
    // this.category_name = this.categoryList[index].category_name;
    this.checkedKeys = [this.subcategory_name];
    console.log(this.checkedKeys);

    // this.checkedKeys = [this.subcategory_name];
    // console.log(this.checkedKeys);
    // console.log(this.category_name,this.subcategory_name);
  }

  AddPage(pageInfo) {
    console.log(pageInfo);
    this.spinnerService.show();
    this.catFinalTree = [];
    console.log(this.categoryList);
    for (let i = 0; i < this.categoryList.length; i++) {
      for (let j = 0; j < this.categoryList[i].subcategories.length; j++) {
        var subname = this.categoryList[i].subcategories[j];
        var subnames = subname.category_name;
        this.catFinalTree.push({
          'category_name': subnames, 'sub_category_id': subname.id, 'category_id': subname.category_id
        });
      }
      var maincat = this.categoryList[i];
      var maincats = maincat.category_name;
      this.catFinalTree.push({
        'category_name': maincats, 'category_id': maincat.id
      });
    }
    // console.log(this.catFinalTree);
    var catcheck = this.checkedKeys;
    // console.log(catcheck);
    var filteredArray = this.catFinalTree.filter(function (items) {
      return catcheck.indexOf(items.category_name) > -1;
    });
    // console.log(filteredArray);
    var maincatarry = [];
    var subcatarry = [];
    for (let h = 0; h < filteredArray.length; h++) {
      if (filteredArray[h].sub_category_id) {
        subcatarry.push(filteredArray[h].sub_category_id);
        maincatarry.push(filteredArray[h].category_id);
      } else {
        maincatarry.push(filteredArray[h].category_id);
      }
    }
    // console.log(maincatarry.toString());
    // console.log(subcatarry.toString());

    var request = {
      name: pageInfo.name,
      about: pageInfo.about,
      category_id: maincatarry.toString(),
      sub_category_id: subcatarry.toString(),
      id: pageInfo.id
    };

    console.log(request);

    if (this.fileToUpload) {
      this.fileToUpload = this.fileToUpload;
    } else {
      this.fileToUpload = this.coverName;
    }
    console.log(this.fileToUpload);

    if (this.pageHeaderUpload) {
      this.pageHeaderUpload = this.pageHeaderUpload;
    } else {
      this.pageHeaderUpload = this.pageheader;
      console.log(this.pageHeaderUpload);
    }
    // console.log(this.pageHeaderUpload);

    // console.log(request);
    const fr = new FormData();
    if (this.pageIconName == undefined && this.pageheader == undefined) {
      fr.append('id', request.id);
      fr.append('name', request.name);
      fr.append('about', request.about);
      fr.append('category_id', request.category_id);
      fr.append('subcategory_id', request.sub_category_id);
    }

    if (this.pageheader != undefined) {
      fr.append('id', request.id);
      fr.append('name', request.name);
      fr.append('about', request.about);
      fr.append('category_id', request.category_id);
      fr.append('subcategory_id', request.sub_category_id);
      //  fr.append('page_icon', this.pageIconName);
      fr.append('page_header', this.pageHeaderUpload);
    }

    if (this.pageIconName != undefined) {
      fr.append('id', request.id);
      fr.append('name', request.name);
      fr.append('about', request.about);
      fr.append('category_id', request.category_id);
      fr.append('subcategory_id', request.sub_category_id);
      //fr.append('page_header', this.fileToUpload);
      fr.append('page_icon', this.fileToUpload);
    }
    // console.log(fr);
    // console.log(this.checkedKeys);
    // console.log(this.categoryList);
    this.PageService.createPage(fr).subscribe(
      data => {
        document.getElementById('linkid').click()
        if (data.status_code == "200") {
          this.spinnerService.hide();
          this.message = data.message
          this.editpage = false;
          // alert(this.message);
          this.responsePOPUP.nativeElement.click();
          this.Getmypage();
        } else {
          this.editpage = false;
          this.message = data.message
          // alert(this.message);
          this.responsePOPUP.nativeElement.click();
        }

      });

  }

  postpopup(post) {
    //this.spinner.show();
    // console.log(post);
    if (post.yvideos.length == "0") {
      this.externallink = ""
    } else {
      this.externallink = post.yvideos[0].path
    }

    if (post.postcategories.length == "1") {
      var index = this.categoryList.findIndex(function (item, i) {
        return item.id == post.postcategories[0].category_id.toString();
      });

      var indexed = this.categoryList[index].subcategories.findIndex(function (item, i) {
        return item.id == post.postcategories[0].subcategory_id.toString();
      });
      // console.log(index);
      this.subcategory_name = this.categoryList[index].subcategories[indexed].category_name;
      // this.category_name = this.categoryList[index].category_name;
      this.checkedKeys = [this.subcategory_name];
      // console.log(this.checkedKeys);
    } else {
      // console.log(post.postcategories);
      for (let k = 0; k < post.postcategories.length; k++) {
        var index = this.categoryList.findIndex(function (item, i) {
          return item.id == post.postcategories[k].category_id.toString();
        });

        var indexed = this.categoryList[index].subcategories.findIndex(function (item, i) {
          return item.id == post.postcategories[k].subcategory_id.toString();
        });
        // console.log(index);
        this.subcategory_name = this.categoryList[index].subcategories[indexed].category_name;
        this.subcatname.push(this.subcategory_name);
      }
      // console.log(this.subcatname);
      // this.category_name = this.categoryList[index].category_name;
      this.checkedKeys = this.subcatname;
      // console.log(this.checkedKeys);
    }
    this.postpopdata = {
      title: post.title,
      schedule_at: post.schedule_at,
      text: post.description,
      page_id: post.page_id,
      id: post.id,
      externallink: this.externallink,
      category_id: post.postcategories[0].category_id,
      sub_category_id: post.postcategories[0].subcategory_id,

    }

    if (post.images.length != "0") {
      this.urls = [];
      for (var i = 0; i < post.images.length; i++) {
        this.urls.push(post.images[i].path);
        //  console.log(this.urls);
      }
    }
    if (post.videos.length != "0") {
      this.videourls = [];
      for (var i = 0; i < post.videos.length; i++) {
        this.videourls.push(post.videos[i].path);
        // console.log(this.videourls);
      }
    }
    if (post.yvideos.length != "0") {
      this.yvideourls = [];
      for (var i = 0; i < post.yvideos.length; i++) {
        this.yvideourls.push(post.yvideos[i].path.changingThisBreaksApplicationSecurity);
        console.log(this.yvideourls);
      }
    }
    // var index = this.categoryList.findIndex(function (item, i) {
    //   return item.id == post.postcategories[0].category_id.toString();
    // });
    // this.subcategory_name = this.categoryList[index].subcategories[post.postcategories[index].category_name];
    // this.checkedKeys = [this.subcategory_name.category_name];
    // console.log(this.checkedKeys);

  }

  updatepost(postpopdata) {
    document.getElementById('postid').click();
    this.spinnerService.show();
    this.catFinalTree = [];
    for (let i = 0; i < this.categoryList.length; i++) {

      for (let j = 0; j < this.categoryList[i].subcategories.length; j++) {
        var subname = this.categoryList[i].subcategories[j];
        var subnames = subname.category_name;
        this.catFinalTree.push({
          'category_name': subnames, 'sub_category_id': subname.id, 'main_category_id': subname.category_id
        });
      }

      var maincat = this.categoryList[i];
      var maincats = maincat.category_name;
      this.catFinalTree.push({
        'category_name': maincats, 'category_id': maincat.id
      });
    }

    var catcheck = this.checkedKeys;
    // console.log(catcheck);
    var sorted_arr = catcheck.slice().sort();
    var Finalresults = [];
    for (var i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] == sorted_arr[i]) {
        Finalresults.push(sorted_arr[i]);
      }
    }
    // console.log(Finalresults);
    var filteredArray = this.catFinalTree.filter(function (items) {
      return Finalresults.indexOf(items.category_name) > -1;
    });
    // console.log(this.catFinalTree);
    // console.log(filteredArray);
    // var maincatarry = [];
    var subcatarry = [];
    for (let h = 0; h < filteredArray.length; h++) {
      subcatarry.push({ "subcatid": filteredArray[h].sub_category_id, "submaincatid": filteredArray[h].main_category_id, "maincatid": filteredArray[h].category_id });
    }
    // console.log(maincatarry);
    // console.log(subcatarry);

    // for (let m = 0; m < maincatarry.length; m++) {
    //   fr.append("categories[" + [m] + "][category_id]", maincatarry[m].maincatid);
    // }
    // for (let j = 0; j < subcatarry.length; j++) {
    //   fr.append("categories[" + [j] + "][subcategory_id]", subcatarry[j].subcatid);
    // }
    const fr = new FormData();
    for (let q = 0; q < subcatarry.length; q++) {
      if (subcatarry[q].subcatid != undefined && subcatarry[q].maincatid == undefined) {
        fr.append("categories[" + [q] + "][category_id]", subcatarry[q].submaincatid);
        fr.append("categories[" + [q] + "][subcategory_id]", subcatarry[q].subcatid);
      } else {
        fr.append("categories[" + [q] + "][category_id]", subcatarry[q].maincatid);
      }
    }
    if (this.postImagesUpload != undefined) {
      for (let d = 0; d < this.postImagesUpload.length; d++) {
        fr.append('images[' + [d] + '][path]', this.postImagesUpload[d]);
      }
    }
    // if (file != undefined) {
    //   fd.append('file', file);
    // } else if (file == undefined) {
    //   fd.append("file", new File([""], "emptyFile.jpg"));
    // }
    if (this.postVideoUpload != undefined) {
      for (let f = 0; f < this.postVideoUpload.length; f++) {
        fr.append('videos[' + [f] + '][path]', this.postVideoUpload[f]);
      }
    }

    console.log(this.dateValue);
    console.log(this.timeValue);

    var date = new Date(this.dateValue);
    var mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);
    var year = date.getFullYear();
    var Dnewdate = year + '-' + mnth + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;


    var Tdate = new Date(this.timeValue);
    var Tmnth = ("0" + (Tdate.getMonth() + 1)).slice(-2);
    var Tday = ("0" + Tdate.getDate()).slice(-2);
    var Thours = ("0" + Tdate.getHours()).slice(-2);
    var Tminutes = ("0" + Tdate.getMinutes()).slice(-2);
    var Tseconds = ("0" + Tdate.getSeconds()).slice(-2);
    var Tyear = Tdate.getFullYear();
    var Tnewdate = Tyear + '-' + Tmnth + '-' + Tday + ' ' + Thours + ':' + Tminutes + ':' + Tseconds;


    if (Dnewdate == Tnewdate) {
      var newdate = Dnewdate;
      console.log(newdate);
    } else if (Tnewdate != Dnewdate) {
      var Dateresults = Dnewdate.localeCompare(Tnewdate);
      if (Dateresults == 1) {
        var newdate = Dnewdate;
      } else if (Dateresults == -1) {
        var newdate = Tnewdate;
      }
      console.log(newdate);
    }


    var request = {
      title: postpopdata.title,
      description: postpopdata.text,
      schedule_at: postpopdata.schedule_at,
      externallink: postpopdata.externallink,
      page_id: postpopdata.page_id,
      id: postpopdata.id,
    };

    if (request.externallink == "") {
      fr.append('title', request.title);
      fr.append('description', request.description);
      fr.append('schedule_at', request.schedule_at);
      fr.append('status', "1");
      fr.append('page_id', postpopdata.page_id);
      fr.append('id', postpopdata.id);
      // fr.append('yvideos[0][path]', request.externallink);
    } else {
      fr.append('title', request.title);
      fr.append('description', request.description);
      fr.append('schedule_at', request.schedule_at);
      fr.append('yvideos[0][path]', request.externallink);
      fr.append('status', "1");
      fr.append('page_id', postpopdata.page_id);
      fr.append('id', postpopdata.id);
    }
    console.log(fr);
    this.PageService.updatepost(fr).subscribe(data => {
      this.message = data.message;
      // alert(this.message);
      this.responsePOPUP.nativeElement.click();
      this.Getmypage();

    });
  }


  // Polls creation //
  ActiveTextPoll() {
    this.imageFile1.nativeElement.value = '';
    this.imageFile2.nativeElement.value = '';
    this.pollinfo.image1text = '';
    this.pollinfo.image2text = '';
    $('#Image_Poll').hide();
    $('#Text_Poll').show();
    $('#imageactive').removeClass('active');
    $('#textactive').addClass('active');
    $('#polltype').val('TEXT');
  }

  ActiveImgPoll() {
    this.pollinfo.text1 = '';
    this.pollinfo.text2 = '';
    $('#Text_Poll').hide();
    $('#Image_Poll').show();
    $('#textactive').removeClass('active');
    $('#imageactive').addClass('active');
    $('#polltype').val('IMAGE');
  }

  // Poll Image option1 //
  pollimage1upload(files: FileList) {
    this.pollimage1data = files.item(0);
    this.pollimage1 = this.pollimage1data.name;
  }

  // Poll Image option2 //
  pollimage2upload(files: FileList) {
    this.pollimage2data = files.item(0);
    this.pollimage2 = this.pollimage2data.name;
  }

  onpollchnage(res) {
    if (res == 0) {
      $('#showcustom').show();
    } else {
      $('#showcustom').hide();
    }
  }


  CreatePoll(pollinfo) {
    console.log(pollinfo);
    const gh = new FormData();
    this.catFinalTree = [];
    for (let i = 0; i < this.categoryList.length; i++) {
      for (let j = 0; j < this.categoryList[i].subcategories.length; j++) {
        var subname = this.categoryList[i].subcategories[j];
        var subnames = subname.category_name;
        this.catFinalTree.push({
          'category_name': subnames, 'sub_category_id': subname.id, 'main_category_id': subname.category_id
        });
      }
      var maincat = this.categoryList[i];
      var maincats = maincat.category_name;
      this.catFinalTree.push({
        'category_name': maincats, 'category_id': maincat.id
      });
    }
    // console.log(this.checkedKeys);
    var catcheck = this.checkedKeys;
    var filteredArray = this.catFinalTree.filter(function (items) {
      return catcheck.indexOf(items.category_name) > -1;
    });
    var subcatarry = [];
    for (let h = 0; h < filteredArray.length; h++) {
      subcatarry.push({ "subcatid": filteredArray[h].sub_category_id, "submaincatid": filteredArray[h].main_category_id, "maincatid": filteredArray[h].category_id });
    }
    // console.log(subcatarry);
    const fr = new FormData();
    for (let q = 0; q < subcatarry.length; q++) {
      if (subcatarry[q].subcatid != undefined && subcatarry[q].maincatid == undefined) {
        gh.append("categories[" + [q] + "][category_id]", subcatarry[q].submaincatid);
        gh.append("categories[" + [q] + "][subcategory_id]", subcatarry[q].subcatid);
      } else {
        gh.append("categories[" + [q] + "][category_id]", subcatarry[q].maincatid);
      }
    }


    var polldate = new Date();
    if (pollinfo.selecttimeFrame == 7) {
      polldate.setDate(polldate.getDate() + 7);
    } else if (pollinfo.selecttimeFrame == 1) {
      polldate.setDate(polldate.getDate() + 1);
    }
    let current_datetime = polldate;
    this.mm = current_datetime.getMonth() + 1;
    this.dd = current_datetime.getDate();
    this.pollhours = current_datetime.getHours();
    this.pollminutes = current_datetime.getMinutes();
    this.pollseconds = current_datetime.getSeconds();
    if (this.dd < 10) {
      this.dd = '0' + this.dd;
    }
    if (this.mm < 10) {
      this.mm = '0' + this.mm;
    }
    if (this.pollminutes < 10) {
      this.pollminutes = '0' + this.pollminutes;
    }
    if (this.pollseconds < 10) {
      this.pollseconds = '0' + this.pollseconds;
    }
    if (this.pollhours < 10) {
      this.pollhours = '0' + this.pollhours;
    }
    let formatted_date = current_datetime.getFullYear() + "-" + this.mm + "-" + this.dd + " " + this.pollhours + ":" + this.pollminutes + ":" + this.pollseconds;
    // console.log(formatted_date);
    if (pollinfo.selecttimeFrame == 0) {
      // console.log(this.polldateValue);
      var date = new Date(this.polldateValue);
      var mnth = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      var hours = ("0" + date.getHours()).slice(-2);
      var minutes = ("0" + date.getMinutes()).slice(-2);
      var seconds = ("0" + date.getSeconds()).slice(-2);
      var year = date.getFullYear();
      var Dnewdate = year + '-' + mnth + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
      // console.log(Dnewdate);
      this.pollcusdate = Dnewdate;
    }

    var PollType = $('#polltype').val();
    if (PollType == 'TEXT') {
      if (pollinfo.title != '' && pollinfo.text1 != '' && pollinfo.text2 != '' && pollinfo.selecttimeFrame != '') {
        gh.append('post_option_type', '1');
        gh.append('status', '1');
        gh.append('title', pollinfo.title);
        gh.append('options[0][text]', pollinfo.text1);
        gh.append('options[1][text]', pollinfo.text2);
        if (pollinfo.selecttimeFrame == 1 || pollinfo.selecttimeFrame == 7) {
          gh.append('poll_end_at', formatted_date);
        } else if (pollinfo.selecttimeFrame == 0) {
          gh.append('poll_end_at', this.pollcusdate);
        }
        // console.log(gh);
      } else {
        alert('Please Check Text Poll Required Fields');
      }
    }
    if (PollType == 'IMAGE') {
      // console.log(this.pollimage1data);
      // console.log(this.pollimage2data);
      // console.log(pollinfo.selecttimeFrame);
      // console.log(pollinfo.title);
      // console.log(pollinfo.image1text);
      // console.log(pollinfo.image2text);
      if (this.pollimage1data && this.pollimage2data && pollinfo.selecttimeFrame != '' && pollinfo.title != '' && pollinfo.image1text != '' && pollinfo.image2text != '') {
        gh.append('post_option_type', '2');
        gh.append('status', '1');
        gh.append('title', pollinfo.title);
        gh.append('options[0][path]', this.pollimage1data);
        gh.append('options[1][path]', this.pollimage2data);
        if (pollinfo.selecttimeFrame == 1 || pollinfo.selecttimeFrame == 7) {
          gh.append('poll_end_at', formatted_date);
        } else if (pollinfo.selecttimeFrame == 0) {
          gh.append('poll_end_at', this.pollcusdate);
        }
        // gh.append('poll_end_at', formatted_date);
        gh.append('options[0][text]', pollinfo.image1text);
        gh.append('options[1][text]', pollinfo.image2text);
      } else {
        alert('Please Check Image Poll Required Fields');
      }
    }
    this.PostsService.createPoll(gh).subscribe(data => {
      if (data.status_code == 201) {
        document.getElementById('resetid').click();
        this.successMessage = data.message;
        // alert(this.successMessage);
        this.responsePOPUP.nativeElement.click();
        this.Getmypage();
      } else {
        alert(data.message);
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

  // get preview link info //
  getMetadata(url) {
    if (url.previewlink != '') {
      var request = {
        "meta_url": url.previewlink
      }
      this.postservice.fetchmeta(request).subscribe(data => {
        if (data.status_code == '200') {
          this.previewinfo.title = data.data.title;
          this.previewinfo.text = data.data.description;
          this.previewinfo.preview_url = url.previewlink;
          this.previewinfo.metaimage = data.data.image;
        } else {
          alert(data.message);
        }
      });
    } else {
      alert('Please enter preview URL.');
    }
  }

  previewCreate(previewinfo) {
    const gh = new FormData();
    this.catFinalTree = [];
    for (let i = 0; i < this.categoryList.length; i++) {
      for (let j = 0; j < this.categoryList[i].subcategories.length; j++) {
        var subname = this.categoryList[i].subcategories[j];
        var subnames = subname.category_name;
        this.catFinalTree.push({
          'category_name': subnames, 'sub_category_id': subname.id, 'main_category_id': subname.category_id
        });
      }
      var maincat = this.categoryList[i];
      var maincats = maincat.category_name;
      this.catFinalTree.push({
        'category_name': maincats, 'category_id': maincat.id
      });
    }
    // console.log(this.checkedKeys);
    var catcheck = this.checkedKeys;
    var filteredArray = this.catFinalTree.filter(function (items) {
      return catcheck.indexOf(items.category_name) > -1;
    });
    var subcatarry = [];
    for (let h = 0; h < filteredArray.length; h++) {
      subcatarry.push({ "subcatid": filteredArray[h].sub_category_id, "submaincatid": filteredArray[h].main_category_id, "maincatid": filteredArray[h].category_id });
    }
    // console.log(subcatarry);
    const fr = new FormData();
    for (let q = 0; q < subcatarry.length; q++) {
      if (subcatarry[q].subcatid != undefined && subcatarry[q].maincatid == undefined) {
        gh.append("categories[" + [q] + "][category_id]", subcatarry[q].submaincatid);
        gh.append("categories[" + [q] + "][subcategory_id]", subcatarry[q].subcatid);
      } else {
        gh.append("categories[" + [q] + "][category_id]", subcatarry[q].maincatid);
      }
    }


    var pdate = new Date();
    var pmnth = ("0" + (pdate.getMonth() + 1)).slice(-2);
    var pday = ("0" + pdate.getDate()).slice(-2);
    var phours = ("0" + pdate.getHours()).slice(-2);
    var pminutes = ("0" + pdate.getMinutes()).slice(-2);
    var pseconds = ("0" + pdate.getSeconds()).slice(-2);
    var pyear = pdate.getFullYear();
    var previewdate = pyear + '-' + pmnth + '-' + pday + ' ' + phours + ':' + pminutes + ':' + pseconds;

    // console.log(previewinfo);
    if (previewinfo.title != '') {
      gh.append("title", previewinfo.title);
    }
    if (previewinfo.text != '') {
      gh.append("description", previewinfo.text);
    }
    if (previewinfo.metaimage != '') {
      gh.append("preview_image", previewinfo.metaimage);
    }
    if (previewinfo.preview_url != '') {
      gh.append("preview_url", previewinfo.preview_url);
    }
    if (this.checkedKeys.length != 0) {
      gh.append("status", '1');
      gh.append("schedule_at", previewdate);
      this.PostsService.createPost(gh).subscribe(data => {
        if (data.status_code == 201) {
          document.getElementById('resetid').click();
          this.message = data.message;
          // alert(this.message);
          this.responsePOPUP.nativeElement.click();
          this.Getmypage();
        } else {
          this.message = data.message;
          // alert(data.message);
          this.responsePOPUP.nativeElement.click();
        }
      });
    } else {
      // alert("Please select any categories");
      this.message = 'Please select any categories';
      this.responsePOPUP.nativeElement.click();
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
        this.Single_post.nativeElement.click();
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
      this.CookieService.set('afterLoginURL', JSON.stringify('mypage'));
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
      this.CookieService.set('afterLoginURL', JSON.stringify('mypage'));
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
      this.CookieService.set('afterLoginURL', JSON.stringify('mypage'));
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
              //   alert(this.message);
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
        //  alert(this.message);
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
    $('#polltype').val('TEXT');
    $('.createPoll').hide();
    $('.createPreview').hide();
    $('#PollTab').click(function () {
      $('.pollHide').hide();
      $('.Pollcreate').show();
      $('.createPost').hide();
      $('.createPoll').show();
      $('.previewcreate').hide();
      $('.createPreview').hide();
    });
    $('#PreviewTab').click(function () {
      $('.pollHide').hide();
      $('.Pollcreate').hide();
      $('.createPost').hide();
      $('.createPoll').hide();
      $('.createPreview').show();
      $('.previewcreate').show();
    });
    $('.tab1primary, .tab2primary, .tab3primary, .tab4primary').click(function () {
      $('.pollHide').show();
      $('.previewcreate').hide();
      $('.Pollcreate').hide();
      $('.createPreview').hide();
      $('.createPost').show();
      $('.createPoll').hide();
    });
  }

}
