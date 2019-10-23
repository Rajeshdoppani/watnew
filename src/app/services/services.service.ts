import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  // public static API_Base_URL = "http://13.232.239.29/api/v1";
  // public static API_Base_URL = "http://dev.watnew.com/api/v1";
  public static API_Base_URL = "https://www.watnew.com/rest/api/v1";
  public static API_Share_URL = "https://www.watnew.com";


  constructor(private http: HttpClient, private CookieService: CookieService) {
  }
}
