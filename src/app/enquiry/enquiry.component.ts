import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PostsService } from '../services/posts/posts.service';
import { ServicesService } from '../services/services.service';
import { database } from 'firebase';
import * as $ from 'jquery';

@Component({
  selector: 'enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  post_id: any;
  postData: any;
  postCat: any;
  Bannerdata: any;
  baseURL: any;
  enquiryInfo = {
    'post_id': '',
    "name": '',
    "email": '',
    "mobile": '',
    "message": '',
    "post_title": '',
    "category_id": ''
  }
  message: any;
  disableclick: any;
  slideConfigs = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 4000, "arrows": false };
  constructor(private route: ActivatedRoute, private router: Router, private cookieservice: CookieService, private postservice: PostsService) {
    this.post_id = this.route.snapshot.params['id'];
    this.baseURL = ServicesService.API_Share_URL;
    this.getBanner();
    this.getpostdetails();
  }

  getBanner = function () {
    const bannerVal = new FormData;
    bannerVal.append('location', 'ABOUT');
    this.postservice.GetBanners(bannerVal).subscribe(data => {
      if (data.status_code == 200) {
        this.Bannerdata = data.data;
        // console.log(this.adsarray);
      }
    });
  }

  getpostdetails() {
    var req = {
      "id": this.post_id,
    }
    this.postservice.mypostdetails(req).subscribe(resp => {
      this.postData = resp.data;
      this.postCat = this.postData.postcategories;
      this.enquiryInfo.post_title = this.postData.title;
      this.enquiryInfo.category_id = this.postCat[0].category_id;
    });
  }

  SendEnquiry(enquiryInfo) {
    // console.log(enquiryInfo);
    this.disableclick = 'true';
    enquiryInfo.post_id = this.post_id;
    this.postservice.sendenquiry(enquiryInfo).subscribe(data => {
      if (data.status_code == '200') {
        // alert(data.message);
        $('#showmessage').show();
       // this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['postdetails', this.post_id]);
        }, 2000);
      }
    });
  }

  ngOnInit() {
  }

}
