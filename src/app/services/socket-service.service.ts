import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CategoriesService } from './categories/categories.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';


@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  finalcatid = [];
  Authenticate: any;
  cat_Name: any;
  constructor(private httpClient: HttpClient, private cookieservice: CookieService, private categoryservice: CategoriesService) {
    // this.getGuest();
  }

  // initializeApp(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     console.log(`initializeApp:: inside promise`);

  //     setTimeout(() => {
  //       console.log(`initializeApp:: inside setTimeout`);
  //       // doing something

  //       resolve();
  //     }, 1000);
  //   });
  // }

  InitialService(): Promise<any> {
    this.Authenticate = this.cookieservice.get("isAuthenticated");
    this.cat_Name = this.cookieservice.get("subcategory");
    // console.log(this.cat_Name);
    if (this.Authenticate == "" && this.cat_Name == "") {
      // console.log(this.Authenticate);
      // console.log(`getSettings:: before http.get call`);
      const promise = this.httpClient.get('https://www.watnew.com/rest/api/v1/guest')
        .toPromise()
        .then(settings => {
          // console.log(`Settings from API: `, settings);
          // console.log(settings['status_code']);
          // console.log(settings['data']['nick_name']);
          if (settings['status_code'] == '200') {
            // localStorage.clear();
            this.cookieservice.deleteAll();
            // console.log(this.CookieService.getAll());
            // this.CookieService.set('id', JSON.stringify(data.data.id));
            this.finalcatid.push({ "subcategory_id": 2, "category_name": "Telugu", "category_id": 1 });
            this.cookieservice.set('nick_name', JSON.stringify(settings['data']['nick_name']));
            this.cookieservice.set('token', JSON.stringify(settings['data']['token']));
            this.cookieservice.set('subcategory', JSON.stringify(this.finalcatid));
            this.cookieservice.set('postID', JSON.stringify(''));
            this.cookieservice.set('afterLoginURL', JSON.stringify('0'));
          }
          return settings;
        });

      return promise;
    }
  }
  // load() {
  //   // Startup logic here
  //   this.categoryservice.Getguest().subscribe(data => {
  //     if (data.status_code == '200') {
  //       localStorage.clear();
  //       this.cookieservice.deleteAll();
  //       // console.log(this.CookieService.getAll());
  //       // this.CookieService.set('id', JSON.stringify(data.data.id));
  //       this.cookieservice.set('nick_name', JSON.stringify(data.data.nick_name));
  //       this.cookieservice.set('token', JSON.stringify(data.data.token));
  //       this.cookieservice.set('postID', JSON.stringify(''));
  //       this.cookieservice.set('afterLoginURL', JSON.stringify('0'));
  //     }
  //   });
  // }
}
