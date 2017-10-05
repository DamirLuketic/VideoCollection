import { Injectable } from '@angular/core';
import {MediaType} from "../class/media-type";
import {RootService} from "./root.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MediaTypeService {

    public mediaTypesList: Array<MediaType> = null;

    constructor(
        private root: RootService,
        private http: HttpClient
    ) { }

    getMediaTypesList() {
        return this.http.get(this.root.apiRoute + 'media_type');
    }
}
