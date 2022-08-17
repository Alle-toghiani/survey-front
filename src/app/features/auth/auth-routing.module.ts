import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { RoutesEnum} from "@enums";

const routes: Routes = [
  { path: '', redirectTo: RoutesEnum.LOGIN, pathMatch: 'full' },
  { path: RoutesEnum.LOGIN, component: LoginComponent },
  { path: RoutesEnum.SIGNUP, component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
