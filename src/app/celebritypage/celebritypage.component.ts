import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscriber } from 'rxjs';
import * as $ from 'jquery';
import { EmbedVideoService } from 'ngx-embed-video';
import { PostsService } from '../services/posts/posts.service';
import * as FileSaver from 'file-saver';
import { CelebritypageService } from '../services/celebritypage/celebritypage.service';
import { SEOservicesService } from '../services/seoservices.service';

@Component({
  selector: 'app-celebritypage',
  templateUrl: './celebritypage.component.html',
  styleUrls: ['./celebritypage.component.css']
})
export class CelebritypageComponent implements OnInit {
  celebritydata: any;
  next_page_url: any;
  favouriteLength: any;
  thumbnail: any;
  follow_value: any;
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
  celebritycatlist: any;
  celebritylist: any;
  @ViewChild('selectcelebritycat') selectcelebritycat: ElementRef;
  selectinfo = {
    "catval": ''
  }
  serach = {
    "pagename": ''
  }
  checkcats: any;
  subcatarray = [];
  scrollValue: any;
  catarray: any;
  follow_data: any;
  celebritysearchdata: any;
  celebritycats: any;
  postConfigs = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 6000, "arrows": false, "dots": false };
  constructor(private seoservice: SEOservicesService, private postservice: PostsService, private cookieservice: CookieService, private Router: Router, private celebritypage: CelebritypageService, private embedvideo: EmbedVideoService, private sanitizer: DomSanitizer) {
    this.seoservice.updateTitle();
    $('body').removeClass('side-menu-active');
    this.userID = this.cookieservice.get('id');
    this.checkcats = 'false';
    this.celebritylist = this.cookieservice.get('celebritycat');
    var subnamecat = JSON.parse("[" + this.celebritylist + "]");
    if (subnamecat.length != 0) {
      const celebritycat = new FormData();
      // console.log(this.livearray);
      for (let k = 0; k < subnamecat.length; k++) {
        celebritycat.append("celebrity[" + k + "][subcategory_id]", subnamecat[k]);
      }
      this.celebrityFeed(celebritycat);
    }
    this.loadcelebritycat();
  }

  loadcelebritycat() {
    this.celebritypage.Getcelebritycategories().subscribe(data => {
      if (data.status_code == 200) {
        this.celebritycatlist = data.data;
        // console.log(this.stateslist);
      }
    });
  }



  onKeyUp(val) {
    // console.log(val);
    const fr = new FormData();
    this.celebritylist = this.cookieservice.get('celebritycat');
    var subnamecat = JSON.parse("[" + this.celebritylist + "]");
    // console.log(subnamecat);
    for (let j = 0; j < subnamecat.length; j++) {
      fr.append("celebrity[" + j + "][subcategory_id]", subnamecat[j]);
    }
    fr.append('title', val);
    // console.log();
    this.celebritypage.getsearchcelebs(fr).subscribe(data => {
      if (data.status_code == 200) {
        this.celebritydata = [];
        this.celebritysearchdata = data.data;
        for (var i = 0; i < this.celebritysearchdata.length; i++) {
          // get total seconds between the times
          var createdDate = this.celebritysearchdata[i].created_at;
          var cdate = new Date(createdDate);
          var created_date = cdate.toDateString();
          // console.log(this.getdate);
          this.celebritysearchdata[i].created_at = created_date.slice(4, 15);
          //  console.log(this.catpage[i].created_at);
        }
        this.celebritydata = this.celebritysearchdata;
        $('.loadMore').hide();
        // this.next_page_url = data.data.next_page_url;
        // if (this.next_page_url == 'null') {
        //   this.message = "Celebrity Pages Not Found";
        // } else {
        //   $('.loadMore').show();
        // }
        // this.cookieservice.set('celebrityURL', this.next_page_url);
      } else {
        this.celebritydata = [];
        const fr = new FormData();
        this.celebritylist = this.cookieservice.get('celebritycat');
        var subnamecat = JSON.parse("[" + this.celebritylist + "]");
        // console.log(subnamecat);
        for (let j = 0; j < subnamecat.length; j++) {
          fr.append("celebrity[" + j + "][subcategory_id]", subnamecat[j]);
        }
        this.celebrityFeed(fr);
      }
    });
  }


  changeCat() {
    this.celebritylist = this.cookieservice.get('celebritycat');
    var subnamecatval = JSON.parse("[" + this.celebritylist + "]");
    if (subnamecatval.length != '') {
      for (let k = 0; k < subnamecatval.length; k++) {
        for (let g = 0; g < this.celebritycatlist.length; g++) {
          if (this.celebritycatlist[g].id == subnamecatval[k]) {
            this.celebritycatlist[g].catselect = subnamecatval[k];
          }
        }
      }
    }
    this.selectcelebritycat.nativeElement.click();
  }

  celebrityFeed(res) {
    this.message = '';
    this.celebritypage.Getcelebrityfeeds(res).subscribe(data => {
      if (data.status_code == 200) {
        this.celebritydata = data.data.data;
        for (var i = 0; i < this.celebritydata.length; i++) {
          // get total seconds between the times
          var createdDate = this.celebritydata[i].created_at;
          var cdate = new Date(createdDate);
          var created_date = cdate.toDateString();
          // console.log(this.getdate);
          this.celebritydata[i].created_at = created_date.slice(4, 15);
          //  console.log(this.catpage[i].created_at);
        }
        this.next_page_url = data.data.next_page_url;
        if (this.next_page_url == 'null') {
          $('.loadSpinner').hide();
          this.message = "Celebrity Pages Not Found";
        } else {
          this.cookieservice.set('Celeb_scrollVal', '0');
          $('.loadMore').show();
        }
        this.cookieservice.set('celebrityURL', this.next_page_url);
      } else {
        this.celebritydata = [];
        this.message = data.message;
      }
    });
  }

  // celebrity Pagination //
  onScroll() {
    $('.loadSpinner').show();
    this.scrollValue = this.cookieservice.get('Celeb_scrollVal');
    if (this.scrollValue == '0') {
      this.LoadContent();
    }
  }

  getPageFollowStatus(followarray, id) {
    var item = followarray.follow.find(item => item.user_id == this.cookieservice.get('id'));
    // console.log(item);
    if (item != undefined) {
      $('.celebrityfollow' + id).addClass('active');
      return 'Following';
    } else {
      $('.celebrityfollow' + id).removeClass('active');
      return 'Follow';
    }
  }

  following(cat, index) {
    if (this.cookieservice.get("isAuthenticated") == "true") {
      var reqbody = {
        page_id: cat.id,
      }
      this.celebritypage.following(reqbody).subscribe(data => {
        if (data.status_code == 201) {
          this.follow_data = data.data;
          var createdDate = this.follow_data.created_at;
          var cdate = new Date(createdDate);
          var created_date = cdate.toDateString();
          this.follow_data.created_at = created_date.slice(4, 15);
          this.celebritydata[index] = this.follow_data;
        }
      });
    } else {
      this.Router.navigate(['login']);
      this.cookieservice.set('afterLoginURL', JSON.stringify('celebritypage'));
    }
  }


  LoadContent() {
    var req = this.cookieservice.get('celebrityURL');
    var setScrollval = this.cookieservice.set('Celeb_scrollVal', '1');
    if (req != null) {
      this.celebritylist = this.cookieservice.get('celebritycat');
      var subnamecat = JSON.parse("[" + this.celebritylist + "]");
      if (subnamecat.length != 0) {
        const celebritynext = new FormData();
        // console.log(this.livearray);
        for (let k = 0; k < subnamecat.length; k++) {
          celebritynext.append("celebrity[" + k + "][subcategory_id]", subnamecat[k]);
        }
        this.celebritypage.Nextpagefeeds(req, celebritynext).subscribe(resp => {
          if (resp.status_code == 200) {
            let pagefeedres = resp.data.data;
            this.celebritydata = this.celebritydata.concat(pagefeedres);
            this.next_page_url = resp.data.next_page_url;
            if (this.next_page_url == 'null') {
              this.message = "Celebrity Pages Not Found";
              $('.loadSpinner').hide();
            } else {
              $('.loadMore').show();
              this.cookieservice.set('Celeb_scrollVal', '0');
            }
            this.cookieservice.set('celebrityURL', this.next_page_url);
          } else {
            this.celebritydata = [];
            this.message = resp.message;
          }
        });
      }

    }
  }

  fetchcontent() {
    const fr = new FormData();
    this.celebritylist = this.cookieservice.get('celebritycat');
    var subnamecat = JSON.parse("[" + this.celebritylist + "]");
    // console.log(subnamecat);
    for (let j = 0; j < subnamecat.length; j++) {
      fr.append("celebrity[" + j + "][subcategory_id]", subnamecat[j]);
    }
    this.celebrityFeed(fr);
  }

  onChangeCategory(subcat: any, event) {
    this.celebritycats = this.cookieservice.get('celebritycat');
    var celebrityvals = JSON.parse("[" + this.celebritycats + "]");
    if (celebrityvals.length != '') {
      for (let k = 0; k < celebrityvals.length; k++) {
        this.subcatarray.push(celebrityvals[k]);
      }
    }
    if (event.target.checked == true) {
      this.checkcats = 'true';
      this.subcatarray.push(subcat.id);
    } else {
      let index = this.subcatarray.indexOf(subcat.id);
      this.subcatarray.splice(index, 1);
    }
    // console.log(this.subcatarray);
    if (this.subcatarray.length != 0) {
      this.checkcats = 'true';
      let subcat = this.subcatarray.toString();
      this.cookieservice.set('celebritycat', subcat);
    } else {
      this.checkcats = 'false';
    }
  }


  ngOnInit() {
    this.celebritylist = this.cookieservice.get('celebritycat');
    if (this.celebritylist == '') {
      this.selectcelebritycat.nativeElement.click();
    }
  }

}
