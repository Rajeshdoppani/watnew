import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ServicesService } from '../services/services.service';
import { PageService } from '../services/page/page.service';
import { TrendingService } from '../services/trending/trending.service';
import { EmbedVideoService } from 'ngx-embed-video';
import { PostsService } from '../services/posts/posts.service';
import { CelebritypageService } from '../services/celebritypage/celebritypage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rightsidebar',
  templateUrl: './rightsidebar.component.html',
  styleUrls: ['./rightsidebar.component.css']
})
export class RightsidebarComponent implements OnInit {
  Adsdata: any[];
  adsarray = [];
  url;
  slides = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 8000, "arrows": false, "dots": false };
  suggestionsData: any;
  trendata: any;
  thumbnail: any;
  trendimages: any;
  trendvideos: any;
  trendyvidoes: any;
  trendtitle: any;
  follow_data: any;
  constructor(private router: Router, private celebritypage: CelebritypageService, private postservice: PostsService, private embedService: EmbedVideoService, private trendingservice: TrendingService, private pageservice: PageService, private CookieService: CookieService, private ServicesService: ServicesService) {
    this.getAds();
    this.getsuggestions();
    this.trending();
  }

  getsuggestions() {
    const fd = new FormData();
    var subcatids = JSON.parse(this.CookieService.get('subcategory'));
    for (let q = 0; q < subcatids.length; q++) {
      if (subcatids[q].subcategory_id != undefined && subcatids[q].category_id != undefined) {
        fd.append("page[" + [q] + "][category_id]", subcatids[q].category_id);
        fd.append("page[" + [q] + "][subcategory_id]", subcatids[q].subcategory_id);
      }
    }
    this.pageservice.GetSuggestions(fd).subscribe(data => {
      if (data.status_code == 200) {
        this.suggestionsData = data.data.data;
      } else {
       // alert(data.message);
      }
    });
  }


  following(res, index) {
    if (this.CookieService.get("isAuthenticated") == "true") {
      var reqbody = {
        page_id: res.id,
      }
      this.celebritypage.following(reqbody).subscribe(data => {
        if (data.status_code == 201) {
          this.follow_data = data.data;
          this.suggestionsData.splice(index, 1);
        } else {
          alert(data.message);
        }
      });
    } else {
      this.router.navigate(['login']);
    }
  }


  trending() {
    this.trendingservice.trending().subscribe(resp => {
      if (resp.status_code == "200") {
        this.trendata = resp.posts.data;
        for (let r = 0; r < this.trendata.length; r++) {
          this.trendtitle = this.trendata[r].title;
          var titleres = this.trendtitle.slice(0, 50);
          this.trendata[r].title = titleres;
          if (this.trendata[r].yvideos.length != 0) {
            this.embedService
              .embed_image(
                this.trendata[r].yvideos[0].path,
                { image: 'mqdefault' }
              )
              .then(res => {
                this.trendata[r].yvideos[0].path = res.html;
              });
          }
        }
      }
    });
  }

  getAds = function () {
    this.postservice.GetAds().subscribe(data => {
      if (data.status_code == 200) {
        this.Adsdata = data.data;
        for (let t = 0; t < this.Adsdata.length; t++) {
          if (this.Adsdata[t].position == 'RIGHT' && this.Adsdata[t].status == '1') {
            if (this.Adsdata[t].addsimages.length != '0') {
              this.adsarray.push({ "url": this.Adsdata[t].url, "image": this.Adsdata[t].addsimages[0].path, "video": '' });
            }

          }
          this.adsarray.reverse();
        }
        // console.log(this.adsarray);
      }
    });
  }

  ngOnInit() {
    // let temp = ServicesService.API_Base_URL.split('/');
    // this.url = temp[0];
    // console.log(    this.url);
  }

}
