import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Video} from "../../../shared/class/video";
import {VideoService} from "../../../shared/services/video.service";
import {MediaType} from "../../../shared/class/media-type";
import {MediaTypeService} from "../../../shared/services/media-type.service";
import {GenreService} from "../../../shared/services/genre.service";
import {ConditionService} from "../../../shared/services/condition.service";
import {Condition} from "../../../shared/class/condition";
import {Country} from "../../../shared/class/country";
import {CountriesService} from "../../../shared/services/countries.service";

@Component({
  selector: 'vc-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit, OnDestroy {

  public mediaId: number = null;
  private mediaIdSubscribe: Subscription = null;
  public mediaTypes: Array<MediaType> = null;
  private mediaTypesSubscribe: Subscription = null;
  public mediaConditions: Array<Condition> = null;
  private mediaConditionsSubscription: Subscription = null;
  public personalMedia: Array<Video> = null;
  private personalMediaSubscribe: Subscription = null;
  public currentMedia: Video = null;
  public countries: Array<Country> = null;
  private countriesSubscribe: Subscription = null;

  constructor(
      private route: ActivatedRoute,
      private videoService: VideoService,
      private mediaTypeService: MediaTypeService,
      private genreService: GenreService,
      private conditionService: ConditionService,
      private countryService: CountriesService
  ) { }

  ngOnInit() {
    this.mediaIdSubscribe = this.route.params.subscribe(
        (params) => { this.mediaId = +params['mediaId']; }
        );
      if (this.videoService.personalCollection === null) {
          this.personalMediaSubscribe = this.videoService.catchPersonal().subscribe(
              (data: Array<Video>) => {
                  this.videoService.personalCollection = data;
                  this.personalMedia = data;
              },
              (error) => { console.log(error); });
      }else {
          this.personalMedia = this.videoService.personalCollection;
      }
      for (let m of this.personalMedia) {
          if (+(this.mediaId) === +(m.id)) {
            this.currentMedia = m;
          }
      }
      if (this.mediaTypeService.mediaTypesList === null) {
          this.mediaTypesSubscribe = this.mediaTypeService.getMediaTypesList().subscribe(
              (data: Array<MediaType>) => {
                  this.mediaTypeService.mediaTypesList = data;
                  this.mediaTypes = data;
              },
              (error) => { console.log(error); }
          );
      }else {
          this.mediaTypes = this.mediaTypeService.mediaTypesList;
      }
      if (this.conditionService.conditionsList === null) {
          this.mediaConditionsSubscription = this.conditionService.getConditionsList().subscribe(
              (data: Array<Condition>) => {
                  this.conditionService.conditionsList = data;
                  this.mediaConditions = data;
              },
              (error) => { console.log(error); }
          );
      }else {
          this.mediaConditions = this.conditionService.conditionsList;
      }
      if (this.countryService.countriesList === null) {
          this.countriesSubscribe = this.countryService.getCountriesList().subscribe(
              (data: Array<Country>) => {
                  this.countryService.countriesList = data;
                  this.countries = data;
              },
              (error) => { console.log(error); }
          );
      }else {
          this.countries = this.countryService.countriesList;
      }
    }


    getMediaTypeName(type_id = -1) {
        if (type_id != -1) {
            for (let mt of this.mediaTypes) {
                if (mt.id === type_id) {
                    return mt.name;
                }
            }
        }
    }

    getMediaConditionName(condition_id = -1) {
      if (condition_id != -1) {
          for (let mc of this.mediaConditions) {
              if (mc.id === condition_id) {
                  return mc.name;
              }
          }
      }
    }

    getGenres(genres) {
      if(genres != null) {
          let names: string = '';
          for (let g in genres) {
              if (genres[g].name) {
                  if (+(g) === 0) {
                      names += genres[g].name;
                  } else if (+(g) === 1) {
                      names += ', ' + genres[g].name;
                  } else if (+(g) === 2) {
                      names += ', ...';
                  }
              } else {
                  const genreList = this.genreService.genresList;
                  if (+(g) === 0) {
                      names += genreList[genres[g]];
                  } else if (+(g) === 1) {
                      names += ', ' + genreList[genres[g]];
                  } else if (+(g) === 2) {
                      names += ', ...';
                  }
              }

          }
          return names;
      } else {
          return '';
      }
    }

    getCountries(countries) {

      console.log(countries);

        if(countries != null) {
            let names: string = '';
            for (let c in countries) {
                if (countries[c].name) {
                    if (+(c) === 0) {
                        names += countries[c].name;
                    } else if (+(c) === 1) {
                        names += ', ' + countries[c].name;
                    } else if (+(c) === 2) {
                        names += ', ...';
                    }
                } else {
                    const countryList = this.countryService.countriesList;
                    if (+(c) === 0) {
                        names += countryList[countries[c]];
                    } else if (+(c) === 1) {
                        names += ', ' + countryList[countries[c]];
                    } else if (+(c) === 2) {
                        names += ', ...';
                    }
                }

            }
            return names;
        } else {
            return '';
        }
    }

  ngOnDestroy() {
    if (this.mediaIdSubscribe != null) {
      this.mediaIdSubscribe.unsubscribe();
    }
    if (this.personalMediaSubscribe != null) {
      this.personalMediaSubscribe.unsubscribe();
    }
    if (this.mediaTypesSubscribe != null) {
        this.mediaTypesSubscribe.unsubscribe();
    }
    if (this.mediaConditionsSubscription != null) {
        this.mediaConditionsSubscription.unsubscribe();
    }
    if (this.countriesSubscribe != null) {
        this.countriesSubscribe.unsubscribe();
    }
  }

}
