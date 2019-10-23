import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicesService } from './services.service';
import { CookieService } from 'ngx-cookie-service';
import { map, retry } from 'rxjs/operators';


export interface packagesConfig {
  status: string;
  status_code: number;
  message: string;
  data: any;
}

export interface SubscribeConfig {
  status: string;
  status_code: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  constructor(private http: HttpClient, private cookieservice: CookieService) { }

  // Get Packages API //
  getpackages() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.cookieservice.get('token'))
    });
    return this.http.get<packagesConfig>(ServicesService.API_Base_URL + '/getactivepackage', {
      headers: headers
    }).pipe();

  }

  // Add Subscribe //
  AddSubscribe(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.cookieservice.get('token'))
    });
    return this.http.post<SubscribeConfig>(ServicesService.API_Base_URL + '/saveorupdatemembershipsubscription', request, {
      headers: headers
    }).pipe();
  }
}
