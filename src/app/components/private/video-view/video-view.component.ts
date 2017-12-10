import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Video} from "../../../shared/class/video";
import {VideoService} from "../../../shared/services/video.service";

@Component({
  selector: 'vc-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit, OnDestroy {

  public mediaId: number = null;
  private mediaIdSubscribe: Subscription = null;
  personalMedia: Array<Video> = null;
  personalMediaSubscribe: Subscription = null;
  currentMedia: Video = null;

  constructor(
      private route: ActivatedRoute,
      private videoService: VideoService
  ) { }

  ngOnInit() {
    this.mediaIdSubscribe = this.route.params.subscribe(
        (params) => { this.mediaId = +params['mediaId']; }
        );
      if (this.videoService.personalCollection === null) {
          this.personalMediaSubscribe = this.videoService.catchPersonal().subscribe(
              (data: Array<Video>) => {
                  this.videoService.personalCollection = data;
                  this.personalMedia = data;
              },
              (error) => { console.log(error); });
      }else {
          this.personalMedia = this.videoService.personalCollection;
      }
      for (let m of this.personalMedia) {
          if (+(this.mediaId) === +(m.id)) {
            this.currentMedia = m;
          }
      }
    }

  ngOnDestroy() {
    if (this.mediaIdSubscribe != null) {
      this.mediaIdSubscribe.unsubscribe();
    }
    if (this.personalMediaSubscribe != null) {
      this.personalMediaSubscribe.unsubscribe();
    }
  }

}
