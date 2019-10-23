import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PageService } from '../services/page/page.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CheckableSettings, CheckedState } from '@progress/kendo-angular-treeview';
import * as $ from 'jquery';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SEOservicesService } from '../services/seoservices.service';

@Component({
  selector: 'app-createpage',
  templateUrl: './createpage.component.html',
  styleUrls: ['./createpage.component.css']
})
export class CreatepageComponent implements OnInit {
  categoryList: any[];
  pageInfo = {
    name: '',
    about: '',
    category_id: '',
    sub_category_id: '',

  };
  message;
  @ViewChild('addPage') addPage: ElementRef;
  catFinalTree: any[];
  checkedKeys: any[] = [];
  CatTree = [];
  pageIconName: string;
  pageheader: string;
  fileToUpload: File = null;
  pageHeaderUpload: File = null;
  constructor(private seoservice: SEOservicesService, private PageService: PageService, private CookieService: CookieService, private Router: Router, private spinnerService: Ng4LoadingSpinnerService) {
    this.seoservice.updateTitle();
    $('body').removeClass('side-menu-active');
    let isLoggedIn = this.CookieService.get('isAuthenticated');
    if (isLoggedIn !== 'true') {
      this.Router.navigate(['login']);
    }
    this.GetCategory();
  }

  GetCategory = function () {
    this.PageService.Getcategory().subscribe(data => {
      if (data.status_code == 200) {
        this.categoryList = data.data;
        console.log(this.categoryList);
        for (let i = 0; i < this.categoryList.length; i++) {
          var CatSubTree = [];
          for (let j = 0; j < this.categoryList[i].subcategories.length; j++) {
            var subname = this.categoryList[i].subcategories[j];
            var subnames = subname.category_name;
            CatSubTree.push({
              'category_name': subnames, 'category_id': subname.id
            });

          }
          var maincat = this.categoryList[i];
          var maincats = maincat.category_name;
          if (CatSubTree.length != 0) {
            this.CatTree.push({
              'category_name': maincats, 'category_id': maincat.id, items: CatSubTree
            });


            var CatSubTree = [];
          } else {
            this.CatTree.push({
              'category_name': maincats, 'category_id': maincat.id
            });
          }
        }
        console.log(this.CatTree);
      }
    });
  }

  // Checkbox check
  public key = 'category_name';
  public isChecked = (dataItem: any, index: string): CheckedState => {
    if (this.containsItem(dataItem)) { return 'checked'; }
    if (this.isIndeterminate(dataItem.items)) { return 'indeterminate'; }
    return 'none';
  }

  public containsItem(item: any): boolean {
    return this.checkedKeys.indexOf(item[this.key]) > -1;
  }

  private isIndeterminate(items: any[] = []): boolean {
    let idx = 0;
    let item;

    while (item = items[idx]) {
      if (this.isIndeterminate(item.items) || this.containsItem(item)) {
        return true;
      }

      idx += 1;
    }

    return false;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.pageIconName = this.fileToUpload.name;
  }

  pageHeaderFileInput(files: FileList) {
    this.pageHeaderUpload = files.item(0);
    this.pageheader = this.pageHeaderUpload.name;
  }

  AddPage(pageInfo) {
    this.spinnerService.show();
    this.catFinalTree = [];
    console.log(this.categoryList);
    for (let i = 0; i < this.categoryList.length; i++) {
      for (let j = 0; j < this.categoryList[i].subcategories.length; j++) {
        var subname = this.categoryList[i].subcategories[j];
        var subnames = subname.category_name;
        this.catFinalTree.push({
          'category_name': subnames, 'sub_category_id': subname.id, 'category_id': subname.category_id
        });
      }
      var maincat = this.categoryList[i];
      var maincats = maincat.category_name;
      this.catFinalTree.push({
        'category_name': maincats, 'category_id': maincat.id
      });
    }
    // console.log(this.catFinalTree);
    var catcheck = this.checkedKeys;
    var filteredArray = this.catFinalTree.filter(function (items) {
      return catcheck.indexOf(items.category_name) > -1;
    });
    // console.log(filteredArray);
    var maincatarry = [];
    var subcatarry = [];
    for (let h = 0; h < filteredArray.length; h++) {
      if (filteredArray[h].sub_category_id) {
        subcatarry.push(filteredArray[h].sub_category_id);
        maincatarry.push(filteredArray[h].category_id);
      } else {
        maincatarry.push(filteredArray[h].category_id);
      }
    }
    // console.log(maincatarry.toString());
    // console.log(subcatarry.toString());

    var request = {
      name: pageInfo.name,
      about: pageInfo.about,
      category_id: maincatarry.toString(),
      sub_category_id: subcatarry.toString()
    };
    // console.log(request);
    if (this.fileToUpload == null || this.pageHeaderUpload == null) {
      alert("Upload Page icons and Page header");
    } else {
      const fr = new FormData();
      fr.append('name', request.name);
      fr.append('about', request.about);
      fr.append('category_id', request.category_id);
      fr.append('subcategory_id', request.sub_category_id);
      fr.append('page_icon', this.fileToUpload);
      fr.append('page_header', this.pageHeaderUpload);
      fr.append("status", "1");
      // console.log(fr);
      // console.log(this.checkedKeys);
      // console.log(this.categoryList);
      this.PageService.createPage(fr).subscribe(
        data => {
          if (data.status_code == "201") {
            this.spinnerService.hide();
            this.CookieService.set('pageID', JSON.stringify(data.data.id));
            this.Router.navigate(['mypage']);
            this.message = data.message
            this.addPage.nativeElement.click();
          } else {
            this.message = data.message
            this.addPage.nativeElement.click();
          }

        });
    }
  }



  ngOnInit() {
  }
}
