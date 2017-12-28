import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {AuthComponent} from "./components/auth/auth.component";
import {UsersComponent} from "./components/users/users.component";
import {VideosComponent} from "./components/videos/videos.component";
import {PrivateProfileComponent} from "./components/private/private-profile/private-profile.component";
import {PRIVATE_ROUTES} from "./components/private/private.route";
import {ViewComponent} from "./components/view/view.component";
import {AuthGuard} from "./shared/guards/auth-guard.service";

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'auth', component: AuthComponent},
    {path: 'users', component: UsersComponent},
    {path: 'videos', component: VideosComponent},
    {path: 'view/:mediaId', component: ViewComponent},
    {path: 'private', canActivate: [AuthGuard], children: PRIVATE_ROUTES},
    {path: '**', redirectTo: '/home', pathMatch: 'full'}
]

export const routes = RouterModule.forRoot(APP_ROUTES);