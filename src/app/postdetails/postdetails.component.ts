import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PostsService } from '../services/posts/posts.service';
import { ServicesService } from '../services/services.service';
import { EmbedVideoService } from 'ngx-embed-video';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MyfavouritesService } from '../services/favourites/myfavourites.service';
import * as FileSaver from 'file-saver';
import { SEOservicesService } from '../services/seoservices.service';


@Component({
  selector: 'postdetails',
  templateUrl: './postdetails.component.html',
  styleUrls: ['./postdetails.component.css']
})
export class PostdetailsComponent implements OnInit {
  pageid;
  postData: any;
  yt_iframe_html;
  date;
  posDate: any;
  datefuture;
  Bannerdata = [];
  loginauthenticated;
  currentdate;
  slides: any[];
  iframevideo;
  images;
  NextPageURL: any;
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
  image;
  imagePath;
  limit = 15;
  message: string;
  videos;
  titlestrg;
  showfavourite: any;
  CommentData: any[];
  CommentDatas: any;
  mediafiles: any;
  post_single_desc: any;
  postid: any;
  page_comment_status: any;
  postcategories_comment_count: any;
  post_comment_status: any;
  pageDetails: any;
  page_ID: any;
  page_name: any;
  page_icon: any;
  postlikes_count: any;
  postcomment_count: any;
  postviews_count: any;
  post_title: any;
  post_description: any;
  feed_published_at: any;
  postimages: any;
  postVideoslength: any;
  postyvideos: any;
  postVideosiframe: any;
  postVideos: any;

  template: string = `<img class="loader-img" src="assets/images/loading.gif" />`;
  slideConfigs = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 6000, "arrows": false };
  postConfigs = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 6000, "arrows": true, "dots": false };
  slideConfig = {
    "slidesToShow": 5, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 6000, "arrows": false, responsive: [{

      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
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
  baseURL: string;
  isLoggedIn: any;
  user_id: any;
  CommentLength: any;
  BannerData: any;
  postcatstatus: any;
  pageCommentstatus: any;
  private parametersObservable: any;
  myfav: any;
  rssfeed: any;
  constructor(private meta: Meta, private title: Title, private seoservice: SEOservicesService, private myfavourite: MyfavouritesService, private ngxspinner: NgxSpinnerService, private Router: Router, private route: ActivatedRoute, private postservice: PostsService, private embedService: EmbedVideoService, private sanitizer: DomSanitizer, private CookieService: CookieService, private router: Router) {
    this.seoservice.updateTitle();
    this.meta.removeTag('name="name"');
    this.meta.removeTag('name="description"');
    this.meta.removeTag('name="image"');
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('property="og:image"');
    this.meta.removeTag('name="twitter:title"');
    this.meta.removeTag('name="twitter:description"');
    this.meta.removeTag('name="twitter:image"');
    this.pageid = this.route.snapshot.params['page_id'];
    this.parametersObservable = this.route.params.subscribe(params => {
      //"product" is obtained from 'ProductResolver'
      this.pageid = this.route.snapshot.params['page_id'];
      this.mypostdetails();
    });
    this.baseURL = ServicesService.API_Share_URL;
    this.isLoggedIn = this.CookieService.get('isAuthenticated');
    this.user_id = this.CookieService.get('id');
    this.mypostdetails();
    this.getBanner();
    this.getComments();
    this.postsviews();
  }

  postsviews() {
    var request = {
      id: this.pageid
    }
    this.postservice.postsviews(request).subscribe(data => {
      if (data.status_code == '200') {
        // console.log(this.adsarray);
      }
    });
  }

  loadWhatsapp(id, title) {
    var text = title;
    var url = this.baseURL + '/share/' + id;
    var message = encodeURIComponent(text) + " - " + encodeURIComponent(url);
    var whatsapp_url = "whatsapp://send?text=" + message;
    window.location.href = whatsapp_url;
  }


  mypostdetails() {
    var req = {
      "id": this.pageid,
    }
    this.postservice.mypostdetails(req).subscribe(resp => {
      this.postData = resp.data;
      this.updateMeta(this.postData.title, this.postData.description, this.postData.images);
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
        this.postlikes_count = '';
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
      }
      this.post_single_title = this.postData.title;
      this.post_single_desc = this.postData.description;
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
      this.postVideoslength = this.postData.videos;
      if (this.postData.yvideos.length != 0) {
        this.yt_iframe_html = this.embedService.embed(this.postData.yvideos[0].path, {
          attr: { width: 800, height: 400 }
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
      // this.postsdata[i].feed_published_at;
      // console.log(this.postsdata[i].created_at);
    });


  }

  postlike(id) {
    if (this.CookieService.get("isAuthenticated") == "true") {
      // console.log(id);
      var reqbody = {
        post_id: id,
      }
      this.postservice.postlike(reqbody).subscribe(data => {
        $(".heart_icon").toggleClass("is-active");
        // console.log(data);
        if (data.status_code == "200") {
          if (data.postlikes == 0) {
            $('#heart_filled').removeClass('fa-heart');
            $('#heart_filled').addClass('fa-heart-o');
            this.postlikes_count = '';
          } else {
            $('#heart_filled').removeClass('fa-heart-o');
            $('#heart_filled').addClass('fa-heart');
            this.postlikes_count = data.postlikes;
          }
          // console.log(this.postData.postlikes_count);
          // this.Getallpostdata();
        }
      });
    } else {
      this.Router.navigate(['login']);
    }
  }

  getComments() {
    $('.subcomment_list').trigger('click');
    var request = {
      post_id: this.pageid
    }
    this.postservice.getComments(request).subscribe(data => {
      if (data.status_code == '200') {
        this.CommentDatas = data.post_comments;
        this.CommentData = this.CommentDatas.data;
        this.CommentLength = this.CommentData;
        this.NextPageURL = this.CommentDatas.next_page_url;
        // console.log(this.NextPageURL);
        localStorage.setItem('NextPageURL', this.NextPageURL);
      }
    });
  }


  fetchNextCommnets() {
    var req = localStorage.getItem('NextPageURL');
    const fd = new FormData();
    this.postservice.NextComments(req, fd).subscribe(resp => {
      if (resp.status_code == '200') {
        let Commentres = resp.post_comments;
        this.CommentData = this.CommentData.concat(Commentres.data);
        this.CommentLength = this.CommentData;
        this.NextPageURL = Commentres.next_page_url;
        localStorage.setItem('NextPageURL', this.NextPageURL);
      }
    });
  }


  AddComment(event) {
    if (this.isLoggedIn == '') {
      this.router.navigate(['/login']);
      this.CookieService.set('postID', JSON.stringify(this.pageid));
    } else {
      if (event.key === "Enter") {
        if (event.target.value != '') {
          var request = {
            text: event.target.value,
            post_id: this.pageid,
            parent_id: '0'
          }
          this.postservice.AddComment(request).subscribe(data => {
            if (data.status_code == '201') {
              this.message = data.message;
              alert(this.message);
              this.commentInfo.comment = '';
              this.getComments();
              // console.log(this.adsarray);
            }
          });
        }
      }
    }
  }


  // main comment reply
  replyCommnt(event, parent_id, index) {
    if (this.isLoggedIn == '') {
      this.router.navigate(['/login']);
      this.CookieService.set('postID', JSON.stringify(this.pageid));
    } else {
      if (event.key === "Enter") {
        if (event.target.value != '') {
          var request = {
            text: event.target.value,
            post_id: this.pageid,
            parent_id: parent_id
          }
          // console.log(request);
          this.postservice.replyComment(request).subscribe(data => {
            if (data.status_code == '201') {
              this.message = data.message;
              alert(this.message);
              this.CommentData[index].commentsreplies.unshift(data.recent_comments[0]);
              this.replyInfo.comment = '';
              $('#editreply' + parent_id).removeClass('active');
              // this.getComments();
              // console.log(this.adsarray);
            }
          });
        }
      }
    }
  }

  // main comment edit
  editCommnt(event, id, index) {
    if (event.key === "Enter") {
      if (event.target.value != '') {
        var request = {
          text: event.target.value,
          post_id: this.pageid,
          parent_id: '0',
          id: id
        }
        // console.log(request);
        this.postservice.editComment(request).subscribe(data => {
          if (data.status_code == '200') {
            this.message = data.message;
            alert(this.message);
            this.CommentData[index].text = data.recent_comments[0].text;
            this.editInfo.comment = '';
            $('#editcmnt' + id).toggleClass('active');
            // this.getComments();
            // console.log(this.adsarray);
          }
        });
      }
    }
  }


  // sub comment reply 
  subreplyCommnt(event, subid, subparent_id, index) {
    if (this.isLoggedIn == '') {
      this.router.navigate(['/login']);
      this.CookieService.set('postID', JSON.stringify(this.pageid));
    } else {
      if (event.key === "Enter") {
        if (event.target.value != '') {
          var request = {
            text: event.target.value,
            post_id: this.pageid,
            parent_id: subparent_id
          }
          // console.log(request);
          console.log(subid);
          this.postservice.replyComment(request).subscribe(data => {
            if (data.status_code == '201') {
              this.message = data.message;
              alert(this.message);
              this.CommentData[index].commentsreplies.unshift(data.recent_comments[0]);
              this.subreplyInfo.comment = '';
              $('#subeditreply' + subid).toggleClass('active');
              // this.getComments();
              // console.log(this.adsarray);
            }
          });
        }
      }
    }
  }

  // sub comment edit 
  subeditCommnt(event, subid, subparentid, main_index, sub_index) {
    if (event.key === "Enter") {
      if (event.target.value != '') {
        var request = {
          text: event.target.value,
          post_id: this.pageid,
          parent_id: subparentid,
          id: subid
        }
        // console.log(request);
        this.postservice.editComment(request).subscribe(data => {
          if (data.status_code == '200') {
            this.message = data.message;
            alert(this.message);
            this.CommentData[main_index].commentsreplies[sub_index].text = data.recent_comments[0].text;
            this.subeditInfo.comment = '';
            $('#subeditcmnt' + subid).toggleClass('active');
            // this.getComments();
            // console.log(this.adsarray);
          }
        });
      }
    }
  }



  // Show Replies //
  ShowReplies() {
    $('.subcomment_list').toggle();
  }


  // sub comment buttons
  subeditComment(id, text) {
    this.subeditInfo.comment = text;
    $('#subeditcmnt' + id).toggleClass('active');
    $('#subeditreply' + id).removeClass('active');
  }

  subreplyComment(id) {
    $('#subeditreply' + id).toggleClass('active');
    $('#subeditcmnt' + id).removeClass('active');
  }


  // main comment buttons
  editComment(id, text) {
    this.editInfo.comment = text;
    $('#editcmnt' + id).toggleClass('active');
    $('#editreply' + id).removeClass('active');
  }

  replyComment(id) {
    $('#editreply' + id).toggleClass('active');
    $('#editcmnt' + id).removeClass('active');
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


  deleteComment(id) {
    var request = {
      post_id: this.pageid,
      id: id
    }
    this.postservice.deletecomment(request).subscribe(data => {
      if (data.status_code == '200') {
        this.message = data.message;
        alert(this.message);
        this.getComments();
      }
    });
  }

  subdeleteComment(subid) {
    var request = {
      post_id: this.pageid,
      id: subid
    }
    this.postservice.deletecomment(request).subscribe(data => {
      if (data.status_code == '200') {
        this.message = data.message;
        alert(this.message);
        this.getComments();
      }
    });
  }

  getBanner = function () {
    const bannerVal = new FormData;
    bannerVal.append('location', 'POST');
    this.postservice.GetBanners(bannerVal).subscribe(data => {
      if (data.status_code == 200) {
        this.Bannerdata = data.data;
        // console.log(this.adsarray);
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
      }
    });
  }


  Addfavourite() {
    $('.rotate').toggleClass("down");
    var request = {
      "post_id": this.pageid
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
      }
    });
  }


  updateMeta(name, desc, images) {
    // console.log(metakeys);
    if (images.length != 0) {
      this.imagePath = images[0].path;
    } else {
      this.imagePath = "https://www.watnew.com/assets/images/login-logo-img.jpg";
    }
    this.title.setTitle(name);
    this.meta.addTag({ name: 'description', content: desc });
    this.meta.addTag({ name: 'image', content: this.imagePath });
    this.meta.addTag({ property: 'og:title', content: name });
    this.meta.addTag({ property: 'og:description', content: desc });
    this.meta.addTag({ property: 'og:image', content: this.imagePath });
    this.meta.addTag({ name: 'twitter:card', content: "summary" });
    this.meta.addTag({ name: 'twitter:title', content: name });
    this.meta.addTag({ name: 'twitter:description', content: desc });
    this.meta.addTag({ name: 'twitter:image', content: this.imagePath });
  }


  ngOnInit() {
    this.mypostdetails();
  }

  ngOnDestroy() {
    if (this.parametersObservable != null) {
      this.parametersObservable.unsubscribe();
    }
  }

}
