import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscriber } from 'rxjs';
import { CategoriesService } from '../services/categories/categories.service';
import { count } from 'rxjs/operators';
import * as $ from 'jquery';
import { SEOservicesService } from '../services/seoservices.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @ViewChild('myDiv') myDiv: ElementRef;
  categoryList: any[];
  maincatview: boolean = false;
  subcatview: boolean = false;
  indexval: string;
  catnames: number;
  maincat = [];
  subcat = [];
  finalcatid = [];
  morecat = [];
  constructor(private seoservice: SEOservicesService, private CategoriesService: CategoriesService, private CookieService: CookieService, private Router: Router) {
    this.seoservice.updateTitle();
    this.getguest();
  }

  getguest = function () {
    this.CategoriesService.Getguest().subscribe(data => {
      if (data.status_code == '200') {
        localStorage.clear();
        this.CookieService.deleteAll();
        // console.log(this.CookieService.getAll());
        // this.CookieService.set('id', JSON.stringify(data.data.id));
        this.CookieService.set('nick_name', JSON.stringify(data.data.nick_name));
        this.CookieService.set('token', JSON.stringify(data.data.token));
        this.CookieService.set('postID', JSON.stringify(''));
        this.CookieService.set('afterLoginURL', JSON.stringify('0'));
        this.GetCategory();
      }
    });
  }

  GetCategory = function () {
    this.CategoriesService.Getcategory().subscribe(data => {
      if (data.status_code == 200) {
        this.categoryList = data.data;
        // var cokkie = JSON.parse(this.CookieService.get('token'));
        // console.log(cokkie);
        // console.log(this.categoryList);
      }
    });
  }

  categorySelect(subcat, id, name) {
    var indexed = this.maincat.findIndex(x => x.category_name == name);
    if (indexed != -1) {
      this.maincat.splice(indexed, 1);
      $('#maincheck_' + id).removeClass('catmainselect');
    } else {
      if (subcat.subcategories.length == 0) {
        $('#' + id).addClass('catshow');
        $('#maincheck_' + id).addClass('catmainselect');
      } else {
        $('#check_' + id).addClass('cathide');
        $('.sub' + id).addClass('catshow');
      }
      this.subcatview = !this.subcatview;
      var index = this.maincat.findIndex(x => x.category_name == name);
      if (index === -1) {
        // this.maincat.push({ "maincategory_id": id, "category_name": name });
      }
    }
  }

  subcatClick(catid, catname, maincatids) {
    var indexed = this.subcat.findIndex(x => x.category_name == catname);
    if (indexed != -1) {
      this.subcat.splice(indexed, 1);
      $('.modal-body #subcheck_' + catid).removeClass('catsubselect');
      $('#subcheck_' + catid).removeClass('catsubselect');
    } else {
      var indexs = this.subcat.findIndex(x => x.category_name == catname);
      if (indexs === -1) {
        $('.modal-body #subcheck_' + catid).addClass('catsubselect');
        $('#subcheck_' + catid).addClass('catsubselect');
        this.subcat.push({ "subcategory_id": catid, "category_name": catname, "maincat_id": maincatids });
      }
    }
  }

  moreClick(subcats) {
    this.myDiv.nativeElement.click();
    this.morecat = [];
    for (let k = 3; k < subcats.length; k++) {
      var indexed = this.morecat.findIndex(x => x.category_name == subcats[k].category_name);
      if (indexed != -1) {
        this.maincat.splice(indexed, 1);
      } else {
        this.morecat.push(subcats[k]);
      }
    }
  }

  // removeCat(mainid, subid, selectedcat) {
  //   if (mainid) {
  //     var index = this.allcat.findIndex(x => x.category_name == selectedcat);
  //     this.allcat.splice(index, 1);
  //     $('#maincheck_' + mainid).removeClass('catmainselect');
  //   }

  //   if (subid) {
  //     var index = this.allcat.findIndex(x => x.category_name == selectedcat);
  //     this.allcat.splice(index, 1);
  //     $('#subcheck_' + subid).removeClass('catsubselect');
  //   }

  // }

  finalCat(subcat) {
    // console.log(subcat);
    for (var l = 0; l < subcat.length; l++) {
      this.finalcatid.push({ "subcategory_id": subcat[l].subcategory_id, "category_name": subcat[l].category_name, "category_id": subcat[l].maincat_id });
    }
    this.CookieService.set('subcategory', JSON.stringify(this.finalcatid));
    // sessionStorage.setItem('subcat',JSON.stringify(this.finalcatid));
    this.Router.navigate(['home']);
  }
  ngOnInit() {
  }
}
