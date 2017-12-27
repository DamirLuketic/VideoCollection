import { Component, OnInit, OnDestroy } from '@angular/core';
import {VideoService} from "../../shared/services/video.service";
import {MediaTypeService} from "../../shared/services/media-type.service";
import {GenreService} from "../../shared/services/genre.service";
import {MediaType} from "../../shared/class/media-type";
import {Video} from "../../shared/class/video";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'vc-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit, OnDestroy {

    public videoCollection: Array<Video> = null;
    public mediaTypes: Array<MediaType> = null;
    private videoCollectionSubscribe: Subscription = null;
    private mediaTypesSubscribe: Subscription = null;

  constructor(
      private videoService: VideoService,
      private mediaTypeService: MediaTypeService,
      private genreService: GenreService
  ) { }

  ngOnInit() {
      if (this.videoService.videoCollection === null) {
          this.videoCollectionSubscribe = this.videoService.catchVideos().subscribe(
              (data: Array<Video>) => {
                  this.videoService.videoCollection = data;
                  this.videoCollection = data;
                  console.log(this.videoCollection);
              },
              (error) => { console.log(error); });
      }else {
          this.videoCollection = this.videoService.videoCollection;
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
      console.log(this.videoCollection);
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

    ngOnDestroy() {
        if (this.videoCollectionSubscribe != null) {
            this.videoCollectionSubscribe.unsubscribe();
        }
        if (this.mediaTypesSubscribe != null) {
            this.mediaTypesSubscribe.unsubscribe();
        }
    }
}
