import { Component, OnInit } from '@angular/core';
import { VideoService } from "../../../shared/services/video.service";

@Component({
  selector: 'vc-private-videos',
  templateUrl: './private-videos.component.html',
  styleUrls: ['./private-videos.component.css']
})
export class PrivateVideosComponent implements OnInit {

  constructor(
      private videoService: VideoService
  ) { }

  ngOnInit() {
  }

}
