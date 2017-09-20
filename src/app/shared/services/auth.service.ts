import { Injectable } from '@angular/core';
import { RootService } from "./root.service";
import { HttpClient } from "@angular/common/http";
import { Login } from "../class/login";
import { Register } from "../class/register";

@Injectable()
export class AuthService {

  public auth = null;
  private apiRoute: string = this.root.apiRoute;

  constructor(
      private root: RootService,
      private http: HttpClient
      ) { }

  login(loginData: Login) {
    return this.http.post(this.apiRoute + 'user/login', loginData);
  }

  registration(registrationData: Register) {
    return this.http.post(this.apiRoute + 'user', registrationData);
  }

  update(updateData) {
    return this.http.put(this.apiRoute + 'user/' + this.auth.id, updateData);
  }

}