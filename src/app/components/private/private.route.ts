import { Routes } from "@angular/router";
import { PrivateVideosComponent } from "./private-videos/private-videos.component";
import { PrivateProfileComponent } from "./private-profile/private-profile.component";
import {VideoCreateComponent} from "./video-create/video-create.component";

export const PRIVATE_ROUTES: Routes = [
    {path: '', redirectTo: 'videos', pathMatch: 'full'},
    {path: 'videos', component: PrivateVideosComponent},
    {path: 'video/create', component: VideoCreateComponent},
    {path: 'profile', component: PrivateProfileComponent},
    {path: '**', redirectTo: 'videos', pathMatch: 'full'}
];