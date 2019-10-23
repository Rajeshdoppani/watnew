import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/login/login.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from 'jquery';
import { SEOservicesService } from '../services/seoservices.service';

@Component({
  selector: 'myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  @ViewChild('myDiv') myDiv: ElementRef;
  @ViewChild('profileverify') profileverify: ElementRef;
  regInfo = {
    nick_name: '',
    mobile: '',
    email: '',
    city: '',
    profile_pic: ''
  }
  otp = {
    otpNumber: '', otpemail: '', otppassword: ''
  }
  counter;
  emailpattren;
  message;
  err_show;
  messageemail;
  errormessage: any;
  profilepicUpload: File = null;
  profilepic: string;
  msg_show;
  request: {};
  otpreq: {};
  profiledata: any;
  profile_picURL: any;
  profilenick_name: any;
  constructor(private seoservice: SEOservicesService, private CookieService: CookieService, private Loginservice: LoginService) {
    this.seoservice.updateTitle();
    $('body').removeClass('side-menu-active');
    this.getprofile();
  }


  profilepicInput(files: FileList) {
    this.profilepicUpload = files.item(0);
    console.log(this.profilepicUpload);
    this.profilepic = this.profilepicUpload.name;
  }

  getprofile() {
    this.Loginservice.getprofile().subscribe(resp => {
      if (resp.status_code == "200") {
        this.profiledata = resp.data;
        this.profilenick_name = this.profiledata.nick_name;
        this.profile_picURL = this.profiledata.fullpathimage;
        if (this.profile_picURL == null) {
          this.profile_picURL = 'assets/images/avatar-img.jpg';
        }
        this.regInfo.nick_name = this.profiledata.nick_name;
        this.regInfo.mobile = this.profiledata.mobile;
        this.regInfo.email = this.profiledata.email;
        this.regInfo.city = this.profiledata.city;
        this.regInfo.profile_pic = this.profiledata.fullpathimage;
        this.CookieService.set('nick_name', JSON.stringify(this.profiledata.nick_name));
        this.CookieService.set('profile_pic', JSON.stringify(this.profiledata.fullpathimage));
      }
    });
  }

  Updateprofile(regInfo) {
    const fd = new FormData();
    if (regInfo.nick_name != null) {
      fd.append('nick_name', regInfo.nick_name);
    }
    if (regInfo.mobile != null) {
      fd.append('mobile', regInfo.mobile);
    }
    if (regInfo.email != null) {
      fd.append('email', regInfo.email);
    }
    if (regInfo.city != null) {
      fd.append('city', regInfo.city);
    }
    if (this.profilepicUpload != null) {
      fd.append('profile_pic', this.profilepicUpload);
    }
    this.Loginservice.Updateprofile(fd).subscribe(resp => {
      // console.log(resp);
      if (resp.status_code == "200") {
        this.message = resp.message;
        this.getprofile();
        this.myDiv.nativeElement.click();
      }
    });
  }
  ngOnInit() {
  }

}
