import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/login/login.service';
import { Subscriber } from 'rxjs';
import * as $ from 'jquery';
import { SEOservicesService } from '../services/seoservices.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginInfo = {
    email: '',
    mobile: "",
    password: ''
  }
  verifyInfo = {
    mobile: "",
    password: '',
    otp: {}
  }
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
  errorshow;
  @ViewChild('myDiv') myDiv: ElementRef;
  email;
  Mobile;
  usercat;
  checked;
  errormessage;
  user_states: any;
  messageVerify: any;
  otpmessage: any;
  constructor(private seoservice: SEOservicesService, private LoginService: LoginService, private CookieService: CookieService, private Router: Router) {
    this.seoservice.updateTitle();
    this.getLocation();
    $('body').removeClass('side-menu-active');
    // var is_safari = window.navigator.userAgent;
    // Deleting All Cookies //
    // this.CookieService.deleteAll();
  }


  getLocation() {
    this.LoginService.IPLocation().subscribe(data => {
      // console.log(data['ip']);
      localStorage.setItem('IPAddress', data['ip']);
      localStorage.setItem('Location_name', data['city']);
    });
  }

  checkValue(event: any) {
    // console.log(event);
    if (event == "A") {
      this.email = false;
      this.Mobile = true;
    } else {
      this.email = true;
      this.Mobile = false;
    }
  }

  toggleVisibility(e) {
    this.checked = e.target.checked;
    console.log(this.checked);
    if (this.checked == true) {
      localStorage.setItem('email', this.loginInfo.email);
      localStorage.setItem('password', this.loginInfo.password);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
  }

  LoginAuth = function (loginInfo) {
    // var subcatids = JSON.parse(this.CookieService.get('subcategory'));
    // console.log(subcatids);
    const fd = new FormData();
    fd.append("mobile", this.loginInfo.mobile);
    fd.append("password", loginInfo.password);
    fd.append("ip_address", localStorage.getItem('IPAddress'));
    fd.append("location_name", localStorage.getItem('Location_name'));
    var mToken = JSON.parse(this.CookieService.get("mobile_token"));
    if (mToken != null) {
      fd.append("mobile_token", JSON.parse(this.CookieService.get("mobile_token")));
    }
    // console.log(fd);
    this.LoginService.Login(fd).subscribe(data => {
      if (data.status_code == 200) {
        this.message = data.message;
        if (data.user_verify == 'Mobile') {
          this.errormessage = true;
          this.otp.otpemail = this.loginInfo.mobile;
          this.otp.otppassword = this.loginInfo.password;
          this.message = data.message;
          var count = 120,
            timer = setInterval(function () {
              $("#countdown-numbers_login").html(count--);
              if (count == 0) {
                clearInterval(timer);
                $("#countdowns_login").addClass('countreset');
                $("#countdown-numbers_login").html(0);
                this.message = 'OTP has been expired click on Resend OTP';
              }
            }, 1000);
          this.myDiv.nativeElement.click();
         // this.CookieService.set('sessionid', JSON.stringify(data.session_id));
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
          this.userstates = data.user_states;
          if (this.userstates.length != 0) {
            var subcatarray = [];
            for (let j = 0; j < this.userstates.length; j++) {
              subcatarray.push(this.userstates[j].state_id);
            }
            var finalstates = subcatarray.toString();
            // console.log(subcatarray);
            this.CookieService.set('liveStates', finalstates);
          } else {
            this.CookieService.set('liveStates', '0');
          }
          this.message = data.message;
          var redirectURL = JSON.parse(this.CookieService.get('afterLoginURL'));
          if (redirectURL != 0) {
            this.Router.navigate(['' + redirectURL]);
          } else {
            this.Router.navigate(['home']);
          }
          // this.Router.navigate(['home']);
        }
      } else {
        this.errormessage = true;
        // this.CookieService.deleteAll();
        this.message = data.message;

      }

    });
  }


  verifyotp(number) {
    // console.log(this.regInfo);
    // console.log(number);
    this.otp = number.otpNumber;
    // console.log(this.otp);
    this.verifyInfo.mobile = number.otpemail;
    this.verifyInfo.otp = this.otp;
    this.verifyInfo.password = number.otppassword;
    // this.verifyInfo.session_id = JSON.parse(this.CookieService.get("sessionid"));
    // console.log(this.verifyInfo);
    this.LoginService.Login(this.verifyInfo).subscribe(data => {
      if (data.status_code == "200") {
        $('.otpsuccess').show();
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
        this.message = data.message;
        var redirectURL = JSON.parse(this.CookieService.get('afterLoginURL'));
        if (redirectURL != 0) {
          this.Router.navigate(['' + redirectURL]);
        } else {
          this.Router.navigate(['home']);
        }
      } else {
        // alert(data.message);
        this.messageVerify = data.message;
      }
    });
  }

  resendOtp(otp) {
    console.log(otp);
    var request = {
      "mobile": otp.otpemail,
      "password": otp.otppassword
    };
    this.LoginService.resendOTP(request).subscribe(data => {
      if (data.status_code == "200") {
        // this.CookieService.set('sessionid', JSON.stringify(data.session_id));
        //  $("#countdowns").addClass('resendreset');
        var count = 120,
          timer = setInterval(function () {
            $("#otpExpired").text('');
            $("#countdowns_login").removeClass('countreset');
            $("#countdown-numbers_login").html(count--);
            if (count == 0) {
              clearInterval(timer);
              $("#countdowns_login").addClass('countreset');
              $("#countdown-numbers_login").html(0);
              $("#otpExpired").text('OTP has been expired click on Resend OTP');
            }
          }, 1000);
        this.otpmessage = data.message;
        //  alert(data.message);
      }
    });
  }

  ngOnInit() {
    this.email = true;
    this.errormessage = false;
  }

}
