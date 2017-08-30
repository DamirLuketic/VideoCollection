import {Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators} from "@angular/forms";
import { CookieService } from "angular2-cookie/core";
import {AuthService} from "../../shared/services/auth.service";
import {Subscription} from "rxjs/Subscription";
import {Login} from "../../shared/class/login";
import {Register} from "../../shared/class/register";
import {Auth} from "../../shared/class/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'vc-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  public isLogin: boolean = true;

  private loginSubscription: Subscription = null;
  private registrationSubsription: Subscription = null;

  constructor(
      private formBuilder: FormBuilder,
      private cookieService: CookieService,
      private authService: AuthService,
      private router: Router
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

    processLogin(data, remember){
        if(+(data) === 0){
            console.log('False validation data');
        }else if (+(data) === 1){
            console.log('False password');
        }else {
            console.log(data);
            this.authService.auth = data;
            if(remember == true){
                this.cookieService.putObject('auth', data);
            }
            this.router.navigate(['/home']);
        }
    }

    submitLogin(){
        let formValue = this.loginForm.value;
        const remember = formValue['remember'];
        delete formValue['remember'];
        let loginData: Login = formValue;

        this.loginSubscription = this.authService.login(loginData).subscribe(
            data => {
                this.processLogin(data, remember);
            },
            error => {error}
            );
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

    processRegister(data){
        if(+(data) === 0){
            console.log('Email or username in use');
        }else {
            console.log('User set');
            this.router.navigate(['/home']);
        }
    }

    submitRegister(){
        let formValue = this.registerForm.value;
        if(formValue['password'] == formValue['repeatPassword']){
            delete formValue['repeatPassword'];
            const regitrationData: Register = formValue;

            this.registrationSubsription = this.authService.registration(regitrationData).subscribe(
                data => {this.processRegister(data)},
                error => {console.log(error)}
            );
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

    onCancel(){
        this.registerForm.reset();
    }

    ngOnDestroy(){
        if(this.loginSubscription != null){
            this.loginSubscription.unsubscribe();
        }
        if(this.registrationSubsription != null){
            this.registrationSubsription.unsubscribe();
        }
    }
}
