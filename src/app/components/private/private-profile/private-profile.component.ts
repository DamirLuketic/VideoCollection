import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth.service";
import { Auth } from "../../../shared/class/auth";
import { CountriesService } from "../../../shared/services/countries.service";
import {Country} from "../../../shared/class/country";

@Component({
  selector: 'vc-private-profile',
  templateUrl: './private-profile.component.html',
  styleUrls: ['./private-profile.component.css']
})
export class PrivateProfileComponent implements OnInit, OnDestroy {

    public countriesList: Country[] = null;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private countriesService: CountriesService
  ) { }

  private authData: Auth = this.authService.auth;
  public profileForm = this.formBuilder.group({
      name: [this.authData.name, Validators.required],
      email: [this.authData.email, Validators.required],
      isVisible: [+(this.authData.is_visible), Validators.required],
      country_code: [this.authData.country_code]
  });

  ngOnInit() {
    if (this.countriesService.countriesList == null) {
        this.countriesService.getCountriesList().subscribe(
            (data: Country[]) => {
                this.countriesService.countriesList = data;
                this.countriesList = data;
            }
        );
    }else {
        this.countriesList = this.countriesService.countriesList;
    }
  }

  submitProfile() {
    const formValue = this.profileForm.value;
  }

  ngOnDestroy(){

  }
}
