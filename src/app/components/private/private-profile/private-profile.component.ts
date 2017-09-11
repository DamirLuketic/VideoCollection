import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth.service";
import { Auth } from "../../../shared/class/auth";

@Component({
  selector: 'vc-private-profile',
  templateUrl: './private-profile.component.html',
  styleUrls: ['./private-profile.component.css']
})
export class PrivateProfileComponent implements OnInit {

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService
  ) { }

  private authData: Auth = this.authService.auth;
  public profileForm = this.formBuilder.group({
      name: [this.authData.name, Validators.required],
      email: [this.authData.email, Validators.required],
      isVisible: [+(this.authData.is_visible), Validators.required],
      countryId: [this.authData.country_id]
  });

  ngOnInit() {
      console.log(+(this.authData.is_visible));
  }

  submitProfile() {
    const formValue = this.profileForm.value;
  }
}
