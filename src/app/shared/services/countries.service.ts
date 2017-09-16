import { Injectable } from '@angular/core';
import { Country } from '../class/country';
import { HttpClient } from "@angular/common/http";
import { RootService } from "./root.service";

@Injectable()
export class CountriesService {

  public countriesList: Country[] = null;

  constructor(
      private root: RootService,
      private http: HttpClient
  ) { }

  getCountriesList() {
    return this.http.get(this.root.apiRoute + 'country');
  }
}
