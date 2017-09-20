import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoService } from "../../../shared/services/video.service";
import { Video } from "../../../shared/class/video";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'vc-private-videos',
  templateUrl: './private-videos.component.html',
  styleUrls: ['./private-videos.component.css']
})
export class PrivateVideosComponent implements OnInit, OnDestroy {

  public personalCollection: Array<Video> = null;
  private personalCollectionSubscribe: Subscription = null;

  constructor(
      private videoService: VideoService
  ) { }

  ngOnInit() {
    if (this.videoService.personalCollection === null){
        this.personalCollectionSubscribe = this.videoService.catchPersonal().subscribe(
            (data: Video[]) => {
              this.videoService.personalCollection = data;
              this.personalCollection = data;
              console.log(this.personalCollection);
            },
            (error) => { console.log(error); });
    }
  }

  ngOnDestroy() {
    if (this.personalCollectionSubscribe != null) {
      this.personalCollectionSubscribe.unsubscribe();
    }
  }
}
