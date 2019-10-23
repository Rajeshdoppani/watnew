import { Component, OnInit, ViewChild, ElementRef, Injectable } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/login/login.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { PostsService } from './posts/posts.service';

@Injectable()
export class SharedserviceService {
  verifyInfo = {
    mobile: "",
    password: '',
    otp: {}
  }
  public subject = new Subject<any>();
  @ViewChild('loginpopup') loginpopup: ElementRef;
  message;
  otp = {
    otpNumber: '', otpemail: '', otppassword: ''
  }
  counter;
  role = {
    email: "",
    mobile: ""
  }
  request: {};
  email;
  Mobile;
  usercat;
  checked;
  errormessage;
  constructor(private postservice: PostsService, private LoginService: LoginService, private CookieService: CookieService, private Router: Router) { }
  public data = [];
  LoginAuth = function (loginInfo) {
    const fd = new FormData();
    fd.append("mobile", loginInfo.mobile);
    fd.append("password", loginInfo.password);
    var mToken = JSON.parse(this.CookieService.get("mobile_token"));
    if (mToken != null) {
      fd.append("mobile_token", JSON.parse(this.CookieService.get("mobile_token")));
    }
    this.LoginService.Login(fd).subscribe(data => {
      if (data.status_code == 200) {
        this.message = data.message;
        if (data.user_verify == 'Mobile') {
          // this.myDiv.nativeElement.click();
          // this.CookieService.set('sessionid', JSON.stringify(data.session_id));
          data.type = '1';
          this.subject.next(data);
        } else if (data.token != '') {
          // this.CookieService.deleteAll();
          this.CookieService.set('token', JSON.stringify(data.data.token));
          this.CookieService.set('id', JSON.stringify(data.data.id));
          this.CookieService.set('nick_name', JSON.stringify(data.data.nick_name));
          this.CookieService.set('profile_pic', JSON.stringify(data.data.profile_pic));
          this.CookieService.set('Email', JSON.stringify(data.data.email));
          this.CookieService.set('mobile', JSON.stringify(data.data.mobile));
          if (data.page.length != 0) {
            this.CookieService.set('pageID', JSON.stringify(data.page[0].id));
          }
          this.CookieService.set('isAuthenticated', 'true');
          this.usercat = data.user_categories;
          if (this.usercat.length != 0) {
            var subcatarray = [];
            for (let j = 0; j < this.usercat.length; j++) {
              subcatarray.push({ "subcategory_id": this.usercat[j].subcategories[0].id, "category_name": this.usercat[j].subcategories[0].category_name, "category_id": this.usercat[j].subcategories[0].category_id });
            }
            // console.log(subcatarray);
            this.CookieService.set('subcategory', JSON.stringify(subcatarray));
          }
          this.Addfavourite();
          this.message = data.message;
          this.subject.next(data);

          // this.loginpopup.nativeElement.close();
          // alert(this.message);
          // this.Router.navigate(['home']);
        }
      }
    });
  }

  verifyotp(number) {
    console.log(number);
    if (number.otptype == 1) {
      this.otp = number.otpNumber;
      this.verifyInfo.mobile = number.otpemail;
      this.verifyInfo.otp = this.otp;
      this.verifyInfo.password = number.otppassword;
     // this.verifyInfo.session_id = JSON.parse(this.CookieService.get("sessionid"));
      this.LoginService.Login(this.verifyInfo).subscribe(data => {
        if (data.status_code == "200") {
          // this.CookieService.deleteAll();
          this.CookieService.set('token', JSON.stringify(data.data.token));
          this.CookieService.set('id', JSON.stringify(data.data.id));
          this.CookieService.set('nick_name', JSON.stringify(data.data.nick_name));
          this.CookieService.set('profile_pic', JSON.stringify(data.data.profile_pic));
          this.CookieService.set('Email', JSON.stringify(data.data.email));
          this.CookieService.set('mobile', JSON.stringify(data.data.mobile));
          if (data.page.length != 0) {
            this.CookieService.set('pageID', JSON.stringify(data.page[0].id));
          }
          this.CookieService.set('isAuthenticated', 'true');
          this.usercat = data.user_categories;
          if (this.usercat.length != 0) {
            var subcatarray = [];
            for (let j = 0; j < this.usercat.length; j++) {
              subcatarray.push({ "subcategory_id": this.usercat[j].subcategories[0].id, "category_name": this.usercat[j].subcategories[0].category_name, "category_id": this.usercat[j].subcategories[0].category_id });
            }
            // console.log(subcatarray);
            this.CookieService.set('subcategory', JSON.stringify(subcatarray));
          }
          this.Addfavourite();
          this.subject.next(data);
        } else {
          // this.subject.next(data);
        }
      });
    } else if (number.otptype == 2) {
      var request = {
        "mobile": number.otpemail,
        "password": number.otppassword,
        "otp": number.otpNumber
      };
      this.LoginService.Userregister(request).subscribe(data => {
        if (data.status_code == "200") {
          this.CookieService.set('token', JSON.stringify(data.data.token));
          this.CookieService.set('id', JSON.stringify(data.data.id));
          this.CookieService.set('nick_name', JSON.stringify(data.data.nick_name));
          this.CookieService.set('profile_pic', JSON.stringify(data.data.profile_pic));
          this.CookieService.set('Email', JSON.stringify(data.data.email));
          this.CookieService.set('mobile', JSON.stringify(data.data.mobile));
          if (data.page.length != 0) {
            this.CookieService.set('pageID', JSON.stringify(data.page[0].id));
          }
          this.CookieService.set('isAuthenticated', 'true');
          this.usercat = data.user_categories;
          if (this.usercat.length != 0) {
            var subcatarray = [];
            for (let j = 0; j < this.usercat.length; j++) {
              subcatarray.push({ "subcategory_id": this.usercat[j].subcategories[0].id, "category_name": this.usercat[j].subcategories[0].category_name, "category_id": this.usercat[j].subcategories[0].category_id });
            }
            // console.log(subcatarray);
            this.CookieService.set('subcategory', JSON.stringify(subcatarray));
          }
          this.Addfavourite();
          this.subject.next(data);
        } else {
        }
      });
    }
  }

  resendOtp(otp) {
    // console.log(otp);
    var request = {
      "mobile": otp.otpemail,
      "password": otp.otppassword
    };
    this.LoginService.resendOTP(request).subscribe(data => {
      if (data.status_code == "200") {
       // this.CookieService.set('sessionid', JSON.stringify(data.session_id));
        this.subject.next(data);
        // $("#countdowns").removeClass('countreset');
        // $("#countdowns").addClass('resendreset');
        // var count = 120, timer = setInterval(function () {
        //   $("#countdown-numbers").html(count--);
        //   if (count == 0) {
        //     clearInterval(timer);
        //     $("#countdowns").addClass('countreset');
        //     $("#countdown-numbers").html(0);
        //   }
        // }, 1000);
      }
    });
  }

  UserRegister = function (regInfo) {
    var subcatids = JSON.parse(this.CookieService.get('subcategory'));
    const fd = new FormData();
    fd.append("nick_name", regInfo.nick_name);
    fd.append("mobile", regInfo.mobile);
    fd.append("password", regInfo.password);
    for (let q = 0; q < subcatids.length; q++) {
      if (subcatids[q].subcategory_id != undefined && subcatids[q].category_id != undefined) {
        fd.append("categories[" + [q] + "][category_id]", subcatids[q].category_id);
        fd.append("categories[" + [q] + "][subcategory_id]", subcatids[q].subcategory_id);
      }
    }
    var mToken = JSON.parse(this.CookieService.get("mobile_token"));
    if (mToken != null) {
      fd.append("mobile_token", JSON.parse(this.CookieService.get("mobile_token")));
    }
    // console.log(this.request);
    this.LoginService.Userregister(fd).subscribe(data => {
      if (data.status_code == 200) {
        if (data.user_verify == 'Mobile') {
          // this.CookieService.set('sessionid', JSON.stringify(data.session_id));
          data.type = '2';
          this.subject.next(data);
        }
      } else {
      }
    });
  }


  Addfavourite() {
    var favouriteVal = JSON.parse(this.CookieService.get('favouriteID'));
    var reqbody = {
      post_id: favouriteVal,
    }
    // console.log(i);
    this.postservice.postlike(reqbody).subscribe(data => {
      if (data.status_code == "200") {
      }
    });
  }

  getResponse() {
    // return this.data;
    return this.subject.asObservable();
  }

}
