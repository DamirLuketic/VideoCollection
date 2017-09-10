import { Routes } from "@angular/router";
import { PrivateVideosComponent } from "./private-videos/private-videos.component";
import { PrivateProfileComponent } from "./private-profile/private-profile.component";

export const PRIVATE_ROUTES: Routes = [
    {path: '', redirectTo: 'videos', pathMatch: 'full'},
    {path: 'videos', component: PrivateVideosComponent},
    {path: 'profile', component: PrivateProfileComponent},
    {path: '**', redirectTo: 'videos', pathMatch: 'full'}
];