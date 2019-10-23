import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicesService } from '../services.service';
import { CookieService } from 'ngx-cookie-service';
import { map, retry } from 'rxjs/operators';
// import 'rxjs/Rx';
// import 'rxjs/add/operator/map';

export interface CategoriesResponseCongif {
  status: string;
  message: string;
  status_code: number;
  data: any;
  obj: any;
}

export interface GuestResponseCongif {
  status: number;
  message: string;
  status_code: string;
  data: any;
}

export interface updateusercatResponseCongif {
  status: string;
  message: string;
  status_code: string;
}

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  constructor(private http: HttpClient, private cookieservice: CookieService) {
  }

  // Guest API //
  Getguest() {
    return this.http.get<GuestResponseCongif>(ServicesService.API_Base_URL + '/guest').pipe();
  };

  // Categories API //
  Getcategory() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.cookieservice.get('token'))
    });
    return this.http.get<CategoriesResponseCongif>(ServicesService.API_Base_URL + '/getcategories', {
      headers: headers
    }).pipe();

  };

  // get all posts
  Getallpostdata(obj) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.cookieservice.get('token'))
    });
    return this.http.post<CategoriesResponseCongif>(ServicesService.API_Base_URL + '/getposts', obj, {
      headers: headers
    }).pipe();
  };


  // Update User categories
  updateusercategories(obj) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.cookieservice.get('token'))
    });
    return this.http.post<updateusercatResponseCongif>(ServicesService.API_Base_URL + '/saveorupdateusercategories', obj, {
      headers: headers
    }).pipe();
  };


  // getImage(imageUrl: string) {
  //   return this.http.get(imageUrl, { observe: 'response', responseType: 'blob' })
  //     .map((res) => {
  //       return new Blob([res.body], { type: res.headers.get('Content-Type') });
  //     })
  // }

  // get all trend posts
  Getalltrenddata() {
    return this.http.get("assets/trend.json").pipe();
  };


  getpostpagination(fd) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.cookieservice.get('token'))
    });
    return this.http.post<CategoriesResponseCongif>(ServicesService.API_Base_URL + '/getpostspagination', fd, {
      headers: headers
    }).pipe();
  }

  getnextpostpageination(url, request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.cookieservice.get('token'))
    });
    return this.http.post<CategoriesResponseCongif>(url, request, {
      headers: headers
    }).pipe();
  }

  homepageScroll(url) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.cookieservice.get('token'))
    });
    return this.http.get<CategoriesResponseCongif>(url, {
      headers: headers
    }).pipe();
  }
}
