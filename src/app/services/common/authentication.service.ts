import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {RegisterAccount} from "../../types/domain/account/RegisterAccount";
import {Observable, tap} from "rxjs";
import {AuthenticationResponse} from "../../types/common/authentication/AuthenticationResponse";
import api_config from "../../../configs/api_config.json";
import {LoginAccount} from "../../types/common/authentication/LoginAccount";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _controllerPath: string = "Authentication/";
  private accessTokenTimeoutId: any;
  private refreshTokenTimeoutId: any;

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

  logoutFromAllDevices()  {
    return this.http.get<HttpResponse<any>>(`${api_config.baseHttpsUrl}${this._controllerPath}LogoutFromAllDevices`)
      .pipe(
        tap(() => {
          this.tokenService.clearTokens();
        })
      );
  }

  logout()  {
    const refreshToken = this.tokenService.getRefreshToken();
    return this.http.post(`${api_config.baseHttpsUrl}${this._controllerPath}Logout`, {refreshToken})
      .pipe(
        tap(
          () => {
            this.tokenService.clearTokens()
            clearTimeout(this.accessTokenTimeoutId);
            clearTimeout(this.refreshTokenTimeoutId);
          }
        )
      );
  }

  private refresh() {
    const refreshToken = this.tokenService.getRefreshToken();

    if (refreshToken) {
      return this.http.post<AuthenticationResponse>(`${api_config.baseHttpsUrl}${this._controllerPath}Refresh`, {refreshToken})
        .subscribe({
          next: (response) => {
            this.tokenService.setTokens(response);
            this.scheduleAccessToken();
            this.scheduleRefreshToken();
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
        this.accessTokenTimeoutId = setTimeout(() => {
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
        this.refreshTokenTimeoutId = setTimeout(() => {
          if (refreshToken){
            this.logout().subscribe();
          }
        }, timeUntilRefresh * 1000);
      } else {
        if (refreshToken){
          this.logout().subscribe();
        }
      }
    }
  }
}
