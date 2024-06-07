import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {SignUpComponent} from "./components/common/sign-up/sign-up.component";
import {TapeComponent} from "./components/tape/tape.component";
import {SignInComponent} from "./components/common/sign-in/sign-in.component";

const routes: Routes = [
  {
    path: 'user-profile',
    children: [
      {
        path: 'details/:id',
        component: UserProfileComponent
      }
    ]
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'tape',
    component: TapeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
