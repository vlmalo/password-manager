import {Routes} from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {MainComponent} from "./pages/main/main.component";
import {RegisterComponent} from "./pages/register/register.component";
import {AuthGuard} from './services/auth.guard';


export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: MainComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];




