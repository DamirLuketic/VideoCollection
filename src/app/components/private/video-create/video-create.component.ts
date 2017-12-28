import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
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
export class VideoCreateComponent implements OnInit, OnDestroy, DoCheck {

  public msgInserted: boolean = false;

  public mediaTypes: Array<MediaType> = null;
  public conditions: Array<Condition> = null;
  private mediaTypesSubscribe: Subscription = null;
  private conditionsSubscribe: Subscription = null;

  public sectionMovie: boolean = true;
  public sectionMedia: boolean = false;
  public sectionCode: boolean = false;
  public sectionPrivate: boolean = false;

    /**
     * Genres list (through "Select2")
     * @type {any}
     */
  public genres: Array<Genre> = null;
  public genresSubscribe: Subscription = null;
  public genresData: Array<Select2OptionData>;
  public genresOptions: Select2Options = { multiple: true };
  public selectedGenres: Array<string>;

    /**
     * Countries list (through "Select2")
     * @type {any}
     */
  public countries: Array<Country> = null;
  private countriesSubscribe: Subscription = null;
  public countriesData: Array<Select2OptionData>;
  public countriesOptions: Select2Options;
  public selectedCountries: Array<string>;

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
      media_languages: [''],
      price: ['']
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
      // JQuery patch for select 2
      $('#select2Genres').on("change", () => {
          let genresID = [];
          let result = $('#select2Genres option:selected');
          for (let r in result) {
              if (result[r]['value'] !== undefined) {
                  genresID.push(result[r]['value']);
              }
          }
          this.selectedGenres = genresID;
      });
      /**
       * Countries
       */
      if (this.countryService.countriesList === null) {
          this.countriesSubscribe = this.countryService.getCountriesList().subscribe(
          (data: Array<Country>) => {
              this.countryService.countriesList = data,
              this.countries = data,
              console.log(this.countries);
              },
              (error) => { console.log(error); }
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
      // JQuery patch for select 2
      $('#select2Countries').on("change", () => {
          let countriesCode = [];
          let result = $('#select2Countries option:selected');
          for (let r in result) {
              if (result[r]['value'] !== undefined) {
                  countriesCode.push(result[r]['value']);
              }
          }
          this.selectedCountries = countriesCode;
      });
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

   submitForm() {
        if (this.createVideo.value.title === '' || this.createVideo.value.title === null) {
          alert('Movie title required');
          this.openSection('sectionMovie');
        }else {
            let video: Video = this.createVideo.value;
            video.countries = this.selectedCountries;
            video.genres = this.selectedGenres;
            this.videoService.crateVideo(video).subscribe(
                (data) => {
                    console.log(data),
                    this.msgInserted = true;
                    $('#select2Countries option:selected').remove();
                    $('#select2Genres option:selected').remove();
                    this.selectedGenres = null;
                    this.selectedCountries = null;
                    this.openSection('sectionMovie');
                    this.createVideo.reset({user_id: this.authService.auth.id});
                    this.videoService.personalCollection = null;
                },
                (error) => console.log(error)
            );
        }
   }

    ngDoCheck() {
        if (this.msgInserted === true) {
            setTimeout(() => {
                this.msgInserted = false;
            }, 1200);
        }
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
      if (this.countriesSubscribe != null) {
          this.countriesSubscribe.unsubscribe();
      }
  }

}
