import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Video} from "../../../shared/class/video";
import {VideoService} from "../../../shared/services/video.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MediaType} from "../../../shared/class/media-type";
import {MediaTypeService} from "../../../shared/services/media-type.service";
import {Condition} from "../../../shared/class/condition";
import {ConditionService} from "../../../shared/services/condition.service";
import {Genre} from "../../../shared/class/genre";
import {GenreService} from "../../../shared/services/genre.service";
import {Country} from "../../../shared/class/country";
import {Select2OptionData} from "ng2-select2";
import {CountriesService} from "../../../shared/services/countries.service";

@Component({
  selector: 'vc-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit, OnDestroy {

  public mediaId: number = null;
  public currentMedia: Video = null;
  public mediaTypes: Array<MediaType> = null;
  public conditions: Array<Condition> = null;
  private mediaIdSubcribe: Subscription = null;
  private currentMediaSubscription: Subscription = null;
  private mediaTypesSubscribe: Subscription = null;
  private conditionsSubscribe: Subscription = null;

    public sectionMovie: boolean = true;
    public sectionMedia: boolean = false;
    public sectionCode: boolean = false;
    public sectionPrivate: boolean = false;

    public genres: Array<Genre> = null;
    private genresSubscribe: Subscription = null;
    public genresData: Array<Select2Options>;
    public genresOptions: Select2Options = { multiple: true };
    public selectedGenres: Array<string>;

    public countries: Array<Country> = null;
    private countriesSubscribe: Subscription = null;
    public countriesData: Array<Select2OptionData>;
    public countriesOptions: Select2Options;
    public selectedCountries: Array<string>;

  constructor(
      private route: ActivatedRoute,
      private videoService: VideoService,
      private formBuilder: FormBuilder,
      private mediaTypeService: MediaTypeService,
      private conditionService: ConditionService,
      private genreService: GenreService,
      private countryService: CountriesService
  ) { }

  ngOnInit() {
    this.mediaIdSubcribe = this.route.params.subscribe(
        (params) => { this.mediaId = +params['mediaId']; }
    );
    this.currentMediaSubscription = this.videoService.catchVideo(this.mediaId).subscribe(
        (video: Video) => { this.currentMedia = video; },
        (error) => { console.log(error); }
    );
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
                  },
              (error) => { console.log(error); }
          );
      }else {
          this.genres = this.genreService.genresList;
      }
      setTimeout(() => {
          let genresTmp = [];
          let selectedGenres: Array<number> = [];
          const genres = this.currentMedia.genres;
          console.log(genres);
          if (genres !== []) {
              for (let g of genres) {
                  if (typeof g === 'number') {
                      selectedGenres.push(g);
                  }
              }
          }
          for (let g in this.genres) {
              if (selectedGenres.indexOf(+g) == -1) {
                  genresTmp.push({'id': g, 'text': this.genres[g]});
              } else {
                  genresTmp.push({'id': g, 'text': this.genres[g], selected: true});
              }
          }
          this.genresData = genresTmp;
          this.genresOptions = {
              multiple: true,
              width: '100%'
          };
      }, 300);
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
      setTimeout(() => {
          let countriesTmp = [];
          let selectedCountries: Array<number> = [];
          const countries = this.currentMedia.countries;
          console.log(countries);
          if (countries !== []) {
              for (let c of countries) {
                  if (typeof c === 'number') {
                      selectedCountries.push(c);
                  }
              }
          }
          for (let c in this.countries) {
              if (selectedCountries.indexOf(+c) == -1) {
                  countriesTmp.push({'id': c, 'text': this.countries[c]});
              } else {
                  countriesTmp.push({'id': c, 'text': this.countries[c], selected: true});
              }
          }
          this.countriesData = countriesTmp;
          this.countriesOptions = {
              multiple: true,
              width: '100%'
          };
      }, 300);
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
