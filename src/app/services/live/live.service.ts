import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicesService } from '../services.service';
import { CookieService } from 'ngx-cookie-service';
import { map, retry } from 'rxjs/operators';

export interface getsatesConfig {
  status_code: number;
  message: string;
  status: string;
  data: any;
}

export interface getlivesConfig {
  status_code: number;
  message: string;
  status: string;
  data: any;
  adds_data: any;
  adds_configuration: number;
}

export interface getdetailliveConfig {
  status_code: number;
  message: string;
  status: string;
  data: any;
  related_live: any;
}

export interface getliveviewsConfig {
  status_code: number;
  message: string;
  status: string;
}

export interface addlivechat {
  status_code: number;
  message: string;
  status: string;
  recent_comments: any;
}

export interface getlivechat {
  status_code: number;
  message: string;
  status: string;
  live_comments: any;
  live_id: any;
}


@Injectable({
  providedIn: 'root'
})
export class LiveService {

  constructor(private http: HttpClient, private CookieService: CookieService) { }

  // States API //
  GetStates() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<getsatesConfig>(ServicesService.API_Base_URL + '/getstates', {
      headers: headers
    }).pipe();
  };


  // save user countries //
  saveusercountries(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<getliveviewsConfig>(ServicesService.API_Base_URL + '/saveorupdateuserstates', request, {
      headers: headers
    }).pipe();
  }


  // Get Lives //
  Getlives(request) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
      });
      return this.http.post<getlivesConfig>(ServicesService.API_Base_URL + '/getlives', request, {
        headers: headers
      }).pipe();
  }

  // Live Pagination //
  NextLiveList(request,res) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<getlivesConfig>(request, res, {
      headers: headers
    }).pipe();
  }

  NextLoginLiveList(request, res){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<getlivesConfig>(request, res, {
      headers: headers
    }).pipe();
  }

  // Live Chat Add //
  AddLiveChat(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<addlivechat>(ServicesService.API_Base_URL + '/saveorupdatelivecomment', request, {
      headers: headers
    }).pipe();
  }

  // get live chats //
  getLiveChat(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<getlivechat>(ServicesService.API_Base_URL + '/getcommentsbyliveid', request, {
      headers: headers
    }).pipe();
  }

  // live detail Page //
  Getdetaillives(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<getdetailliveConfig>(ServicesService.API_Base_URL + '/getlivebyid', request, {
      headers: headers
    }).pipe();
  };


  // Live Views //
  liveviews(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<getliveviewsConfig>(ServicesService.API_Base_URL + '/saveliveview', request, {
      headers: headers
    }).pipe();
  };
}
