import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoService } from "../../../shared/services/video.service";
import { Video } from "../../../shared/class/video";
import { Subscription } from "rxjs/Subscription";
import {MediaTypeService} from "../../../shared/services/media-type.service";
import {MediaType} from "../../../shared/class/media-type";
import {split} from "ts-node/dist";
import {GenreService} from "../../../shared/services/genre.service";

@Component({
  selector: 'vc-private-videos',
  templateUrl: './private-videos.component.html',
  styleUrls: ['./private-videos.component.css']
})
export class PrivateVideosComponent implements OnInit, OnDestroy {

  public personalCollection: Array<Video> = null;
  public mediaTypes: Array<MediaType> = null;
  private personalCollectionSubscribe: Subscription = null;
  private mediaTypesSubscribe: Subscription = null;
  private deleteVideoSubscribe: Subscription = null;

  constructor(
      private videoService: VideoService,
      private mediaTypeService: MediaTypeService,
      private genreService: GenreService
  ) { }

  ngOnInit() {
    if (this.videoService.personalCollection === null) {
        this.personalCollectionSubscribe = this.videoService.catchPersonal().subscribe(
            (data: Array<Video>) => {
              this.videoService.personalCollection = data;
              this.personalCollection = data;
              console.log(this.personalCollection);
            },
            (error) => { console.log(error); });
    }else {
        this.personalCollection = this.videoService.personalCollection;
    }
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
  }

  getMediaTypeName(type_id = null) {
      if (type_id != null) {
          for (let mt of this.mediaTypes) {
              if (mt.id === type_id) {
                  return mt.name;
              }
          }
      }
    }

  getGenres(genres) {
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
  }

  deleteVideo(video) {
      const answer = confirm('Are you sure?');
      if (answer) {
          this.deleteVideoSubscribe = this.videoService.deleteVideo(video.id).subscribe(
              (data: string) => {
                  const personalVideos = this.videoService.personalCollection;
                  const currentIndex = personalVideos.indexOf(video);
                  personalVideos.splice(currentIndex, 1);
                  this.personalCollection = this.videoService.personalCollection;
              },
              (error) => { console.log(error); }
          );
      }
  }

  ngOnDestroy() {
    if (this.personalCollectionSubscribe != null) {
        this.personalCollectionSubscribe.unsubscribe();
    }
    if (this.mediaTypesSubscribe != null) {
        this.mediaTypesSubscribe.unsubscribe();
    }
    if (this.deleteVideoSubscribe != null) {
        this.deleteVideoSubscribe.unsubscribe();
    }
  }
}
