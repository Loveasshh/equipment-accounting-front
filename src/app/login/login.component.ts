import {Component, OnInit} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {AuthLoginInfo} from '../auth/login-info';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  isEmployee = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private userService: UserService) {
  }


  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  onSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);
      
      
    this.authService.attemptAuth(this.loginInfo).subscribe(
      
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.roles);
        console.log(data.isEmployee);
        if (data.isEmployee) {
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          
          
          this.roles = this.tokenStorage.getAuthorities();
          this.reloadPage();
        } else {
          this.isLoginFailed = true;
          this.errorMessage = "ewefew";
        }
        
        
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  /*check() {
    //TODO сделать отображение даты блокировки на страничку
    this.userService.getUserByName(this.form.username).subscribe(el => {
      this.blockService.checkBlock(el.id).subscribe(el => {
        this.isBlocked = el.checkBlock;
        this.dateBlocked = el.blockDate;
        //отображает правильно
        console.log(this.dateBlocked)
        console.log(this.isBlocked)
      })
    })
    //отображает undefined
    console.log(this.dateBlocked)
    console.log(this.isBlocked)
  }*/

  reloadPage() {
    window.location.reload();
  }

}
