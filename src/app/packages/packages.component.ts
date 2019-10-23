import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PackagesService } from '../services/packages.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  packagesList: any;
  message: any;
  @ViewChild('alert') alert: ElementRef;
  @ViewChild('subscribeForm') subscribeForm: ElementRef;
  @ViewChild('myDiv') myDiv: ElementRef;
  subscription = {
    package_id: '',
    name: '',
    email: '',
    company_name: '',
    mobile: '',
    company_url: ''
  }
  constructor(private cookieservice: CookieService, private packageservices: PackagesService) {
    this.getPackages();
  }

  // get Packages //
  getPackages() {
    this.packageservices.getpackages().subscribe(data => {
      if (data.status_code == 200) {
        this.packagesList = data.data;
      } else {
        this.message = data.message;
        this.alert.nativeElement.click();
      }
    });
  }

  subscribe(val) {
    this.subscription.package_id = val.id;
    this.subscription.name = '';
    this.subscription.email = '';
    this.subscription.mobile = '';
    this.subscription.company_name = '';
    this.subscription.company_url = '';
    this.subscribeForm.nativeElement.click();
  }

  AddSubscription(res) {
    var request = {
      "package_id": res.package_id,
      "name": res.name,
      "email": res.email,
      "mobile": res.mobile,
      "company_name": res.company_name,
      "company_url": res.company_url,
      "status": '0'
    }
    this.packageservices.AddSubscribe(request).subscribe(data => {
      if (data.status_code == 201) {
        $("#form_close .modal button").click();
        this.message = data.message;
        this.myDiv.nativeElement.click();
      } else {
        $("#form_close .modal button").click();
        this.message = data.message;
        this.alert.nativeElement.click();
      }
    });
  }

  ngOnInit() {
  }

}
