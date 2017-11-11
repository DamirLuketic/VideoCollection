import { Component, OnInit, OnDestroy, ViewChild, ElementRef, DoCheck } from '@angular/core';
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
export class PrivateProfileComponent implements OnInit, OnDestroy, DoCheck {

    @ViewChild('select2Countries') select2Countries: ElementRef;

    public countriesList: Array<Country> = null;
    public countriesData: Array<Select2OptionData>;
    public countriesOptions: Select2Options;
    public userCountry: string = '';
    private getCountriesSubscription: Subscription = null;
    private updateSubscription: Subscription = null;
    public msgUpdated: boolean = false;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private countriesService: CountriesService,
  ) { }

  private authData: Auth = this.authService.auth;
  public profileForm = this.formBuilder.group({
      is_visible: [+(this.authData.is_visible), Validators.required],
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
            width: '100%'
        };
    }, 300);
      // JQuery patch for select 2
      $('#select2Countries').on("change", () => {
      this.userCountry = $("option:selected")[0]['value'];
      });

      /**
       // * TODO: After test use select2Countries "HTML Elements" instead id with JQuery / Implement ngOnChanges
       */
      //   let data = this.select2Countries['selector']['nativeElement']['options'];
      //
      // setTimeout(() => {
      //     this.userCountry = data[data['selectedIndex']]['value'];
      //     console.log(this.userCountry);
      // }, 350);
  }

  submitProfile() {
    let formValue = this.profileForm.value;
    formValue['country_code'] = this.userCountry;
    this.updateSubscription = this.authService.update(formValue).subscribe(
        (data: number) => {
            if (+(data) === 1) {
               this.msgUpdated = true;
               this.authService.auth.is_visible = formValue.is_visible;
               this.authService.auth.country_code = formValue.country_code;
               this.profileForm.value.is_visible = formValue.is_visible;
               this.profileForm.value.country_code = formValue.country_code;
            }
        },
        (error) => {
            console.log(error);
        }
    );
  }

    ngDoCheck() {
        if (this.msgUpdated === true) {
            setTimeout(() => {
                this.msgUpdated = false;
            }, 1200);
        }
    }

  ngOnDestroy() {
    if (this.getCountriesSubscription != null ) {
        this.getCountriesSubscription.unsubscribe();
    }
    if (this.updateSubscription != null ) {
        this.updateSubscription.unsubscribe();
    }
  }
}
