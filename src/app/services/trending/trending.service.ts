import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicesService } from '../services.service';
import { CookieService } from 'ngx-cookie-service';
import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export interface trendingResponseCongif {
  status: string;
  message: string;
  status_code: string;
  data: any[];
  obj: any
  posts: any;
  trending_categories: any[];
}

export interface TrendResponseCongif {
  status: string;
  message: string;
  status_code: string;
  data: any[];
}

export interface ActivityResponseCongif {
  status: string;
  message: string;
  status_code: string;
  data: any[];
}

export interface searchResponseCongif {
  message: string;
  status_code: string;
  data: any[];
  posts: any;
  page: any;
}
@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  constructor(private http: HttpClient, private CookieService: CookieService) { }

  // trending API //
  trending() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<trendingResponseCongif>(ServicesService.API_Base_URL + '/trendingposts', {
      headers: headers
    }).pipe();
  };

  // search API
  searchString(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<searchResponseCongif>(ServicesService.API_Base_URL + '/searchwithtags', request, {
      headers: headers
    }).pipe();
  };


  trendingpagination(url) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<trendingResponseCongif>(url, {
      headers: headers
    }).pipe();
  }

  // Trending image //
  GetTrending() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<TrendResponseCongif>(ServicesService.API_Base_URL + '/getheroimage', {
      headers: headers
    }).pipe();
  }

  likesmore(url, request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<searchResponseCongif>(url, request, {
      headers: headers
    }).pipe();
  }

  resentactivity() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<ActivityResponseCongif>(ServicesService.API_Base_URL + '/getuserrecentactivity  ', {
      headers: headers
    }).pipe();
  }
}
