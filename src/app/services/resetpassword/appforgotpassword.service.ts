import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicesService } from '../services.service';
import { CookieService } from 'ngx-cookie-service';
import { map, retry } from 'rxjs/operators';

export interface forgotConfig{
  status: string;
  status_code: number;
  message: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class AppforgotpasswordService {

  constructor(private http: HttpClient, private CookieService: CookieService) { }

   // Forgot Password //
   appforgotpassword(request) {
    return this.http.post<forgotConfig>(ServicesService.API_Base_URL + '/appresetpassword', request).pipe();
  }

}
