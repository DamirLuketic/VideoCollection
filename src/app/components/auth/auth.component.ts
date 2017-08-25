import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'vc-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public isLogin: boolean = true;

  constructor(
      private formBuilder: FormBuilder,
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

    }

    /**
     * Register part
     */
    public registerForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', Validators.required],
        password: ['', Validators.required, Validators.minLength(6)],
        repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    submitRegister(){

    }
}
