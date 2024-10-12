import { Routes } from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {MainComponent} from "./pages/main/main.component";
import {RegisterComponent} from "./pages/register/register.component";

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterComponent}
  // +authorization



];
