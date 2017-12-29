import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {Auth} from "../../../shared/class/auth";

import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'vc-top-navi',
  templateUrl: './top-navi.component.html',
  styleUrls: ['./top-navi.component.css']
})
export class TopNaviComponent implements OnInit {

  constructor(
      private authService: AuthService,
      private cookiService: CookieService,
      private router: Router,
  )
  { }

  isAuth(){
      if(this.authService.auth != null){
        return true;
      }else{
        return false;
      }
  }

  logout(){
    this.authService.auth = null;
    this.cookiService.removeAll();
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    if(this.cookiService.getObject('auth') != null){
      this.authService.auth = this.cookiService.getObject('auth');
    }
  }

}
