import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PostsService } from '../services/posts/posts.service';

@Component({
  selector: 'app-abuse',
  templateUrl: './abuse.component.html',
  styleUrls: ['./abuse.component.css']
})
export class AbuseComponent implements OnInit {
  abusereasondata: any;
  Bannerdata: any;
  abuseInfo = {
    'post_id': '',
    'post_title': '',
    'category_id': '',
    'reason_id': '',
    'reason': '',
    'message': ''
  }
  postid: string;
  postData: any;
  postCat: any;
  slideConfigs = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 6000, "arrows": false };
  constructor(private route: ActivatedRoute, private postservice: PostsService, private router: Router, private CookieService: CookieService) {
    this.postid = this.route.snapshot.params['id'];
    this.getBanner();
    this.abusereasons();
    this.getpostdetails();
  }

  abusereasons = function () {
    this.postservice.getreasons().subscribe(data => {
      if (data.status_code == 200) {
        this.abusereasondata = data.data;
        // console.log(this.adsarray);
      }
    });
  }


  getpostdetails() {
    var req = {
      "id": this.postid,
    }
    this.postservice.mypostdetails(req).subscribe(resp => {
      this.postData = resp.data;
      this.postCat = this.postData.postcategories;
      this.abuseInfo.post_title = this.postData.title;
      this.abuseInfo.category_id = this.postCat[0].category_id;
    });
  }

  abuseReport(abuseInfo) {
    abuseInfo.post_id = this.postid;
    let abusereason = abuseInfo.reason.split("-");
    abuseInfo.reason = abusereason[0];
    abuseInfo.reason_id = abusereason[1];
    this.postservice.addabuse(abuseInfo).subscribe(data => {
      if (data.status_code == '200') {
        alert(data.message);
        this.router.navigate(['postdetails', this.postid]);
      }
    });
    console.log(abuseInfo);
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

  ngOnInit() {
  }

}