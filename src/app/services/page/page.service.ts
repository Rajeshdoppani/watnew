import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicesService } from '../services.service';
import { CookieService } from 'ngx-cookie-service';
import { map, retry } from 'rxjs/operators';

export interface pageconfig {
  id: string;
}

export interface CategoriesResponseCongif {
  status: string;
  message: string;
  status_code: string;
  data: {
    [key: string]: pageconfig
  }
  obj: any
}

export interface pagesuggestionsResponseCongif{
  status: string;
  status_code: number;
  data: any;
  message: any;
}

export interface mypageResponseCongif {
  status: string;
  status_code: string;
  page: any;
  data: any;
  next_page_url: any;
  message: any;
}

@Injectable({
  providedIn: 'root'
})

export class PageService {

  constructor(private http: HttpClient, private CookieService: CookieService) { }

  // Categories API //
  Getcategory() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<CategoriesResponseCongif>(ServicesService.API_Base_URL + '/getcategories', {
      headers: headers
    }).pipe();
  };

  // Page Create API
  createPage(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<CategoriesResponseCongif>(ServicesService.API_Base_URL + '/saveorupdatepage', request, {
      headers: headers
    }).pipe();
  }

  mypage() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<mypageResponseCongif>(ServicesService.API_Base_URL + '/getmypage', {
      headers: headers
    }).pipe();
  }

  Nextmypagefeeds(url) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<mypageResponseCongif>(url, {
      headers: headers
    }).pipe();
  }

  Nextpagefeeds(url) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<mypageResponseCongif>(url, {
      headers: headers
    }).pipe();
  }

  mypagedatails(req) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<mypageResponseCongif>(ServicesService.API_Base_URL + '/getpagebyid?id='+req.id, {
      headers: headers
    }).pipe();
  }

  pagecategorys() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<mypageResponseCongif>(ServicesService.API_Base_URL + '/getpages', {
      headers: headers
    }).pipe();
  }

  pagecategoryspagination(res,url) {
    // console.log(url);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<mypageResponseCongif>(url, res, {
      headers: headers
    }).pipe();
  }

  getpagesubforcat(fd) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<mypageResponseCongif>(ServicesService.API_Base_URL + '/getpagebycategoryid', fd, {
      headers: headers
    }).pipe();
  }

  following(reqbody) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<mypageResponseCongif>(ServicesService.API_Base_URL + '/saveorupdatepagefollow', reqbody, {
      headers: headers
    }).pipe();
  }

  pageuserfollow() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<mypageResponseCongif>(ServicesService.API_Base_URL + '/getuserfollowingpages', {
      headers: headers
    }).pipe();
  }

  updatepost(fd) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<mypageResponseCongif>(ServicesService.API_Base_URL + '/saveorupdatepost', fd, {
      headers: headers
    }).pipe();
  }
  onKeyUp(req) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<mypageResponseCongif>(ServicesService.API_Base_URL + '/getpagenamesearch', req, {
      headers: headers
    }).pipe();
  }

  // page suggestions //
  GetSuggestions(res){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<pagesuggestionsResponseCongif>(ServicesService.API_Base_URL + '/getpagesuggestions', res, {
      headers: headers
    }).pipe();
  }
}
