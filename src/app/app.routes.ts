import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {AuthComponent} from "./components/auth/auth.component";
import {UsersComponent} from "./components/users/users.component";
import {VideosComponent} from "./components/videos/videos.component";

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'auth', component: AuthComponent},
    {path: 'users', component: UsersComponent},
    {path: 'videos', component: VideosComponent},
    {path: '**', redirectTo: '/home', pathMatch: 'full'}
]

export const routes = RouterModule.forRoot(APP_ROUTES);