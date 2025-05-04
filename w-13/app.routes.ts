import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { provideRouter } from '@angular/router';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"profile",component:ProfileComponent}
];

export const Approuter = provideRouter(routes)
