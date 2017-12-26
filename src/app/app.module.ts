/**
 * Modules & imports
 */
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from "./app.routes";
import { ReactiveFormsModule } from "@angular/forms";
import { Select2Module } from 'ng2-select2';

/**
 * Components
 */
import { AppComponent } from './app.component';
import { TopNaviComponent } from './components/layout/top-navi/top-navi.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { VideosComponent } from './components/videos/videos.component';
import { UsersComponent } from './components/users/users.component';
import { PrivateVideosComponent } from './components/private/private-videos/private-videos.component';
import { PrivateProfileComponent } from './components/private/private-profile/private-profile.component';
import { VideoCreateComponent } from './components/private/video-create/video-create.component';
import { VideoViewComponent } from './components/private/video-view/video-view.component';
import { VideoEditComponent } from './components/private/video-edit/video-edit.component';

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
import { MessageService } from "./shared/services/message.service";
import { CountriesService } from "./shared/services/countries.service";
import { VideoService } from "./shared/services/video.service";
import { MediaTypeService } from "./shared/services/media-type.service";
import { ConditionService } from "./shared/services/condition.service";
import { GenreService } from "./shared/services/genre.service";

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
    PrivateVideosComponent,
    PrivateProfileComponent,
    VideoCreateComponent,
    VideoViewComponent,
    VideoEditComponent,
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      routes,
      ReactiveFormsModule,
      Select2Module
  ],
  providers: [
              RootService,
              AuthService,
              CookieService,
              MessageService,
              CountriesService,
              VideoService,
              MediaTypeService,
              ConditionService,
              GenreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
