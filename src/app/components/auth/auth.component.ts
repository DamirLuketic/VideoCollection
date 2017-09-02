import {Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators} from "@angular/forms";
import { CookieService } from "angular2-cookie/core";
import {AuthService} from "../../shared/services/auth.service";
import {Subscription} from "rxjs/Subscription";
import {Login} from "../../shared/class/login";
import {Register} from "../../shared/class/register";
import {Router} from "@angular/router";

@Component({
  selector: 'vc-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  public isLogin: boolean = true;
  public loginError: boolean = false;
  public loginErrorMsg: string = '';

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
      if(this.loginError == true){
          this.loginError = false;
      }
    this.isLogin = false;
  }

    /**
     * Login part
     */
    public loginForm = this.formBuilder.group({
        nameEmail: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        remember: ['']
    });

    processLogin(data, remember: boolean, nameEmail: string){
        if(+(data) === 0){
            this.loginError = true;
            this.loginErrorMsg = 'False validation data';
            this.loginForm.reset();
        }else if (+(data) === 1){
            this.loginError = true;
            this.loginErrorMsg = 'False password';
            this.loginForm.reset({nameEmail: nameEmail});
        }else {
            console.log(data);
            this.authService.auth = data;
            if(remember === true){
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
                this.processLogin(data, remember, loginData.nameEmail);
            },
            error => {console.log(error)}
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
        if(this.loginError != false){
            this.loginError = false;
            this.loginErrorMsg = '';
        }
    }
}
