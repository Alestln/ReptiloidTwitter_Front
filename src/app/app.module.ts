import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import {NgOptimizedImage} from "@angular/common";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SignUpComponent } from './components/common/sign-up/sign-up.component';
import { TapeComponent } from './components/tape/tape.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SignInComponent } from './components/common/sign-in/sign-in.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { UserPostListComponent } from './components/post/user-post-list/user-post-list.component';
import { UserPhotoListComponent } from './components/photo/user-photo-list/user-photo-list.component';
import { FriendListComponent } from './components/friends/friend-list/friend-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserProfileComponent,
    SignUpComponent,
    TapeComponent,
    SignInComponent,
    UserPostListComponent,
    UserPhotoListComponent,
    FriendListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
