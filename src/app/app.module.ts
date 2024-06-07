import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import {NgOptimizedImage} from "@angular/common";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {HttpClientModule} from "@angular/common/http";
import { SignUpComponent } from './components/common/sign-up/sign-up.component';
import { TapeComponent } from './components/tape/tape.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SignInComponent } from './components/common/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserProfileComponent,
    SignUpComponent,
    TapeComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
