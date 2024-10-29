import {Routes} from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {MainComponent} from "./pages/main/main.component";
import {RegisterComponent} from "./pages/register/register.component";
import {AuthGuard} from './services/auth.guard';
import {AuthRedirectGuard} from './services/AuthRedirectGuard';


export const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [AuthRedirectGuard]  },
  { path: 'register', component: RegisterComponent, canActivate: [AuthRedirectGuard]  },
  { path: 'dashboard', component: MainComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];




