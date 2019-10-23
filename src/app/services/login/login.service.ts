import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicesService } from '../services.service';
import { map, retry } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

export interface inventoryConfig {
  email: string;
  mobile: string;
  otp: string;
  user_categories: any[];
}

export interface resendOTPConfig {
  status: string;
  message: string;
  status_code: string;
  otp: string;
}

export interface AdsResponseCongif {
  status: string;
  message: string;
  status_code: string;
  data: any[];
}

export interface profileConfig {
  status: string;
  message: string;
  status_code: string;
  data: any[];
}

export interface deleteconfig {
  status: string;
  message: string;
  status_code: string;
}

export interface searchconfig {
  message: string;
  status_code: string;
  data: any[];
}

export interface recentactivityconfig {
  status: string;
  data: {
    [key: string]: recentConfig
  };
  status_code: string;
}

export interface recentConfig {
  Commented_posts: any[];
  liked_posts: any[];
}

export interface LoginResponseCongif {
  status: string;
  message: string;
  status_code: string;
  data: {
    [key: string]: inventoryConfig
  };
  page: any[];
  user_categories: any[];
}

export interface getnotifyConfig {
  status: string;
  status_code: number;
  data: any;
  notification_unread_count: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private CookieService: CookieService) { }
  // Login API //
  Login(loginInfo) {
    return this.http.post<LoginResponseCongif>(ServicesService.API_Base_URL + '/login', loginInfo).pipe();
  };


  // Location API //
  IPLocation() {
    return this.http.get('https://ipapi.co/json/').pipe();
  };


  // Games API //
  Games() {
    return this.http.get('assets/games.json').pipe();
  };

  // Email verification API //
  emailAuth(request) {
    return this.http.post<LoginResponseCongif>(ServicesService.API_Base_URL + '/emailverify', request).pipe();
  };

  // get notifications API //
  getnotify() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<getnotifyConfig>(ServicesService.API_Base_URL + '/getuserpushnotifications', {
      headers: headers
    }).pipe();
  };

  // Get Notification Read API //
  NotificationRead(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<getnotifyConfig>(ServicesService.API_Base_URL + '/updateuserpushnotificationbyid', request, {
      headers: headers
    }).pipe();
  };

  //Notification Read all //
  markallread() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<getnotifyConfig>(ServicesService.API_Base_URL + '/updateuserallpushnotifications', {
      headers: headers
    }).pipe();
  }


  // Search Suggestions //
  getsearchvalues(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<searchconfig>(ServicesService.API_Base_URL + '/elasticsearch', request, {
      headers: headers
    }).pipe();
  }


  // Social Login verification API //
  socialAuth(request) {
    return this.http.post<LoginResponseCongif>(ServicesService.API_Base_URL + '/emailverify', request).pipe();
  };

  //delete account //
  deleteAccnt(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<deleteconfig>(ServicesService.API_Base_URL + '/deleteuser', request, {
      headers: headers
    }).pipe();
  };

  // Recent Activities //
  getRecentActivities() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<recentactivityconfig>(ServicesService.API_Base_URL + '/getuserrecentactivity', {
      headers: headers
    }).pipe();
  }

  // pagination notifications //
  getmorenotifications(res) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<getnotifyConfig>(res, {
      headers: headers
    }).pipe();
  }

  // OTP RESEND //
  resendOTP(request) {
    return this.http.post<resendOTPConfig>(ServicesService.API_Base_URL + '/mobileverify', request).pipe();
  }
  // signup mobile and email velification
  emailmobileunique(obj) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<LoginResponseCongif>(ServicesService.API_Base_URL + '/emailmobileunique', obj, {
      headers: headers
    }).pipe();
  };

  // get Ads //
  GetAds() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<AdsResponseCongif>(ServicesService.API_Base_URL + '/getadds', {
      headers: headers
    }).pipe();
  }

  // User Register API //
  Userregister(regInfo) {
    return this.http.post<LoginResponseCongif>(ServicesService.API_Base_URL + '/registration', regInfo).pipe();
  };
  // User forget API //
  forgetAuth(forgetInfo) {
    return this.http.post<LoginResponseCongif>(ServicesService.API_Base_URL + '/forgotpassword', forgetInfo).pipe();
  };
  // User resret API //
  changeAuth(changeInfo) {
    return this.http.post<LoginResponseCongif>(ServicesService.API_Base_URL + '/resetpasswordviaotp', changeInfo).pipe();
  };

  //change password
  changepassword(changeinfo) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<LoginResponseCongif>(ServicesService.API_Base_URL + '/changepassword', changeinfo, {
      headers: headers
    }).pipe();
  };

  //Update Profile 
  Updateprofile(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<profileConfig>(ServicesService.API_Base_URL + '/updateprofile', request, {
      headers: headers
    }).pipe();
  };

  // get profile //
  getprofile() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<profileConfig>(ServicesService.API_Base_URL + '/getuserdata', {
      headers: headers
    }).pipe();
  }
}
