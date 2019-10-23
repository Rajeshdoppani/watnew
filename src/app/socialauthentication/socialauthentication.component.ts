import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-socialauthentication',
  templateUrl: './socialauthentication.component.html',
  styleUrls: ['./socialauthentication.component.css']
})
export class SocialauthenticationComponent implements OnInit {
  token;
  remember_token;
  succes_code;
  message;
  status_code;
  usercat;
  usercategories: any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private spinnerService: Ng4LoadingSpinnerService, private LoginService: LoginService, private cookieservice: CookieService) {
    this.activatedRoute.params.subscribe(params => {
      this.status_code = params.status_code;
      this.token = params.token;
      this.remember_token = params.remember_token;
    });
    this.getLocation();
    this.usercategories = this.cookieservice.get('subcategory');
    //  console.log(this.token);
    this.socialAuth(this.token, this.remember_token);
  }


  getLocation() {
    this.LoginService.IPLocation().subscribe(data => {
      // console.log(data['ip']);
      localStorage.setItem('IPAddress', data['ip']);
      localStorage.setItem('Location_name', data['city']);
    });
  }

  socialAuth(tokenID, rememberTokenID) {
    var request = {
      token: tokenID,
      remember_token: rememberTokenID
    }
    var subcatids = JSON.parse(this.usercategories);
    const fd = new FormData();
    fd.append("token", request.token);
    fd.append("remember_token", request.remember_token);
    fd.append("ip_address", localStorage.getItem('IPAddress'));
    fd.append("location_name", localStorage.getItem('Location_name'));
    for (let q = 0; q < subcatids.length; q++) {
      if (subcatids[q].subcategory_id != undefined && subcatids[q].category_id != undefined) {
        fd.append("categories[" + [q] + "][category_id]", subcatids[q].category_id);
        fd.append("categories[" + [q] + "][subcategory_id]", subcatids[q].subcategory_id);
      }
    }
    // console.log(request);

    this.LoginService.socialAuth(fd).subscribe(data => {
      if (data.status_code == '200') {
        this.cookieservice.deleteAll();
        if (data.page.length != 0) {
          this.cookieservice.set('pageID', JSON.stringify(data.page[0].id), 365, '/');
        }
        this.usercat = data.user_categories;
        if (this.usercat.length != 0) {
          var subcatarray = [];
          for (let j = 0; j < this.usercat.length; j++) {
            subcatarray.push({ "subcategory_id": this.usercat[j].subcategories[0].id, "category_name": this.usercat[j].subcategories[0].category_name, "category_id": this.usercat[j].subcategories[0].category_id });
          }
          this.cookieservice.set('subcategory', JSON.stringify(subcatarray), 365, '/');
        }
        this.cookieservice.set('isAuthenticated', 'true', 365, '/');
        this.cookieservice.set('token', JSON.stringify(data.data.token), 365, '/');
        this.cookieservice.set('id', JSON.stringify(data.data.id), 365, '/');
        this.cookieservice.set('nick_name', JSON.stringify(data.data.nick_name), 365, '/');
        this.cookieservice.set('profile_pic', JSON.stringify(data.data.profile_pic), 365, '/');
        this.cookieservice.set('Email', JSON.stringify(data.data.email), 365, '/');
        this.cookieservice.set('mobile', JSON.stringify(data.data.mobile), 365, '/');
          this.router.navigate(['home']);
      } else {
        alert(data.message);
        this.router.navigate(['login']);
      }
    });
  }

  ngOnInit() {
  }

}
