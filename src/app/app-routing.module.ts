import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserProfileComponent} from "./components/user-profile/user-profile.component";

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
