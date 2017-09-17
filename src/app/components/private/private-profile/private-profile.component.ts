import {Component, OnInit, OnDestroy, OnChanges, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth.service";
import { Auth } from "../../../shared/class/auth";
import { CountriesService } from "../../../shared/services/countries.service";
import { Country } from "../../../shared/class/country";
import { Select2OptionData } from "ng2-select2";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'vc-private-profile',
  templateUrl: './private-profile.component.html',
  styleUrls: ['./private-profile.component.css']
})
export class PrivateProfileComponent implements OnInit, OnDestroy {

    @ViewChild('select2Countries') select2Countries: HTMLElement;

    public countriesList: Country[] = null;
    private getCountriesSubscription: Subscription = null;
    public countriesData: Array<Select2OptionData>;
    public countriesOptions: Select2Options;
    public userCountry: string = '';

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private countriesService: CountriesService,
  ) { }

  private authData: Auth = this.authService.auth;
  public profileForm = this.formBuilder.group({
      name: [this.authData.name, Validators.required],
      email: [this.authData.email, Validators.required],
      isVisible: [+(this.authData.is_visible), Validators.required],
      country_code: [this.userCountry]
  });

  ngOnInit() {
      this.userCountry = this.authService.auth.country_code;
    if (this.countriesService.countriesList == null) {
        this.getCountriesSubscription = this.countriesService.getCountriesList().subscribe(
            (data: Country[]) => {
                this.countriesService.countriesList = data;
                this.countriesList = data;
            }
        );
    }else {
        this.countriesList = this.countriesService.countriesList;
    }
    // Values for countries select 2
    setTimeout(() => {
        let countriesTmp = [];
        for (let c in this.countriesList) {
                countriesTmp.push({'id': c, 'text': this.countriesList[c]});
        }
        this.countriesData = countriesTmp;
        this.countriesOptions = {
            multiple: false,
            theme: 'classic',
            closeOnSelect: true,
        };
    }, 300);
      // JQuery patch for select 2
      $('#select2Countries').on("change", () => {
      this.userCountry = $("option:selected")[0]['value'];
      });

      /**
       * TODO: After test use select2Countries "HTML Elements" instead id with JQuery
       */
    // let data = this.test2['selector']['nativeElement']['options'];
    //
    //   this.test2.onchange(function () {
    //       this.userCountry = data[data['selectedIndex']]['value'];
    //   });
    //
    //   setTimeout(() => {
    //       // this.userCountry = data[data['selectedIndex']]['value'];
    //       console.log(this.userCountry);
    //   }, 350);
  }

  submitProfile() {
    const formValue = this.profileForm.value;
  }

  ngOnDestroy() {
    if (this.getCountriesSubscription != null ) {
        this.getCountriesSubscription.unsubscribe();
    }
  }
}
