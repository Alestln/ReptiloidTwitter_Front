import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {RegisterAccount} from "../../types/domain/account/RegisterAccount";
import {Observable, tap} from "rxjs";
import {AuthenticationResponse} from "../../types/common/authentication/AuthenticationResponse";
import api_config from "../../../configs/api_config.json";
import {LoginAccount} from "../../types/common/authentication/LoginAccount";
import {TokenService} from "./token.service";
import {Token} from "../../types/common/authentication/Token";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _controllerPath: string = "Authentication/";

  constructor(private http: HttpClient, private tokenService: TokenService)
  {
    if (tokenService.getAccessToken() && tokenService.getRefreshToken()){
      this.scheduleAccessToken();
      this.scheduleRefreshToken();
    }
  }

  register(account: RegisterAccount): Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`${api_config.baseHttpsUrl}${this._controllerPath}Register`, account);
  }

  login(loginRequest: LoginAccount) : Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`${api_config.baseHttpsUrl}${this._controllerPath}Login`, loginRequest)
      .pipe(
        tap((response: AuthenticationResponse) => {
          this.tokenService.setTokens(response);
          this.scheduleAccessToken();
          this.scheduleRefreshToken();
        })
      );
  }

  logout()  {
    return this.http.get<HttpResponse<any>>(`${api_config.baseHttpsUrl}${this._controllerPath}Logout`)
      .pipe(
        tap(() => {
          this.tokenService.clearTokens()
        })
      );
  }

  deleteRefreshToken(refreshToken: string)  {
    this.http.post(`${api_config.baseHttpsUrl}${this._controllerPath}DeleteRefreshToken`, {refreshToken})
      .subscribe(() => this.tokenService.clearTokens());
  }

  private refresh() {
    const refreshToken = this.tokenService.getRefreshToken();

    if (refreshToken) {
      return this.http.post<Token>(`${api_config.baseHttpsUrl}${this._controllerPath}Refresh`, {refreshToken})
        .subscribe({
          next: (response) => {
            this.tokenService.updateAccessToken(response);
            this.scheduleAccessToken();
          },
          error: (err) => {
            this.tokenService.clearTokens();
          }
        });
    } else {
      throw new Error('Refresh token is null.');
    }
  }

  private scheduleAccessToken(){
    const accessExpiry = this.tokenService.getAccessTokenExpiry();

    if (accessExpiry) {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilRefresh = accessExpiry - currentTime;

      if (timeUntilRefresh > 0) {
        setTimeout(() => {
          this.refresh();
        }, timeUntilRefresh * 1000);
      } else {
        this.refresh();
      }
    }
  }

  private scheduleRefreshToken() {
    const refreshExpiry = this.tokenService.getRefreshTokenExpiry();

    if (refreshExpiry) {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilRefresh = refreshExpiry - currentTime;
      const refreshToken = this.tokenService.getRefreshToken();

      if (timeUntilRefresh > 0) {
        setTimeout(() => {
          if (refreshToken){
            console.log("Start delete")
            this.deleteRefreshToken(refreshToken);
          }
        }, timeUntilRefresh * 1000);
      } else {
        if (refreshToken){
          this.deleteRefreshToken(refreshToken);
        }
      }
    }
  }
}
