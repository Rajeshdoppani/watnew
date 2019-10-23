import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { Subscriber } from 'rxjs';
import { CategoriesService } from '../services/categories/categories.service';
import { count } from 'rxjs/operators';
import * as $ from 'jquery';
import { PostsService } from '../services/posts/posts.service';


@Component({
  selector: 'app-socialshare',
  templateUrl: './socialshare.component.html',
  styleUrls: ['./socialshare.component.css']
})
export class SocialshareComponent implements OnInit {
  pageid;
  postData: any;
  imagePath: any;
  constructor(private meta: Meta, private title: Title, private postservice: PostsService, private CategoriesService: CategoriesService, private CookieService: CookieService, private Router: Router, private route: ActivatedRoute) {
    this.pageid = this.route.snapshot.params['page_id'];
    // this.mypostdetails(this.pageid);
    this.redirect(this.pageid);
  }

  mypostdetails(postid) {
    var req = {
      "id": postid,
    }
    this.postservice.mypostdetails(req).subscribe(resp => {
      this.postData = resp.data;
      console.log('fired1');
      this.updateMeta(this.postData.title, this.postData.description, this.postData.images);
      console.log('fired2');
    });
  }


  updateMeta(name, desc, images) {
    // console.log(metakeys);
    console.log('fired3');
    if (images.length != 0) {
      this.imagePath = images[0].path;
    } else {
      this.imagePath = "https://www.watnew.com/assets/images/login-logo-img.jpg";
    }
    this.title.setTitle(name);
    this.meta.addTag({ name: 'description', content: desc });
    this.meta.addTag({ name: 'image', content: this.imagePath });
    this.meta.addTag({ property: 'og:title', content: name });
    this.meta.addTag({ property: 'og:description', content: desc });
    this.meta.addTag({ property: 'og:image', content: this.imagePath });
    this.meta.addTag({ name: 'twitter:card', content: "summary" });
    this.meta.addTag({ name: 'twitter:title', content: name });
    this.meta.addTag({ name: 'twitter:description', content: desc });
    this.meta.addTag({ name: 'twitter:image', content: this.imagePath });
    console.log('fired4');
  }


  redirect = function (page_id) {
    this.Router.navigate(['postdetails', page_id]);
  }

  ngOnInit() {
    console.log('fired5');
    // this.meta.removeTag('name="name"');
    // this.meta.removeTag('name="description"');
    // this.meta.removeTag('name="image"');
    // this.meta.removeTag('property="og:title"');
    // this.meta.removeTag('property="og:description"');
    // this.meta.removeTag('property="og:image"');
    // this.meta.removeTag('name="twitter:title"');
    // this.meta.removeTag('name="twitter:description"');
    // this.meta.removeTag('name="twitter:image"');
    // this.title.setTitle('Watnew');
    // this.meta.addTags([
    //   { name: 'description', content: 'Title and Meta tags examples' },
    //   { httpEquiv: 'Content-Type', content: 'text/html' },
    //   { charset: 'UTF-8' }
    // ], true);
    this.mypostdetails(this.pageid);
  }

}
