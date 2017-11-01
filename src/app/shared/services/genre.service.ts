import { Injectable } from '@angular/core';
import {Genre} from "../class/genre";
import {RootService} from "./root.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GenreService {

  public genresList: Array<Genre> = null;

  constructor(
      private root: RootService,
      private http: HttpClient
  ) { }

    getGenresList() {
        return this.http.get(this.root.apiRoute + 'genre');
    }
}
