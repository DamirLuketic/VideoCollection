import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
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
export class VideoEditComponent implements OnInit, OnDestroy, DoCheck {

  public msgInserted: boolean = false;

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

    public mediaTypeData: Array<Select2OptionData>;
    public mediaTypeOptions: Select2Options;
    public selectedMediaType;

    public conditionData: Array<Select2OptionData>;
    public conditionOptions: Select2Options;
    public selectedCondition: number;

    public editVideo = this.formBuilder.group({
        media_type_id: [''],
        condition_id: [''],
        title: ['' , Validators.required],
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
      setTimeout(() => {
          let mediaTypeTmp = [];
          let selectedMediaTypeId: number = this.currentMedia.media_type_id;
          const mediaTypes = this.mediaTypes;
          for (let mt of this.mediaTypes) {
              if (mt.id == selectedMediaTypeId) {
                  mediaTypeTmp.push({'id': mt.id, 'text': mt.name, selected: true});
              } else {
                  mediaTypeTmp.push({'id': mt.id, 'text': mt.name});
              }
          }
          this.mediaTypeData = mediaTypeTmp;
          this.mediaTypeOptions = {
              multiple: false,
              width: '100%',
          };
      }, 300);
      $('#select2MediaTypes').on("change", () => {
          let mediaTypeId: number;
          let result = $('#select2MediaTypes option:selected');
          for (let r in result) {
              if (result[r]['value'] !== undefined) {
                  mediaTypeId = result[r]['value'];
              }
          }
          this.selectedMediaType = mediaTypeId;
          console.log(this.selectedMediaType);
      });
      setTimeout(() => {
          let conditionsTmp = [];
          let selectedConditionId: number = this.currentMedia.condition_id;
          const conditions = this.conditions;
          for (let c of conditions) {
              if (c.id == selectedConditionId) {
                  conditionsTmp.push({'id': c.id, 'text': c.name, selected: true});
              } else {
                  conditionsTmp.push({'id': c.id, 'text': c.name});
              }
          }
          this.conditionData = conditionsTmp;
          this.conditionOptions = {
              multiple: false,
              width: '100%'
          };
      }, 300);
      $('#select2Conditions').on("change", () => {
          let conditionId: number;
          let result = $('#select2Conditions option:selected');
          for (let r in result) {
              if (result[r]['value'] !== undefined) {
                  conditionId = result[r]['value'];
              }
          }
          this.selectedCondition = conditionId;
      });
  }

    submitForm() {
        if (this.editVideo.value.title === '' || this.editVideo.value.title === null) {
            alert('Movie title required');
            this.openSection('sectionMovie');
        }else {
            let video: Video = this.editVideo.value;
            video.countries = this.selectedCountries;
            video.genres = this.selectedGenres;
            video.media_type_id = this.selectedMediaType;
            video.condition_id = this.selectedCondition;
            this.videoService.updateVideo(this.currentMedia.id, video).subscribe(
                (data) => {
                    console.log(data);
                    this.msgInserted = true;
                    this.videoService.personalCollection = null;
                },
                (error) => console.log(error)
            );
        }
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

    ngDoCheck() {
        if (this.msgInserted === true) {
            setTimeout(() => {
                this.msgInserted = false;
            }, 1200);
        }
        if (this.editVideo.value.title === '' || this.editVideo.value.title === null) {
            setTimeout(() => {
                this.editVideo.value.title = this.currentMedia.title;
            }, 500);
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
