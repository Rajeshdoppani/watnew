import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppforgotpasswordService } from '../services/resetpassword/appforgotpassword.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appforgotpassword',
  templateUrl: './appforgotpassword.component.html',
  styleUrls: ['./appforgotpassword.component.css']
})
export class AppforgotpasswordComponent implements OnInit {
  private parametersObservable: any;
  passcode: any;
  message: any;
  changeinfo = {
    password: '',
    password_confirmation: ''
  }
  @ViewChild('myDiv') myDiv: ElementRef;
  constructor(private route: ActivatedRoute, private forgotservice: AppforgotpasswordService, private Router: Router) {
    this.parametersObservable = this.route.params.subscribe(params => {
      this.passcode = this.route.snapshot.params['passcode'];
    });
  }

  changepassword(changeinfo) {
    var request = {
      "unique_id": this.passcode,
      "password": changeinfo.password,
      "password_confirmation": changeinfo.password_confirmation,
    }
    this.forgotservice.appforgotpassword(request).subscribe(data => {
      if (data.status_code == 200) {
        this.message = data.message;
        this.myDiv.nativeElement.click();
        // console.log(data);
        this.changeinfo.password = '';
        this.changeinfo.password_confirmation = '';
        // this.Router.navigate(['login']);
      } else {
        alert(data.message);
        alert(data.data.password[0]);
      }
    });
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.parametersObservable != null) {
      this.parametersObservable.unsubscribe();
    }
  }

}
