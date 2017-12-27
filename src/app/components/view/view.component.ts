import {Component, OnDestroy, OnInit} from '@angular/core';
import {Video} from "../../shared/class/video";
import {Condition} from "../../shared/class/condition";
import {ConditionService} from "../../shared/services/condition.service";
import {Subscription} from "rxjs/Subscription";
import {MediaType} from "../../shared/class/media-type";
import {VideoService} from "../../shared/services/video.service";
import {CountriesService} from "../../shared/services/countries.service";
import {MediaTypeService} from "../../shared/services/media-type.service";
import {Country} from "../../shared/class/country";
import {GenreService} from "../../shared/services/genre.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'vc-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {

    public mediaId: number = null;
    private mediaIdSubscribe: Subscription = null;
    public mediaTypes: Array<MediaType> = null;
    private mediaTypesSubscribe: Subscription = null;
    public mediaConditions: Array<Condition> = null;
    private mediaConditionsSubscription: Subscription = null;
    public collection: Array<Video> = null;
    private collectionSubscribe: Subscription = null;
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
        if (this.videoService.videoCollection === null) {
            this.collectionSubscribe = this.videoService.catchVideos().subscribe(
                (data: Array<Video>) => {
                    this.videoService.videoCollection = data;
                    this.collection = data;
                },
                (error) => { console.log(error); });
        }else {
            this.collection = this.videoService.videoCollection;
        }
        setTimeout(() => {
            for (let c of this.collection) {
                if (+(this.mediaId) === +(c.id)) {
                    this.currentMedia = c;
                }
            }
        }, 500);
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
        if (this.collectionSubscribe != null) {
            this.collectionSubscribe.unsubscribe();
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
