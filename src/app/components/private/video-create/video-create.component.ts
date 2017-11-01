import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoService } from "../../../shared/services/video.service";
import { MediaTypeService } from "../../../shared/services/media-type.service";
import {Video} from "../../../shared/class/video";
import {AuthService} from "../../../shared/services/auth.service";
import {MediaType} from "../../../shared/class/media-type";
import {Subscription} from "rxjs/Subscription";
import {FormBuilder, Validators} from "@angular/forms";
import {Condition} from "../../../shared/class/condition";
import {ConditionService} from "../../../shared/services/condition.service";
import { Select2OptionData } from "ng2-select2";
import {GenreService} from "../../../shared/services/genre.service";
import {Genre} from "../../../shared/class/genre";

@Component({
  selector: 'vc-video-create',
  templateUrl: './video-create.component.html',
  styleUrls: ['./video-create.component.css']
})
export class VideoCreateComponent implements OnInit, OnDestroy {

  public mediaTypes: Array<MediaType> = null;
  public conditions: Array<Condition> = null;
  private mediaTypesSubscribe: Subscription = null;
  private conditionsSubscribe: Subscription = null;

    /**
     * Genres list (through "Select2")
     * @type {any}
     */
  public genres: Array<Genre> = null;
  public genresSubscribe: Subscription = null;
  public genresData: Array<Select2OptionData> = [{id: '1', text: 'try 1'}, {'id': '2', text: 'try 2'}];
  public genresOptions: Select2Options = { multiple: true };
  public genresValues: Array<string>;

  constructor(
      private authService: AuthService,
      private videoService: VideoService,
      private mediaTypeService: MediaTypeService,
      private formBuilder: FormBuilder,
      private conditionService: ConditionService,
      private genreService: GenreService
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
      if (this.conditionService.conditionsList === null) {
          this.conditionsSubscribe = this.conditionService.getConditionsList().subscribe(
              (data: Array<Condition>) => {
                  this.conditionService.conditionsList = data;
                  this.conditions = data;
                  console.log(this.conditions);
              },
              (error) => { console.log(error); }
          );
      }else {
          this.conditions = this.conditionService.conditionsList;
      }
      if (this.genreService.genresList === null) {
          this.genresSubscribe = this.genreService.getGenresList().subscribe(
              (data: Array<Genre>) => {
                  this.genreService.genresList = data;
                  this.genres = data;
                  console.log(this.genres);
              },
              (error) => { console.log(error); }
          );
      }else {
          this.genres = this.genreService.genresList;
      }
      // Values for countries select 2
      setTimeout(() => {
          let genresTmp = [];
          for (let c in this.genres) {
              genresTmp.push({'id': c, 'text': this.genres[c]});
          }
          this.genresData = genresTmp;
          this.genresOptions = {
              multiple: true,
              // theme: 'classic',
              // closeOnSelect: true,
          };
      }, 300);

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
      if (this.conditionsSubscribe != null) {
          this.conditionsSubscribe.unsubscribe();
      }
      if (this.genresSubscribe != null) {
          this.genresSubscribe.unsubscribe();
      }
  }

}
