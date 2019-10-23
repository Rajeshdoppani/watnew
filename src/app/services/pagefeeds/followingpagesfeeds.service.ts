import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicesService } from '../services.service';
import { CookieService } from 'ngx-cookie-service';
import { map, retry } from 'rxjs/operators';

export interface pagefeedConfig {
  status: string;
  status_code: string;
  message: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class FollowingpagesfeedsService {

  constructor(private cookieservice: CookieService, private http: HttpClient) { }

  // Get Followed Pages Feed API //
  Getpagefeeds() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.cookieservice.get('token'))
    });
    return this.http.get<pagefeedConfig>(ServicesService.API_Base_URL + '/getuserfollowpageposts', {
      headers: headers
    }).pipe();
  };


  // Pagination Page Feeds //
  Nextpagefeeds(url) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.cookieservice.get('token'))
    });
    return this.http.get<pagefeedConfig>(url, {
      headers: headers
    }).pipe();
  }

}
