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
  selector: 'app-changecategories',
  templateUrl: './changecategories.component.html',
  styleUrls: ['./changecategories.component.css']
})
export class ChangecategoriesComponent implements OnInit {
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
  id;
  subcatmore: any;
  authenticated: any;
  constructor(private seoservice: SEOservicesService,private CategoriesService: CategoriesService, private CookieService: CookieService, private Router: Router) {
    $('body').removeClass('side-menu-active');
    this.seoservice.updateTitle();
    this.subcatmore = JSON.parse(this.CookieService.get('subcategory'));
    this.authenticated = this.CookieService.get('isAuthenticated');
    this.GetCategory();
  }

  GetCategory = function () {
    this.CategoriesService.Getcategory().subscribe(data => {
      if (data.status_code == 200) {
        this.categoryList = data.data;
        var subcatcookie = JSON.parse(this.CookieService.get('subcategory'));
        // var subcatcookie = [{"category_id":4},{"category_id":2}];
        // for (let h = 0; h < subcatcookie.length; h++) {
        //   for (let f = 0; f < this.categoryList.length; f++) {
        //     if (this.categoryList[f].id == subcatcookie[h].category_id) {
        //       if (this.categoryList[f].subcategories.length == 0) {
        //         this.maincat.push({ "category_id": subcatcookie[h].category_id });
        //       } else {
        //         this.maincat.push({ "category_id": subcatcookie[h].category_id });
        //       }
        //     }
        //     for (let r = 0; r < this.categoryList[f].subcategories.length; r++) {
        //       var subID = subcatcookie[h].subcategory_id;
        //       if (this.categoryList[f].subcategories[r].id == subID) {
        //         this.subcat.push({ "subcategory_id": subcatcookie[h].subcategory_id, "category_id": subcatcookie[h].category_id });
        //       }
        //     }
        //   }
        // }
        // console.log(this.maincat);
        // console.log(this.subcat);
        // console.log(cokkie);
        // console.log(this.categoryList);
        for (let k = 0; k < subcatcookie.length; k++) {
          $(function () {
            $('.onboarding-manager #check_' + subcatcookie[k].category_id).addClass('cathide');
            $('.onboarding-manager .sub' + subcatcookie[k].category_id).addClass('catshow');
            $('.onboarding-manager #subcheck_' + subcatcookie[k].subcategory_id).addClass('catsubselect');
          });
          this.subcat.push({ "subcategory_id": subcatcookie[k].subcategory_id, "category_name": subcatcookie[k].category_name, "category_id": subcatcookie[k].category_id });
        }
      }
    });
  }

  moreClick(subcats) {
    this.myDiv.nativeElement.click();
    for (let d = 0; d < this.subcatmore.length; d++) {
      var ID = this.subcatmore[d].subcategory_id;
      $(function () {
        $('.modal-body #subcheck_' + ID).addClass('catsubselect');
      });
    }
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
        this.subcat.push({ "subcategory_id": catid, "category_name": catname, "category_id": maincatids });
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
    for (var l = 0; l < subcat.length; l++) {
      this.finalcatid.push({ "subcategory_id": subcat[l].subcategory_id, "category_name": subcat[l].category_name, "category_id": subcat[l].category_id });
    }
    this.CookieService.set('subcategory', JSON.stringify(this.finalcatid));
    if (this.authenticated == 'true') {
      const fd = new FormData();
      var subcatids = JSON.parse(this.CookieService.get('subcategory'));
      for (let q = 0; q < subcatids.length; q++) {
        if (subcatids[q].subcategory_id != undefined && subcatids[q].category_id != undefined) {
          fd.append("categories[" + [q] + "][category_id]", subcatids[q].category_id);
          fd.append("categories[" + [q] + "][subcategory_id]", subcatids[q].subcategory_id);
        }
      }
      this.CategoriesService.updateusercategories(fd).subscribe(data => {
      });
    }
    this.Router.navigate(['home']);
  }
  ngOnInit() {
  }
}
