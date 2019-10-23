import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicesService } from '../services.service';
import { CookieService } from 'ngx-cookie-service';
import { map, retry } from 'rxjs/operators';
import { CategoriesService } from '../categories/categories.service';

export interface CategoriesResponseCongif {
  status: string;
  message: string;
  status_code: string;
  data: any[];
  obj: any
  postlikes;
  related_posts: any;
}

export interface postcreateConfig {
  status: string;
  message: string;
  status_code: number;
  data: any;
}

export interface metaconfig {
  status: string;
  message: string;
  status_code: string;
  data: any;
}

export interface AdsResponseCongif {
  status: string;
  message: string;
  status_code: string;
  data: any[];
}

export interface DeletepollResponseCongif {
  status: string;
  message: string;
  status_code: string;
}

export interface abuseconfig {
  status: string;
  message: string;
  status_code: string;
  data: any[];
}

export interface PollResponseCongif {
  status: string;
  message: string;
  status_code: number;
  data: any;
}

export interface SubmitPollResponseCongif {
  status: string;
  status_code: number;
  data: any;
}

export interface addabuseconfig {
  status: string;
  message: string;
  status_code: string;
}

export interface CommentResponseCongif {
  status: string;
  message: string;
  status_code: string;
  post_comments: any;
  recent_comments: any;
}

export interface postviewconfig {
  status: string;
  message: string;
  status_code: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  guesttoken: any;
  constructor(private http: HttpClient, private CookieService: CookieService, private CategoriesService: CategoriesService) { }

  // Categories API //
  Getcategory() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<CategoriesResponseCongif>(ServicesService.API_Base_URL + '/getcategories', {
      headers: headers
    }).pipe();
  };

  // create post //
  createPost(fr) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<postcreateConfig>(ServicesService.API_Base_URL + '/saveorupdatepost', fr, {
      headers: headers
    }).pipe();
  };

  // create poll //
  createPoll(gh) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<PollResponseCongif>(ServicesService.API_Base_URL + '/saveorupdatepoll', gh, {
      headers: headers
    }).pipe();
  };

  // submit poll //
  submitPoll(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<SubmitPollResponseCongif>(ServicesService.API_Base_URL + '/saveorupdatepostvote', request, {
      headers: headers
    }).pipe();
  }

  deletepost(reqid) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<CategoriesResponseCongif>(ServicesService.API_Base_URL + '/deletepost', reqid, {
      headers: headers
    }).pipe();
  }

  deletepoll(reqsid) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<DeletepollResponseCongif>(ServicesService.API_Base_URL + '/deletepoll', reqsid, {
      headers: headers
    }).pipe();
  }

  //favarite post
  postlike(reqbody) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<CategoriesResponseCongif>(ServicesService.API_Base_URL + '/saveorupdatepostlike', reqbody, {
      headers: headers
    }).pipe();
  }

  //post details
  mypostdetails(req) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<CategoriesResponseCongif>(ServicesService.API_Base_URL + '/getpostbyid', req, {
      headers: headers
    }).pipe();
  }
  // Categories API //
  allcategory() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<CategoriesResponseCongif>(ServicesService.API_Base_URL + '/getcategories', {
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

  // get banners //
  GetBanners(res) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<AdsResponseCongif>(ServicesService.API_Base_URL + '/getbanners', res, {
      headers: headers
    }).pipe();
  }

  // get abusereasons //
  getreasons() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.get<abuseconfig>(ServicesService.API_Base_URL + '/getabusereasons', {
      headers: headers
    }).pipe();
  }

  // Add Abuse //
  addabuse(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<addabuseconfig>(ServicesService.API_Base_URL + '/saveorupdateabusereport', request, {
      headers: headers
    }).pipe();
  }

  // Disable Post //
  disablePOST(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    // return this.http.post<addabuseconfig>(ServicesService.API_Base_URL + '/amnotinterestedpage', request, {
    //   headers: headers
    // }).pipe(map(data=> { return data; }));
    return this.http.post<addabuseconfig>(ServicesService.API_Base_URL + '/notinterestedpage', request, {
      headers: headers
    }).pipe();
  }

  // send enquiry //
  sendenquiry(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<addabuseconfig>(ServicesService.API_Base_URL + '/sendenquiry', request, {
      headers: headers
    }).pipe();
  }

  // delete Comment // 
  deletecomment(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<addabuseconfig>(ServicesService.API_Base_URL + '/deletecomments', request, {
      headers: headers
    }).pipe();
  }

  // get Comments //
  getComments(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<CommentResponseCongif>(ServicesService.API_Base_URL + '/getcommentsbypostid', request, {
      headers: headers
    }).pipe();
  }

  // Next Comments //
  NextComments(url, request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<CommentResponseCongif>(url, request, { headers: headers }).pipe();
  }

  AddComment(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<CommentResponseCongif>(ServicesService.API_Base_URL + '/saveorupdatecomment', request, {
      headers: headers
    }).pipe();
  }

  replyComment(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<CommentResponseCongif>(ServicesService.API_Base_URL + '/saveorupdatecomment', request, {
      headers: headers
    }).pipe();
  }

  editComment(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<CommentResponseCongif>(ServicesService.API_Base_URL + '/saveorupdatecomment', request, {
      headers: headers
    }).pipe();
  }

  postsviews(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<postviewconfig>(ServicesService.API_Base_URL + '/savepostview', request, {
      headers: headers
    }).pipe();
  }

  fetchmeta(request) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(this.CookieService.get('token'))
    });
    return this.http.post<metaconfig>(ServicesService.API_Base_URL + '/getmetatagsfromurl', request, {
      headers: headers
    }).pipe();
  }

}
