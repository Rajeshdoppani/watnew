import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { Subscriber } from 'rxjs';
import { EmbedVideoService } from 'ngx-embed-video';
import { LiveService } from '../services/live/live.service';
import { ServicesService } from '../services/services.service';
import { SEOservicesService } from '../services/seoservices.service';
import { PostsService } from '../services/posts/posts.service';

@Component({
  selector: 'app-livescores',
  templateUrl: './livescores.component.html',
  styleUrls: ['./livescores.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LivescoresComponent implements OnInit {
  // template: string = `<img class="loader-img" src="assets/images/loader.gif" />`;
  header;
  footer;
  selectinfo = {
    "statesval": ''
  }
  images: any;
  stateslist: any;
  livelist: any;
  thumbnail: any;
  next_page_url: any;
  liveLength: any;
  livestates: any;
  livearray: any;
  datefuture: any;
  currentdate: any;
  posDate: any;
  baseURL: any;
  yt_iframe_html: any;
  livepagedetails: any;
  pagename: any;
  page_icon: any;
  liveTitle: any;
  liveDesc: any;
  views_count: any;
  liveCreated: any;
  livedetails_yvideos: any;
  @ViewChild('selectstates', { read: ElementRef }) private selectstates: ElementRef;
  @ViewChild('Live_post', { read: ElementRef }) public Live_post: ElementRef;
  livedetails: any;
  liveAds: any;
  liveAdsposition: any;
  liveAdsarray: any;
  arrayCounter: any;
  message: any;
  liveID: any;
  livechatData: any;
  Live_id: any;
  chatInfo = {
    "chat": ''
  }
  finalarray = [];
  livepageId: any;
  livestatus: any;
  isAuthenticated: any;
  livenextres: any;
  livenextAds: any;
  livenextAdsposition: any;
  livenextAdsarray: any;
  loadMessage: any;
  substatearray = [];
  statesArray = [];
  checkstate: any;
  stateslists: any;
  Bannerdata: any[];
  slideConfigs = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 6000, "arrows": false };
  adsConfig = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 2000, "arrows": false };
  constructor(private postservice: PostsService, private seoservice: SEOservicesService, private sanitizer: DomSanitizer, private liveservice: LiveService, private cookieservice: CookieService, private Router: Router, private route: ActivatedRoute, private embedService: EmbedVideoService) {
    this.seoservice.updateTitle();
    $('body').removeClass('side-menu-active');
    this.loadstates();
    this.getBanner();
    this.isAuthenticated = this.cookieservice.get('isAuthenticated');
    this.baseURL = ServicesService.API_Share_URL;
    this.checkstate = 'false';
    if (this.isAuthenticated == 'true') {
      this.livestates = this.cookieservice.get('liveStates');
      if (this.livestates != '') {
        this.checkstate = 'true';
        const livestate = new FormData();
        this.livearray = JSON.parse("[" + this.livestates + "]");
        // this.livearray = this.livestates.split(',');
        // console.log(this.livearray);
        for (let k = 0; k < this.livearray.length; k++) {
          if (this.livearray[k] == 0) {
            livestate.append("pan_state", this.livearray[k]);
          }
          livestate.append("states[" + k + "][state_id]", this.livearray[k]);
        }
        this.saveUserCountries(livestate);
      }
      const res = new FormData();
      res.append('res', '');
      this.getlives(res);
    } else {
      this.livestates = this.cookieservice.get('liveStates');
      if (this.livestates != '') {
        const livestate = new FormData();
        this.livearray = JSON.parse("[" + this.livestates + "]");
        // console.log(this.livearray);
        for (let k = 0; k < this.livearray.length; k++) {
          if (this.livearray[k] == 0) {
            livestate.append("pan_state", this.livearray[k]);
          }
          livestate.append("states[" + k + "][id]", this.livearray[k]);
        }
        this.getlives(livestate);
      }
    }
  }

  saveUserCountries(states) {
    this.liveservice.saveusercountries(states).subscribe(data => {
      if (data.status_code == 200) {
      }
    });
  }

  getBanner = function () {
    const bannerVal = new FormData;
    bannerVal.append('location', 'LIVE');
    this.postservice.GetBanners(bannerVal).subscribe(data => {
      if (data.status_code == 200) {
        this.Bannerdata = data.data;
        // console.log(this.adsarray);
      }
    });
  }

  loadstates() {
    this.liveservice.GetStates().subscribe(data => {
      if (data.status_code == 200) {
        this.stateslist = data.data;
        this.stateslist.unshift({ id: 0, name: 'PAN INDIA' })
        console.log(this.stateslist);
      }
    });
  }

  getlives(req) {
    this.liveservice.Getlives(req).subscribe(data => {
      if (data.status_code == 200) {
        this.livelist = data.data.data;
        this.liveAds = data.data.adds_data;
        this.liveAdsposition = data.data.adds_configuration;
        this.liveAdsarray = this.liveAds;
        this.finalarray = [];
        var j = 0;
        var adspostion = 0;
        for (let r = 0; r < this.livelist.length; r++) {
          this.livelist[r].liveadvalue = 0;
          this.finalarray.push(this.livelist[r]);
          if (this.liveAdsarray.length != 0) {
            adspostion++;
            if (adspostion == this.liveAdsposition && j < this.liveAdsarray.length) {
              this.liveAdsarray[j].liveadvalue = 1;
              // console.log(this.liveAdsarray);
              this.finalarray.push(this.liveAdsarray[j]);
              j++;
              adspostion = 0;
            }
          }
        }
        console.log(this.finalarray);
        for (let h = 0; h < this.finalarray.length; h++) {
          if (this.finalarray[h].liveadvalue == 0) {
            this.livestatus = this.finalarray[h].status;
            this.livepageId = this.finalarray[h].page_id;
            this.posDate = this.finalarray[h].created_at + '.000Z';
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
                this.finalarray[h].created_at = days + ' days ago';
              } else {
                this.finalarray[h].created_at = days + ' day ago';
              }
            } else if (hours != 0 && days == 0) {
              if (hours > 1) {
                if (minutes > 50) {
                  var Hours = hours + 1;
                  this.finalarray[h].created_at = Hours + ' hours ago';
                } else {
                  this.finalarray[h].created_at = hours + ' hours ago';
                }
              } else {
                this.finalarray[h].created_at = hours + ' hour ago';
              }
            } else if (minutes != 0 && hours == 0) {
              if (minutes > 1) {
                if (seconds > 50) {
                  var Minutes = minutes + 1;
                  this.finalarray[h].created_at = Minutes + ' minutes ago';
                } else {
                  this.finalarray[h].created_at = minutes + ' minutes ago';
                }
              } else {
                this.finalarray[h].created_at = minutes + ' minute ago';
              }
            } else if (seconds != 0 && minutes == 0 && hours == 0) {
              if (seconds > 1) {
                if (milliseconds > 50) {
                  var Seconds = seconds + 1;
                  this.finalarray[h].created_at = Seconds + ' seconds ago';
                } else {
                  this.finalarray[h].created_at = seconds + ' seconds ago';
                }
              } else {
                this.finalarray[h].created_at = seconds + ' second ago';
              }
            }
            if (this.finalarray[h].yvideos.length != '0') {
              this.embedService
                .embed_image(
                  this.finalarray[h].yvideos[0].path,
                  { image: 'maxresdefault' }
                )
                .then(res => {
                  this.finalarray[h].yvideos[0].path = res.link;
                });
            }
          }
        }
        this.next_page_url = data.data.next_page_url;
        if (this.next_page_url == "null") {
          $('.loadMore').hide();
          this.loadMessage = 'No Lives Found';
        } else {
          this.cookieservice.set('liveURL', JSON.stringify(this.next_page_url));
          $('.loadMore').show();
        }
      } else if (data.status_code == 404) {
        this.livelist = [];
        this.loadMessage = data.message;
      }
    });
  }

  fetchNextLive() {
    if (this.isAuthenticated == 'true') {
      var req = JSON.parse(this.cookieservice.get('liveURL'));
      const res = new FormData();
      res.append('res', '');
      this.liveservice.NextLoginLiveList(req, res).subscribe(resp => {
        if (resp.status_code == 200) {
          this.livenextres = resp.data.data;
          this.livenextAds = resp.data.adds_data;
          this.livenextAdsposition = resp.data.adds_configuration;
          this.livenextAdsarray = this.livenextAds;
          var finalnextarray = [];
          var j = 0;
          var adspostion = 0;
          for (let r = 0; r < this.livenextres.length; r++) {
            this.livenextres[r].liveadvalue = 0;
            finalnextarray.push(this.livenextres[r]);
            if (this.livenextAdsarray.length != 0) {
              adspostion++;
              if (adspostion == this.livenextAdsposition && j < this.livenextAdsarray.length) {
                this.livenextAdsarray[j].liveadvalue = 1;
                finalnextarray.push(this.livenextAdsarray[j]);
                j++;
                adspostion = 0;
              }
            }
          }
          console.log(finalnextarray);
          for (let t = 0; t < finalnextarray.length; t++) {
            if (finalnextarray[t].liveadvalue == 0) {
              this.posDate = finalnextarray[t].created_at + '.000Z';
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
                  finalnextarray[t].created_at = days + ' days ago';
                } else {
                  finalnextarray[t].created_at = days + ' day ago';
                }
              } else if (hours != 0 && days == 0) {
                if (hours > 1) {
                  if (minutes > 50) {
                    var Hours = hours + 1;
                    finalnextarray[t].created_at = Hours + ' hours ago';
                  } else {
                    finalnextarray[t].created_at = hours + ' hours ago';
                  }
                } else {
                  finalnextarray[t].created_at = hours + ' hour ago';
                }
              } else if (minutes != 0 && hours == 0) {
                if (minutes > 1) {
                  if (seconds > 50) {
                    var Minutes = minutes + 1;
                    finalnextarray[t].created_at = Minutes + ' minutes ago';
                  } else {
                    finalnextarray[t].created_at = minutes + ' minutes ago';
                  }
                } else {
                  finalnextarray[t].created_at = minutes + ' minute ago';
                }
              } else if (seconds != 0 && minutes == 0 && hours == 0) {
                if (seconds > 1) {
                  if (milliseconds > 50) {
                    var Seconds = seconds + 1;
                    finalnextarray[t].created_at = Seconds + ' seconds ago';
                  } else {
                    finalnextarray[t].created_at = seconds + ' seconds ago';
                  }
                } else {
                  finalnextarray[t].created_at = seconds + ' second ago';
                }
              }
              console.log(finalnextarray[t].yvideos);
              if (finalnextarray[t].yvideos.length != 0) {

                this.embedService
                  .embed_image(
                    finalnextarray[t].yvideos[0].path,
                    { image: 'maxresdefault' }
                  ).then(resf => {
                    console.log(resf);
                    finalnextarray[t].yvideos[0].path = resf.link;
                  });
              }
            }
          }
          this.finalarray = this.finalarray.concat(finalnextarray);
          this.liveLength = finalnextarray;
          this.next_page_url = resp.data.next_page_url;
          if (this.next_page_url == "null") {
            $('.loadMore').hide();
            this.loadMessage = 'No Lives Found';
          } else {
            this.cookieservice.set('liveURL', JSON.stringify(this.next_page_url));
            $('.loadMore').show();
          }
          // this.cookieservice.set('liveURL', this.next_page_url);
        }
      });
    } else {
      var req = JSON.parse(this.cookieservice.get('liveURL'));
      this.livestates = this.cookieservice.get('liveStates');
      const livestate = new FormData();
      this.livearray = this.livestates.split(',');
      // console.log(this.livearray);
      for (let k = 0; k < this.livearray.length; k++) {
        livestate.append("states[" + k + "][id]", this.livearray[k]);
      }
      this.liveservice.NextLiveList(req, livestate).subscribe(resp => {
        if (resp.status_code == 200) {
          this.livenextres = resp.data.data;
          this.livenextAds = resp.data.adds_data;
          this.livenextAdsposition = resp.data.adds_configuration;
          this.livenextAdsarray = this.livenextAds;
          var finalnextarray = [];
          var j = 0;
          var adspostion = 0;
          for (let r = 0; r < this.livenextres.length; r++) {
            this.livenextres[r].liveadvalue = 0;
            finalnextarray.push(this.livenextres[r]);
            if (this.livenextAdsarray.length != 0) {
              adspostion++;
              if (adspostion == this.livenextAdsposition && j < this.livenextAdsarray.length) {
                this.livenextAdsarray[j].liveadvalue = 1;
                finalnextarray.push(this.livenextAdsarray[j]);
                j++;
                adspostion = 0;
              }
            }
          }
          console.log(finalnextarray);
          for (let t = 0; t < finalnextarray.length; t++) {
            if (finalnextarray[t].liveadvalue == 0) {
              this.posDate = finalnextarray[t].created_at + '.000Z';
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
                  finalnextarray[t].created_at = days + ' days ago';
                } else {
                  finalnextarray[t].created_at = days + ' day ago';
                }
              } else if (hours != 0 && days == 0) {
                if (hours > 1) {
                  if (minutes > 50) {
                    var Hours = hours + 1;
                    finalnextarray[t].created_at = Hours + ' hours ago';
                  } else {
                    finalnextarray[t].created_at = hours + ' hours ago';
                  }
                } else {
                  finalnextarray[t].created_at = hours + ' hour ago';
                }
              } else if (minutes != 0 && hours == 0) {
                if (minutes > 1) {
                  if (seconds > 50) {
                    var Minutes = minutes + 1;
                    finalnextarray[t].created_at = Minutes + ' minutes ago';
                  } else {
                    finalnextarray[t].created_at = minutes + ' minutes ago';
                  }
                } else {
                  finalnextarray[t].created_at = minutes + ' minute ago';
                }
              } else if (seconds != 0 && minutes == 0 && hours == 0) {
                if (seconds > 1) {
                  if (milliseconds > 50) {
                    var Seconds = seconds + 1;
                    finalnextarray[t].created_at = Seconds + ' seconds ago';
                  } else {
                    finalnextarray[t].created_at = seconds + ' seconds ago';
                  }
                } else {
                  finalnextarray[t].created_at = seconds + ' second ago';
                }
              }
              console.log(finalnextarray[t].yvideos);
              if (finalnextarray[t].yvideos.length != 0) {

                this.embedService
                  .embed_image(
                    finalnextarray[t].yvideos[0].path,
                    { image: 'maxresdefault' }
                  ).then(resf => {
                    console.log(resf);
                    finalnextarray[t].yvideos[0].path = resf.link;
                  });
              }
            }
          }
          this.finalarray = this.finalarray.concat(finalnextarray);
          this.liveLength = finalnextarray;
          this.next_page_url = resp.data.next_page_url;
          if (this.next_page_url == "null") {
            $('.loadMore').hide();
            this.loadMessage = 'No Lives Found';
          } else {
            this.cookieservice.set('liveURL', JSON.stringify(this.next_page_url));
            $('.loadMore').show();
          }
          // this.cookieservice.set('liveURL', this.next_page_url);
        }
      });
    }
  }

  afterChange(e, index) {
    console.log(e.currentSlide + 1 + ' / ' + e.slick.slideCount);
    this.finalarray[index].SlickCounter = e.currentSlide + 1 + ' / ' + e.slick.slideCount;
  }


  changeState() {
    this.stateslists = this.cookieservice.get('liveStates');
    var subnamestateval = JSON.parse("[" + this.stateslists + "]");
    if (subnamestateval.length != '') {
      for (let k = 0; k < subnamestateval.length; k++) {
        for (let g = 0; g < this.stateslist.length; g++) {
          if (this.stateslist[g].id == subnamestateval[k]) {
            this.stateslist[g].stateselect = subnamestateval[k];
          }
        }
      }
    }
    this.selectstates.nativeElement.click();
  }


  // Load Post //
  loadPost(ID, index) {
    this.livedetails_yvideos = '';
    this.liveTitle = '';
    this.liveDesc = '';
    this.views_count = '';
    this.liveCreated = '';
    this.Live_id = ID;
    this.Getdetaillives(ID, index);
    this.GetChat();
    var request = {
      "id": ID,
    }
    this.liveservice.liveviews(request).subscribe(resp => {
    });
    this.Live_post.nativeElement.click();
  }


  Getdetaillives(id, index) {
    var request = {
      "id": id,
    }
    this.liveservice.Getdetaillives(request).subscribe(resp => {
      if (resp.status_code == 200) {
        this.livedetails = resp.data;
        this.liveID = this.livedetails.id;
        this.livepagedetails = resp.data.page;
        this.pagename = this.livepagedetails.name;
        this.page_icon = this.livepagedetails.page_icon;
        this.views_count = this.livedetails.liveviews_count;
        var post_title = this.livedetails.title.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" target="_blank">$1</a> ');
        // } else {
        //   this.postData.title = this.sanitizer.bypassSecurityTrustHtml(this.postData.title.replace(/#(\w+)/g, '<a href="#">#$1</a>'));
        // }
        this.livedetails.title = this.sanitizer.bypassSecurityTrustHtml(post_title.replace(/#(\w+)/g, '<a href="/search/%23$1" target="_blank">#$1</a>'));
        this.liveTitle = this.livedetails.title;
        // this.postData.title = this.postData.title.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
        if (this.livedetails.description != null) {
          var post_desc = this.livedetails.description.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" target="_blank">$1</a> ');

          this.livedetails.description = this.sanitizer.bypassSecurityTrustHtml(post_desc.replace(/#(\w+)/g, '<a href="/search/%23$1" target="_blank">#$1</a>'));
          this.liveDesc = this.livedetails.description;
        }
        this.posDate = this.livedetails.created_at + '.000Z';
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
            this.livedetails.created_at = days + ' days ago';
          } else {
            this.livedetails.created_at = days + ' day ago';
          }
        } else if (hours != 0 && days == 0) {
          if (hours > 1) {
            if (minutes > 50) {
              var Hours = hours + 1;
              this.livedetails.created_at = Hours + ' hours ago';
            } else {
              this.livedetails.created_at = hours + ' hours ago';
            }
          } else {
            this.livedetails.created_at = hours + ' hour ago';
          }
        } else if (minutes != 0 && hours == 0) {
          if (minutes > 1) {
            if (seconds > 50) {
              var Minutes = minutes + 1;
              this.livedetails.created_at = Minutes + ' minutes ago';
            } else {
              this.livedetails.created_at = minutes + ' minutes ago';
            }
          } else {
            this.livedetails.created_at = minutes + ' minute ago';
          }
        } else if (seconds != 0 && minutes == 0 && hours == 0) {
          if (seconds > 1) {
            if (milliseconds > 50) {
              var Seconds = seconds + 1;
              this.livedetails.created_at = Seconds + ' seconds ago';
            } else {
              this.livedetails.created_at = seconds + ' seconds ago';
            }
          } else {
            this.livedetails.created_at = seconds + ' second ago';
          }
        }
        this.liveCreated = this.livedetails.created_at;
        if (this.livedetails.yvideos.length != 0) {
          this.yt_iframe_html = this.embedService.embed(this.livedetails.yvideos[0].path, {
            attr: { width: 600, height: 400 }
          });
          // console.log(this.yt_iframe_html);
          this.livedetails_yvideos = this.sanitizer.bypassSecurityTrustHtml(this.yt_iframe_html.changingThisBreaksApplicationSecurity);
        }
      }
    });
  }


  onChangeState(states: any, event) {
    // console.log(event.target.checked);
    this.stateslists = this.cookieservice.get('liveStates');
    var subnamestateval = JSON.parse("[" + this.stateslists + "]");
    if (subnamestateval.length != '') {
      for (let k = 0; k < subnamestateval.length; k++) {
        this.substatearray.push(subnamestateval[k]);
      }
    }
    if (event.target.checked == true) {
      this.checkstate = 'true';
      this.substatearray.push(states.id);
    } else {
      let index = this.substatearray.indexOf(states.id);
      this.substatearray.splice(index, 1);
      // console.log(this.substatearray);
    }

    // console.log(this.substatearray);
    if (this.substatearray.length != 0) {
      this.checkstate = 'true';
      let subcat = this.substatearray.toString();
      this.cookieservice.set('liveStates', subcat);
    } else {
      this.checkstate = 'false';
    }
    // console.log(this.subcatarray);
  }

  fetchcontent() {
    const fr = new FormData();
    this.stateslists = this.cookieservice.get('liveStates');
    var subnamestate = JSON.parse("[" + this.stateslists + "]");
    // console.log(subnamecat);
    for (let j = 0; j < subnamestate.length; j++) {
      fr.append("states[" + j + "][id]", subnamestate[j]);
    }
    if (this.isAuthenticated == 'true') {
      this.saveUserCountries(fr);
    }
    this.getlives(fr);
  }


  // fetchcontent(selectstates) {
  //   const states = new FormData();
  //   console.log(selectstates.statesval);
  //   this.cookieservice.set('liveStates', selectstates.statesval);
  //   for (let j = 0; j < selectstates.statesval.length; j++) {
  //     states.append("states[" + j + "][id]", selectstates.statesval[j]);
  //   }
  //   this.getlives(states);
  // }

  // Get Chat //
  GetChat() {
    var request = {
      live_id: this.Live_id
    }
    this.liveservice.getLiveChat(request).subscribe(data => {
      this.livechatData = data.live_comments.data;
    });
  }

  // Add Chat //
  AddChat(res) {
    if (res.key === "Enter") {
      if (res.target.value != '') {
        var request = {
          text: res.target.value,
          live_id: this.Live_id
        }
        this.liveservice.AddLiveChat(request).subscribe(data => {
          if (data.status_code == 201) {
            this.livechatData.push(data.recent_comments[0]);
            this.message = data.message;
            // alert(this.message);
            this.chatInfo.chat = '';
          }
        });
      }
    }
  }

  ngOnInit() {
    this.livestates = this.cookieservice.get('liveStates');
    this.isAuthenticated = this.cookieservice.get('isAuthenticated');
    if (this.livestates == '' && this.isAuthenticated != 'true') {
      this.selectstates.nativeElement.click();
    } else if (this.isAuthenticated == 'true' && this.livestates == '0') {
      this.selectstates.nativeElement.click();
    }
  }

}
