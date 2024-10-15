import { Routes } from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {MainComponent} from "./pages/main/main.component";
import {RegisterComponent} from "./pages/register/register.component";

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: MainComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
