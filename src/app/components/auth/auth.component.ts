import {Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from "@angular/forms";
import { CookieService } from "angular2-cookie/core";

@Component({
  selector: 'vc-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public isLogin: boolean = true;

  constructor(
      private formBuilder: FormBuilder,
      private cookieService: CookieService
  ) { }

  ngOnInit() {
  }

  toLogin(){
    this.isLogin = true;
  }

  toRegister(){
    this.isLogin = false;
  }

    /**
     * Login part
     */
    public loginForm = this.formBuilder.group({
        emailName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        remember: ['']
    });

    submitLogin(){
        let formValue = this.loginForm.value;
        let remember = formValue['remember'];
        delete formValue['remember'];
        let loginData = formValue;
    }

    /**
     * Register part
     */
    public registerForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    submitRegister(){
        let formValue = this.registerForm.value;
        if(formValue['password'] == formValue['repeatPassword']){
            delete formValue['repeatPassword'];
            let regitrationData = formValue;
        }else{
            alert('Password and repeated password don\'t match');
        }
    }

    passwordLength(){
        const password = this.registerForm.value.password;
        if(password != null){
            if(password.length >= 6){
                return true;
            }
        }else {
            return false;
        }
    }
}
