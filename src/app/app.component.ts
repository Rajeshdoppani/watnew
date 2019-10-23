import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscriber } from 'rxjs';
import { CategoriesService } from '../app/services/categories/categories.service';
import { MessagingService } from "../../src/app/services/messaging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'watnew';
  message;
  constructor(private messagingService: MessagingService, private CategoriesService: CategoriesService, private CookieService: CookieService, private Router: Router) {
    // this.getguest();
    // console.log('fired');
  }

  // getguest = function () {
  //   console.log('guest');
  //   this.CategoriesService.Getguest().subscribe(data => {
  //     if (data.status_code == 200) {
  //       this.CookieService.deleteAll();
  //       this.CookieService.set('token', JSON.stringify(data.data.token));
  //       this.CookieService.set('id', JSON.stringify(data.data.id));
  //       this.CookieService.set('nick_name', JSON.stringify(data.data.nick_name));
  //     }
  //   });
  // }


  ngOnInit() {
    const userId = 'e3nCEZ5yXOTb3zDISjZjjab4PnC2';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
    console.log(this.message);
  }

}
