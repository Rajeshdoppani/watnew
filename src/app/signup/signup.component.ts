import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/login/login.service';
import { Subscriber } from 'rxjs';
import { SEOservicesService } from '../services/seoservices.service';
declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('myDiv') myDiv: ElementRef;

  regInfo = {
    reg_nickname: '',
    reg_email: '',
    reg_mobile: '',
    reg_password: '',
    rememberme: ''
  }
  otpmessage;
  emailpattren;
  message;
  err_show;
  messageemail;
  signmessage;
  resendotp;
  verifyotpdefault;
  otp = {
    otpNumber: ''
  }
  usercat: any;
  counter;
  msg_show;
  request: {};
  otpreq: {};
  constructor(private seoservice: SEOservicesService, private LoginService: LoginService, private CookieService: CookieService, private Router: Router) {
    this.seoservice.updateTitle();
    this.getLocation();
    $('body').removeClass('side-menu-active');
    this.emailpattren = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}$/";
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

  onKeyUp(event, name) {
    this.err_show = false;
    var str = name;
    var n = str.includes(".");
    // console.log(n);
    if (n == true) {
      var data = {
        email: name,
      }
      this.LoginService.emailmobileunique(data).subscribe(data => {
        console.log(data);
        if (data.status_code == "400") {
          this.message = data.message;
          this.err_show = true;
        } else {
          this.err_show = false;
        }

      });
    } else if (name.length == 10) {           //Mobile  verifcation start
      var datobja = {
        mobile: name,
      }
      this.LoginService.emailmobileunique(datobja).subscribe(data => {
        console.log(data);
        if (data.status_code == "400") {
          this.message = data.message;
          this.err_show = true;
        } else {
          this.err_show = false;
        }

      });
    }
    // if (event.target.name == "reg_mobile") {
    //   this.err_show = false;
    //   if (name.length == 10) {           //Mobile  verifcation start
    //     var datobja = {
    //       mobile: name,
    //     }
    //     this.LoginService.emailmobileunique(datobja).subscribe(data => {
    //       console.log(data);
    //       if (data.status_code == "400") {
    //         this.message = data.message;
    //         this.err_show = true;
    //       } else {
    //         this.err_show = false;
    //       }
    //     });
    //   }
    // }


  }

  UserRegister = function (regInfo) {
    var subcatids = JSON.parse(this.CookieService.get('subcategory'));
    // console.log(subcatids);
    const fd = new FormData();
    //console.log(loginInfo);
    if (regInfo.reg_email.length == 10) {
      this.request = {
        "nick_name": regInfo.reg_nickname,
        "mobile": regInfo.reg_email,
        "password": regInfo.reg_password
      };
      fd.append("nick_name", this.request.nick_name);
      fd.append("mobile", this.request.mobile);
      fd.append("password", this.request.password);
      fd.append("ip_address", localStorage.getItem('IPAddress'));
      fd.append("location_name", localStorage.getItem('Location_name'));
      // fd.append("referral_code", 'UP6bkM1CaFfFWmX3e2FFSn5G65p14x36RNB');
    } else if (regInfo.reg_email != 10) {
      this.request = {
        "nick_name": regInfo.reg_nickname,
        "email": regInfo.reg_email,
        "password": regInfo.reg_password
      };
      fd.append("nick_name", this.request.nick_name);
      fd.append("email", this.request.email);
      fd.append("password", this.request.password);
      fd.append("ip_address", localStorage.getItem('IPAddress'));
      fd.append("location_name", localStorage.getItem('Location_name'));
    }
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
      this.verifyotpdefault = true;
      this.resendotp = false;
      if (data.status_code == 200) {
        if (data.user_verify == 'Mobile') {
          this.myDiv.nativeElement.click();
         // this.CookieService.set('sessionid', JSON.stringify(data.session_id));
          this.signmessage = data.message;
          var count = 120,
            timer = setInterval(function () {
              $("#countdown-number_signup").empty();
              $("#countdown-number_signup").html(count--);
              if (count == 0) {
                clearInterval(timer);
                $("#countdown_signup").addClass('countreset');
                $("#countdown-number_signup").html(0);
                this.otpmessage = 'OTP has been expired click on Resend OTP';
              }
            }, 1000);
        } else if (data.user_verify == 'Email') {
          this.signmessage = data.message;
          this.Router.navigate(['login']);
        }
        // this.CookieService.set('id', JSON.stringify(data.data.id));
        // this.CookieService.set('nick_name', JSON.stringify(data.data.nick_name));
        //  alert(data.message);
      } else {
        this.signmessage = data.message;
      }
    });
  }

  verifyotp(number) {
    var request = {
      "nick_name": this.regInfo.reg_nickname,
      "mobile": this.regInfo.reg_email,
      "password": this.regInfo.reg_password,
      "otp": number.otpNumber
    };
    this.LoginService.Userregister(request).subscribe(data => {
      // console.log(data);
      if (data.status_code == "200") {
        // this.Router.navigate(['home']);
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
        this.otpmessage = data.message;
        // this.Router.navigate(['home']);
      } else {
        this.otpmessage = data.message;
      }
    });

  }

  resendOtp() {
    var request = {
      "mobile": this.regInfo.reg_email,
      "password": this.regInfo.reg_password
    };
    this.LoginService.resendOTP(request).subscribe(data => {
      this.verifyotpdefault = false;
      this.resendotp = true;
      if (data.status_code == "200") {
        // this.CookieService.set('sessionid', JSON.stringify(data.session_id));
        // this.Router.navigate(['home']);
        // $("#countdown").removeClass('countreset');
        // $("#countdown").addClass('resendreset');
        // var count = 120, 
        // timer = setInterval(function () {
        //   $("#countdown-number").empty();
        //   $("#countdown-number").html(count--);
        //   if (count == 0) {
        //     clearInterval(timer);
        //     $("#countdown").addClass('countreset');
        //     $("#countdown-number").html(0);
        //   }
        // }, 1000);
        var count = 120,
          timer = setInterval(function () {
            $("#countdown-number_resend").empty();
            $("#countdown-number_resend").html(count--);
            if (count == 0) {
              clearInterval(timer);
              $("#countdown_resend").addClass('countreset');
              $("#countdown-number_resend").html(0);
              this.otpmessage = 'OTP has been expired click on Resend OTP';
            }
          }, 1000);
        this.otpmessage = data.message;
        // alert(data.message);
      }
    });
  }

  ngOnInit() {
    this.err_show = false;
    this.verifyotpdefault = false;
    this.resendotp = false;
  }

}
