import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CategoriesService } from '../services/categories/categories.service';
// import { $ } from 'protractor';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  isLoggedIn: string;
  isLoggedPage: string;
  submenu: string;
  pagesubmenu: string;
  Adsdata: any[];
  respdata = [];
  searchresult: any;
  searchInfo = {
    keyword: ''
  }
  nextpageURL: any;
  adsarray = [];
  slideConfig = {
    "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 3000, "arrows": false, responsive: [{

      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        infinite: true
      }

    }, {

      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        dots: false
      }

    }, {

      breakpoint: 300,
      settings: "unslick" // destroys slick

    }]
  };
  key_word;
  user_Picture: any;
  user_nickName: any;
  userID: any;
  unread_notification_count: any;
  notificationList: any;
  posDate: any;
  datefuture: any;
  currentdate: any;
  loginCokkie: any;
  selector: string = '.notifySection';
  tokenVal: any;
  constructor(private route: ActivatedRoute, private cookieInfo: CookieService, private router: Router, private CategoriesService: CategoriesService, private loginservice: LoginService) {
    this.key_word = this.route.snapshot.params['key_word'];
    this.userID = this.cookieInfo.get('id');
    this.getlogin();
    this.getnotifications();
    this.getAds();
  }

  getlogin() {
    this.isLoggedIn = this.cookieInfo.get('isAuthenticated');
    if (this.isLoggedIn == 'true') {
      this.user_nickName = JSON.parse(this.cookieInfo.get('nick_name'));
      this.user_Picture = JSON.parse(this.cookieInfo.get('profile_pic'));
      if (this.user_Picture == 'http://www.watnew.com/rest/public/' || this.user_Picture == null) {
        this.user_Picture = 'assets/images/avatar-img.jpg';
      }
    }
    this.isLoggedPage = this.cookieInfo.get('pageID');
  }

  userlinks() {
    // alert('hello');
    this.submenu = "showsub";
    $('.showsub').toggleClass('subActive');
  }

  openMenu() {
    $('body').toggleClass('side-menu-active');
  }

  pagelinks() {
    this.pagesubmenu = "pagemenu";
  }

  getguest = function () {
    this.CategoriesService.Getguest().subscribe(data => {
      if (data.status_code == 200) {
        this.cookieInfo.set('token', JSON.stringify(data.data.token));
        // this.cookieInfo.set('id', JSON.stringify(data.data.id));
        this.cookieInfo.set('nick_name', JSON.stringify(data.data.nick_name));
        this.cookieInfo.set('afterLoginURL', JSON.stringify('0'));
        this.router.navigate(['login']);
      }
    });
  }

  getAds = function () {
    this.loginservice.GetAds().subscribe(data => {
      if (data.status_code == 200) {
        this.Adsdata = data.data;
        for (let t = 0; t < this.Adsdata.length; t++) {
          if (this.Adsdata[t].position == 'LEFT' && this.Adsdata[t].status == '1') {
            if (this.Adsdata[t].addsimages.length != '0' && this.Adsdata[t].addsvideos.length != '0') {
              this.adsarray.push({ "url": this.Adsdata[t].url, "image": this.Adsdata[t].addsimages[0].path, "video": '' }, { "image": '', "video": this.Adsdata[t].addsvideos[0].path });
            } else if (this.Adsdata[t].addsimages.length != '0') {
              this.adsarray.push({ "url": this.Adsdata[t].url, "image": this.Adsdata[t].addsimages[0].path, "video": '' });
            } else if (this.Adsdata[t].addsvideos.length != '0') {
              this.adsarray.push({ "image": '', "video": this.Adsdata[t].addsvideos[0].path });
            }
          }
        }
        // console.log(this.adsarray);
      }
    });
  }

  search = function (searchInfo) {
    this.router.navigate(['search', searchInfo.keyword]);
  }


  SearchRes = function (res: any) {
    this.router.navigate(['postdetails', res.id]);
  }

  onSearchChange(searchValue: string) {
    if (searchValue.length >= 3) {
      $('.fa-spinner.fa-spin').removeClass('searchSpinner');
      var request = {
        "key_word": searchValue
      }
      this.loginservice.getsearchvalues(request).subscribe(data => {
        if (data.status_code == '200') {
          if (data.data.length != 0) {
            this.searchresult = data.data;
            $(".search_result").removeClass("searchActive");
            $('.fa-spinner.fa-spin').addClass('searchSpinner');
          } else {
            $(".search_result").addClass("searchActive");
            $('.fa-spinner.fa-spin').removeClass('searchSpinner');
            this.searchresult = [];
          }
        }
      });
    } else if (searchValue == '' || searchValue.length < 3) {
      $(".search_result").addClass("searchActive");
      $('.fa-spinner.fa-spin').addClass('searchSpinner');
      this.searchresult = [];
    }
  }

  logout() {
    localStorage.clear();
    localStorage.setItem('subcategory', this.cookieInfo.get('subcategory'));
    localStorage.setItem('mobile_token', this.cookieInfo.get('mobile_token'));
    this.cookieInfo.deleteAll();
    this.cookieInfo.set('postID', JSON.stringify(''), 365, '/');
    this.cookieInfo.set('subcategory', localStorage.getItem('subcategory'), 365, '/');
    this.cookieInfo.set('mobile_token', localStorage.getItem('mobile_token'), 365, '/');
    this.getguest();
    //this.cookieInfo.deleteAll();
    // setTimeout(() => {
    //   this.router.navigate(['login']);
    // }, 2000);
  }

  deleteAccount() {
    // console.log(this.userID);
    var request = {
      "id": this.userID
    }
    this.loginservice.deleteAccnt(request).subscribe(data => {
      // console.log(data);
      if (data.status_code == '200') {
        localStorage.clear();
        localStorage.setItem('subcategory', this.cookieInfo.get('subcategory'));
        localStorage.setItem('mobile_token', this.cookieInfo.get('mobile_token'));
        this.cookieInfo.deleteAll();
        this.cookieInfo.set('postID', JSON.stringify(''), 365, '/');
        this.cookieInfo.set('subcategory', localStorage.getItem('subcategory'), 365, '/');
        this.cookieInfo.set('mobile_token', localStorage.getItem('mobile_token'), 365, '/');
        this.getguest();
      } else {
        // alert(data.message);
      }
    });
  }



  getnotifications() {
    this.loginservice.getnotify().subscribe(data => {
      if (data.status_code == 200) {
        this.notificationList = data.data.data;
        this.nextpageURL = data.data.next_page_url;
        if (this.nextpageURL != null) {
          this.cookieInfo.set('notificationURL', this.nextpageURL);
        } else {
          this.cookieInfo.set('notificationURL', null);
        }
        if (data.notification_unread_count == 0) {
          this.unread_notification_count = '';
        } else {
          this.unread_notification_count = data.notification_unread_count;
        }
        for (let l = 0; l < this.notificationList.length; l++) {
          this.posDate = this.notificationList[l].created_at + '.000Z';
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
              this.notificationList[l].created_at = days + ' days ago';
            } else {
              this.notificationList[l].created_at = days + ' day ago';
            }
          } else if (hours != 0 && days == 0) {
            if (hours > 1) {
              if (minutes > 50) {
                var Hours = hours + 1;
                this.notificationList[l].created_at = Hours + ' hours ago';
              } else {
                this.notificationList[l].created_at = hours + ' hours ago';
              }
            } else {
              this.notificationList[l].created_at = hours + ' hour ago';
            }
          } else if (minutes != 0 && hours == 0) {
            if (minutes > 1) {
              if (seconds > 50) {
                var Minutes = minutes + 1;
                this.notificationList[l].created_at = Minutes + ' minutes ago';
              } else {
                this.notificationList[l].created_at = minutes + ' minutes ago';
              }
            } else {
              this.notificationList[l].created_at = minutes + ' minute ago';
            }
          } else if (seconds != 0 && minutes == 0 && hours == 0) {
            if (seconds > 1) {
              if (milliseconds > 50) {
                var Seconds = seconds + 1;
                this.notificationList[l].created_at = Seconds + ' seconds ago';
              } else {
                this.notificationList[l].created_at = seconds + ' seconds ago';
              }
            } else {
              this.notificationList[l].created_at = seconds + ' second ago';
            }
          }
        }
      }
    });
  }

  onScroll() {
    var notifynextURL = this.cookieInfo.get('notificationURL');
    if (notifynextURL != null) {
      this.loginservice.getmorenotifications(notifynextURL).subscribe(data => {
        if (data.status_code == 200) {
          let nextnotification = data.data.data;
          this.nextpageURL = data.data.next_page_url;
          if (this.nextpageURL != null) {
            this.cookieInfo.set('notificationURL', this.nextpageURL);
          } else {
            this.cookieInfo.set('notificationURL', null);
          }
          if (data.notification_unread_count == 0) {
            this.unread_notification_count = '';
          } else {
            this.unread_notification_count = data.notification_unread_count;
          }
          for (let l = 0; l < nextnotification.length; l++) {
            this.posDate = nextnotification[l].created_at + '.000Z';
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
                nextnotification[l].created_at = days + ' days ago';
              } else {
                nextnotification[l].created_at = days + ' day ago';
              }
            } else if (hours != 0 && days == 0) {
              if (hours > 1) {
                if (minutes > 50) {
                  var Hours = hours + 1;
                  nextnotification[l].created_at = Hours + ' hours ago';
                } else {
                  nextnotification[l].created_at = hours + ' hours ago';
                }
              } else {
                nextnotification[l].created_at = hours + ' hour ago';
              }
            } else if (minutes != 0 && hours == 0) {
              if (minutes > 1) {
                if (seconds > 50) {
                  var Minutes = minutes + 1;
                  nextnotification[l].created_at = Minutes + ' minutes ago';
                } else {
                  nextnotification[l].created_at = minutes + ' minutes ago';
                }
              } else {
                nextnotification[l].created_at = minutes + ' minute ago';
              }
            } else if (seconds != 0 && minutes == 0 && hours == 0) {
              if (seconds > 1) {
                if (milliseconds > 50) {
                  var Seconds = seconds + 1;
                  nextnotification[l].created_at = Seconds + ' seconds ago';
                } else {
                  nextnotification[l].created_at = seconds + ' seconds ago';
                }
              } else {
                nextnotification[l].created_at = seconds + ' second ago';
              }
            }
          }
          this.notificationList = this.notificationList.concat(nextnotification);
        }
      });
    }
  }

  openNotify() {
    $('#notifySection').toggleClass('active');
  }

  NotifyRead(notifyID, indexID) {
    $('#notifySection').toggleClass('active');
    var request = {
      "id": notifyID
    }
    this.loginservice.NotificationRead(request).subscribe(data => {
      if (data.status_code == 200) {
        let notoficationdata = data.data;
        this.posDate = notoficationdata.created_at + '.000Z';
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
            notoficationdata.created_at = days + ' days ago';
          } else {
            notoficationdata.created_at = days + ' day ago';
          }
        } else if (hours != 0 && days == 0) {
          if (hours > 1) {
            if (minutes > 50) {
              var Hours = hours + 1;
              notoficationdata.created_at = Hours + ' hours ago';
            } else {
              notoficationdata.created_at = hours + ' hours ago';
            }
          } else {
            notoficationdata.created_at = hours + ' hour ago';
          }
        } else if (minutes != 0 && hours == 0) {
          if (minutes > 1) {
            if (seconds > 50) {
              var Minutes = minutes + 1;
              notoficationdata.created_at = Minutes + ' minutes ago';
            } else {
              notoficationdata.created_at = minutes + ' minutes ago';
            }
          } else {
            notoficationdata.created_at = minutes + ' minute ago';
          }
        } else if (seconds != 0 && minutes == 0 && hours == 0) {
          if (seconds > 1) {
            if (milliseconds > 50) {
              var Seconds = seconds + 1;
              notoficationdata.created_at = Seconds + ' seconds ago';
            } else {
              notoficationdata.created_at = seconds + ' seconds ago';
            }
          } else {
            notoficationdata.created_at = seconds + ' second ago';
          }
        }
        this.notificationList[indexID] = notoficationdata;
        if (data.notification_unread_count == 0) {
          this.unread_notification_count = '';
        } else {
          this.unread_notification_count = data.notification_unread_count;
        }
      }
    });
  }

  markRead() {
    $('#notifySection').toggleClass('active');
    this.loginservice.markallread().subscribe(data => {
      if (data.status_code == 200) {
        let notoficationdata = data.data.data;
        for (let l = 0; l < this.notificationList.length; l++) {
          this.posDate = notoficationdata[l].created_at + '.000Z';
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
              notoficationdata[l].created_at = days + ' days ago';
            } else {
              notoficationdata[l].created_at = days + ' day ago';
            }
          } else if (hours != 0 && days == 0) {
            if (hours > 1) {
              if (minutes > 50) {
                var Hours = hours + 1;
                notoficationdata[l].created_at = Hours + ' hours ago';
              } else {
                notoficationdata[l].created_at = hours + ' hours ago';
              }
            } else {
              notoficationdata[l].created_at = hours + ' hour ago';
            }
          } else if (minutes != 0 && hours == 0) {
            if (minutes > 1) {
              if (seconds > 50) {
                var Minutes = minutes + 1;
                notoficationdata[l].created_at = Minutes + ' minutes ago';
              } else {
                notoficationdata[l].created_at = minutes + ' minutes ago';
              }
            } else {
              notoficationdata[l].created_at = minutes + ' minute ago';
            }
          } else if (seconds != 0 && minutes == 0 && hours == 0) {
            if (seconds > 1) {
              if (milliseconds > 50) {
                var Seconds = seconds + 1;
                notoficationdata[l].created_at = Seconds + ' seconds ago';
              } else {
                notoficationdata[l].created_at = seconds + ' seconds ago';
              }
            } else {
              notoficationdata[l].created_at = seconds + ' second ago';
            }
          }
        }
        this.notificationList = notoficationdata;
        $('#notifySection').removeClass('active');
        if (data.notification_unread_count == 0) {
          this.unread_notification_count = '';
        } else {
          this.unread_notification_count = data.notification_unread_count;
        }
      }
    });
  }

  openSearch() {
    $('.mb-search form.search-form').toggle();
  }


  ngOnInit() {
    $('.home').removeClass('active');
    this.loginCokkie = this.cookieInfo.get('Login_cookies');
    $(".main-content-w").click(function () {
      $('body').removeClass('side-menu-active');
    });
  }

}
