import { Injectable } from '@angular/core';
import { Video } from "../class/video";
import { HttpClient } from "@angular/common/http";
import { RootService } from "./root.service";
import { AuthService } from "./auth.service";
import {Observable} from "rxjs/Observable";

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
    const user_id = this.authService.auth.id;
    return this.http.post(this.apiRoute + 'video/personal', user_id);
  }

  crateVideo(video: Video) {
    return this.http.post(this.apiRoute + 'video', video);
  }

  deleteVideo(video_id) {
    return this.http.delete(this.apiRoute + 'video/' + video_id);
  }
}