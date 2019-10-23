import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts/posts.service';
import { SEOservicesService } from '../services/seoservices.service';

@Component({
  selector: 'termsandcondiation',
  templateUrl: './termsandcondiation.component.html',
  styleUrls: ['./termsandcondiation.component.css']
})
export class TermsandcondiationComponent implements OnInit {
  Bannerdata: any[];
  slideConfigs = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 6000, "arrows": false };
  constructor(private seoservice: SEOservicesService, private postservice: PostsService) { 
    this.seoservice.updateTitle();
   this.getBanner();
  }
  getBanner = function () {
    const bannerVal = new FormData;
    bannerVal.append('location', 'TERMS');
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
