import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicesService } from '../services.service';
import { CookieService } from 'ngx-cookie-service';
import { map, retry } from 'rxjs/operators';

export interface celebrityConfig {
  status: string;
  status_code: number;
  message: string;
  data: any;
}

export interface folloConfig {
  status: string;
  status_code: number;
  message: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class CelebritypageService {

  constructor(private cookieservice: CookieService, private http: HttpClient) { }

  // Get Celebrity Feed API //
  Getcelebrityfeeds(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.cookieservice.get('token'))
    });
    return this.http.post<celebrityConfig>(ServicesService.API_Base_URL + '/getcelebritylist', request, {
      headers: headers
    }).pipe();
  };



  // Celebs Search //
  getsearchcelebs(request){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.cookieservice.get('token'))
    });
    return this.http.post<celebrityConfig>(ServicesService.API_Base_URL + '/getcelebritysearch', request, {
      headers: headers
    }).pipe();
  }


  // Get Celebrity Feed API //
  Getcelebritycategories() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.cookieservice.get('token'))
    });
    return this.http.get<celebrityConfig>(ServicesService.API_Base_URL + '/getcelebritysubcategories', {
      headers: headers
    }).pipe();
  };

  // follow click //
  following(reqbody) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.cookieservice.get('token'))
    });
    return this.http.post<folloConfig>(ServicesService.API_Base_URL + '/saveorupdatepagefollow', reqbody, {
      headers: headers
    }).pipe();
  }

  // Pagination Celebrity Feeds //
  Nextpagefeeds(url, request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.cookieservice.get('token'))
    });
    return this.http.post<celebrityConfig>(url, request, {
      headers: headers
    }).pipe();
  }

}
