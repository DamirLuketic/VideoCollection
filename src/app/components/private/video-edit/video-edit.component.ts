import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Video} from "../../../shared/class/video";
import {VideoService} from "../../../shared/services/video.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'vc-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit, OnDestroy {

  public mediaId: number = null;
  public currentMedia: Video = null;
  private mediaIdSubcribe: Subscription = null;
  private currentMediaSubscription: Subscription = null;

    public sectionMovie: boolean = true;
    public sectionMedia: boolean = false;
    public sectionCode: boolean = false;
    public sectionPrivate: boolean = false;

  constructor(
      private route: ActivatedRoute,
      private videoService: VideoService,
      private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.mediaIdSubcribe = this.route.params.subscribe(
        (params) => { this.mediaId = +params['mediaId']; }
    );
    this.currentMediaSubscription = this.videoService.catchVideo(this.mediaId).subscribe(
        (video: Video) => { this.currentMedia = video; },
        (error) => { console.log(error); }
    );
  }

  public editVideo = this.formBuilder.group({
        media_type_id: [''],
        condition_id: [''],
        title: ['', Validators.required],
        year: [''],
        genres: [''],
        country_code: [],
        directors: [''],
        actors: [''],
        format: [''],
        languages: [''],
        subtitles: [''],
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
        for_change: [''],
        media_languages: ['']
    });


    submitForm() {
     //
    }

    openSection(section) {
        switch (section) {
            case 'sectionMovie':
                this.sectionMovie = true;
                this.sectionMedia = false;
                this.sectionCode = false;
                this.sectionPrivate = false;
                break;
            case 'sectionMedia':
                this.sectionMovie = false;
                this.sectionMedia = true;
                this.sectionCode = false;
                this.sectionPrivate = false;
                break;
            case 'sectionCode':
                this.sectionMovie = false;
                this.sectionMedia = false;
                this.sectionCode = true;
                this.sectionPrivate = false;
                break;
            case 'sectionPrivate':
                this.sectionMovie = false;
                this.sectionMedia = false;
                this.sectionCode = false;
                this.sectionPrivate = true;
                break;
        }
    }

  ngOnDestroy() {
    if (this.mediaIdSubcribe != null) {
      this.mediaIdSubcribe.unsubscribe();
    }
    if (this.currentMediaSubscription != null) {
      this.currentMediaSubscription.unsubscribe();
    }
  }

}
