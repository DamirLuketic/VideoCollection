import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoService } from "../../../shared/services/video.service";
import { MediaTypeService } from "../../../shared/services/media-type.service";
import {Video} from "../../../shared/class/video";
import {AuthService} from "../../../shared/services/auth.service";
import {MediaType} from "../../../shared/class/media-type";
import {Subscription} from "rxjs/Subscription";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'vc-video-create',
  templateUrl: './video-create.component.html',
  styleUrls: ['./video-create.component.css']
})
export class VideoCreateComponent implements OnInit, OnDestroy {

  public mediaTypes: Array<MediaType> = null;
  private mediaTypesSubscribe: Subscription = null;

  constructor(
      private authService: AuthService,
      private videoService: VideoService,
      private mediaTypeService: MediaTypeService,
      private formBuilder: FormBuilder
  ) {}

  public createVideo = this.formBuilder.group({
      user_id: [this.authService.auth.id, Validators.required],
      media_type_id: [''],
      condition_id: [''],
      title: ['', Validators.required],
      year: [''],
      genres: [''],
      country_code: [''],
      directors: [''],
      actors: [''],
      format: [''],
      languages: [''],
      subtiles: [''],
      region: [''],
      aspect_ratio: [''],
      fsk: [''],
      studio: [''],
      release_date: [''],
      theatrical_release_date: [''],
      run_time: [''],
      ean: [''],
      upc: [''],
      isbn: [''],
      asin: [''],
      note: [''],
      private_note: [''],
      for_change: ['']
  });

  ngOnInit() {


      console.log(this.mediaTypes)

      if (this.mediaTypeService.mediaTypesList === null) {
          this.mediaTypesSubscribe = this.mediaTypeService.getMediaTypesList().subscribe(
              (data: Array<MediaType>) => {
                  this.mediaTypeService.mediaTypesList = data;
                  this.mediaTypes = data;
                  console.log(this.mediaTypes);
              },
              (error) => { console.log(error); }
          );
      }else {
          this.mediaTypes = this.mediaTypeService.mediaTypesList;
      }

      // @TODO: Use for form submit
      // let video = new Video();
      // video.user_id  = this.authService.auth.id;
      // video.title = 'New Movie';
      //   this.videoService.crateVideo(video).subscribe(
      //       (data) => console.log(data),
      //       (error) => console.log(error)
      //   );
  }

  ngOnDestroy() {
      if (this.mediaTypesSubscribe != null) {
          this.mediaTypesSubscribe.unsubscribe();
      }
  }

}
