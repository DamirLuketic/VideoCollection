/**
 * Modules & imports
 */
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from "./app.routes";
import { ReactiveFormsModule } from "@angular/forms";

/**
 * Components
 */
import { AppComponent } from './app.component';
import { TopNaviComponent } from './components/layout/top-navi/top-navi.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { VideosComponent } from './components/videos/videos.component';
import { UsersComponent } from './components/users/users.component';

/**
 * Directives
 */
import { DropdownDirective } from './shared/directives/dropdown.directive';

/**
 * Services
 */
import { RootService } from "./shared/services/root.service";
import { AuthService } from "./shared/services/auth.service";
  import { CookieService } from "angular2-cookie/core";

/**
 * Providers
 */

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DropdownDirective,
    TopNaviComponent,
    AuthComponent,
    VideosComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      routes,
      ReactiveFormsModule,
  ],
  providers: [RootService, AuthService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
