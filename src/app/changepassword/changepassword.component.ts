import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { SEOservicesService } from '../services/seoservices.service';

@Component({
  selector: 'changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  changeinfo = {
    old_password: '',
    password: '',
    password_confirmation: ""

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
  constructor(private seoservice: SEOservicesService, private loginservice: LoginService, private Router: Router) {
    this.seoservice.updateTitle();
    $('body').removeClass('side-menu-active');
  }
  changepassword(changeinfo) {
    console.log(changeinfo);
    this.loginservice.changepassword(changeinfo).subscribe(data => {
      if (data.status_code == "200") {
        this.message = data.message;
        this.myDiv.nativeElement.click();
        console.log(data);
        this.Router.navigate(['login']);
      }
    });
  }
  ngOnInit() {
  }

}
