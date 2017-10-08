import { Component, OnInit } from '@angular/core';
import { VideoService } from "../../../shared/services/video.service";
import { MediaTypeService } from "../../../shared/services/media-type.service";
import {Video} from "../../../shared/class/video";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'vc-video-create',
  templateUrl: './video-create.component.html',
  styleUrls: ['./video-create.component.css']
})
export class VideoCreateComponent implements OnInit {
  constructor(
      private authService: AuthService,
      private videoService: VideoService,
      private mediaTypeService: MediaTypeService
  ) {}

  ngOnInit() {
      let video = new Video();
      video.user_id  = this.authService.auth.id;
      video.title = 'New Movie';
        this.videoService.crateVideo(video).subscribe(
            (data) => console.log(data),
            (error) => console.log(error)
        );
  }

}
