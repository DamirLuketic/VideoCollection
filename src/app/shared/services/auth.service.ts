import { Injectable } from '@angular/core';
import { RootService } from "./root.service";
import { HttpClient } from "@angular/common/http";
import { Login } from "../class/login";
import { Register } from "../class/register";
import { Auth } from "../class/auth";

@Injectable()
export class AuthService {

  public auth = null;

  apiRoute: string = this.root.apiRoute;

  constructor(
      private root: RootService,
      private http: HttpClient
      ) { }

  login(loginData: Login){
    const body = loginData;
    return this.http.post(this.apiRoute + 'user/login', body);
  }

  registration(registrationData: Register){
    const body = registrationData;
    return this.http.post(this.apiRoute + 'user', body);
  }

}
