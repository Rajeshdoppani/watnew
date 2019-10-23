import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import { LoginService, LoginService } from '../services/login.service';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  @ViewChild('myDiv') myDiv: ElementRef;
  forgetInfo = {
    email: '',
    mobile: '',
    device_type: ''
  }
  changeInfo = {
    mobile: '',
    password: '',
    password_confirmation: '',
    otp: ''
  }
  data = [];
  errorshow;
  forgotcount;
  resendcount;
  private countdownNumberEl: number;
  textContent: any;
  constructor(private LoginService: LoginService, private CookieService: CookieService, private Router: Router) {
    $('body').removeClass('side-menu-active');
   }
  
  forgetAuth(forgetInfo) {
    this.resendcount = false;
    this.forgotcount = true;
    var str = forgetInfo.email;
    var emailvalid = str.includes(".");
    // console.log(n);
    if (emailvalid == true) {
      this.errorshow = true;
      delete forgetInfo.mobile;
      this.forgetInfo.email = forgetInfo.email;
    } else {
      this.errorshow = false;
      this.forgetInfo.mobile = forgetInfo.email;
      delete forgetInfo.email;
      this.forgetInfo.device_type = 'DESKTOP';
    }
    console.log(forgetInfo);
    this.LoginService.forgetAuth(forgetInfo).subscribe(data => {
      if (this.forgetInfo.mobile == forgetInfo.mobile) {
        if (data.status_code == "200") {
          this.changeInfo.mobile = this.forgetInfo.mobile;
          var count = 120, timer = setInterval(function () {
            $("#countdown-number").empty();
            $("#countdown-number").html(count--);
            if (count == 0) {
              clearInterval(timer);
              $("#countdown-number").html(0);
            }
          }, 1000);
          this.myDiv.nativeElement.click();
          // this.CookieService.set('sessionid', JSON.stringify(data.session_id));
        } else {
          alert(data.message);
        }
      } else {
        alert(data.message);
      }

    });
  }
  changeAuth(changeInfo) {
    // this.changeInfo.session_id = JSON.parse(this.CookieService.get("sessionid"));
    // console.log(changeInfo);
    this.LoginService.changeAuth(changeInfo).subscribe(data => {
      if (data.status_code == "200") {
        alert(data.message);
        this.Router.navigate(['login']);
      }
    });
  }
  resendOtp(changeInfo) {
    this.resendcount = true;
    this.forgotcount = false;
    // console.log(changeInfo);
    var request = {
      "mobile": changeInfo.mobile,
      "password": changeInfo.password_confirmation
    };
    this.LoginService.resendOTP(request).subscribe(data => {
      if (data.status_code == "200") {
        // this.CookieService.set('sessionid', JSON.stringify(data.session_id));
        var count = 120, timer = setInterval(function () {
          $("#countdown-number_resend").empty();
          $("#countdown-number_resend").html(count--);
          if (count == 0) {
            clearInterval(timer);
            $("#countdown-number_resend").html(0);
          }
        }, 1000);
        alert(data.message);
      }
    });
  }

  ngOnInit() {
    this.forgotcount = false;
    this.resendcount = false;
  }

}
