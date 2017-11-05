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
import {Country} from "../../../shared/class/country";
import {CountriesService} from "../../../shared/services/countries.service";

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
  public genresData: Array<Select2OptionData>;
  public genresOptions: Select2Options = { multiple: true };

    /**
     * Countries list (through "Select2")
     * @type {any}
     */
  public countries: Array<Country> = null;
  public countriesSubscribe: Subscription = null;
  public countriesData: Array<Select2OptionData>;
  public countriesOptions: Select2Options;

  constructor(
      private authService: AuthService,
      private videoService: VideoService,
      private mediaTypeService: MediaTypeService,
      private formBuilder: FormBuilder,
      private conditionService: ConditionService,
      private genreService: GenreService,
      private countryService: CountriesService
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
      /**
       * Media types
       */
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
      /**
       * Conditions
       */
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
      /**
       * Genres
       */
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
      // Values for genres select 2
      setTimeout(() => {
          let genresTmp = [];
          for (let g in this.genres) {
              genresTmp.push({'id': g, 'text': this.genres[g]});
          }
          this.genresData = genresTmp;
          this.genresOptions = {
              multiple: true,
              // closeOnSelect: true,
              width: '100%'
          };
      }, 300);
      /**
       * Countries
       */
      if (this.countryService.countriesList === null) {
          this.countriesSubscribe = this.countryService.getCountriesList().subscribe(
          (data: Array<Country>) => {
              this.countryService.countriesList = data,
              this.countries = data,
              console.log(this.countries)
              },
              (error) => { console.log(error)}
          );
      }else {
          this.countries = this.countryService.countriesList;
      }
      // Values for countries select 2
      setTimeout(() => {
          let countriesTmp = [];
          for (let c in this.countries) {
              countriesTmp.push({'id': c, 'text': this.countries[c]});
          }
          this.countriesData = countriesTmp;
          this.countriesOptions = {
              multiple: true,
              // closeOnSelect: true,
              width: '100%'
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
