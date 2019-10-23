import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicesService } from '../services.service';
import { CookieService } from 'ngx-cookie-service';
import { map, retry } from 'rxjs/operators';

export interface favouriteConfig {
  status_code: string;
  message: string;
  data: any;
}

export interface AddfavouriteConfig {
  postlikes: number;
  status_code: number;
  message: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class MyfavouritesService {

  constructor(private http: HttpClient, private CookieService: CookieService) { }

  // Add Favourite //
  Addfourite(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<AddfavouriteConfig>(ServicesService.API_Base_URL + '/saveorupdatepostfavourite', request, {
      headers: headers
    }).pipe();
  };

  // Favourite API //
  GetFavourite() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<favouriteConfig>(ServicesService.API_Base_URL + '/getuserfavouriteposts', {
      headers: headers
    }).pipe();
  };

  // Pagination Favourite //
  NextFavourites(url) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<favouriteConfig>(url, {
      headers: headers
    }).pipe();
  }


}
