import { Injectable } from '@angular/core';
import { Video } from "../class/video";
import {HttpClient} from "@angular/common/http";
import {RootService} from "./root.service";
import {AuthService} from "./auth.service";

@Injectable()
export class VideoService {

  public personalCollection: Array<Video> = null;
  private apiRoute: string = this.root.apiRoute;

  constructor(
      private root: RootService,
      private http: HttpClient,
      private authService: AuthService
  ) { }

  catchPersonal() {
    return this.http.post(this.apiRoute + 'video/personal', this.authService.auth.id);
  }
}