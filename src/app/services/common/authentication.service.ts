import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {RegisterAccount} from "../../types/domain/account/RegisterAccount";
import {interval, Observable, of, switchMap, tap} from "rxjs";
import {AuthenticationResponse} from "../../types/common/authentication/AuthenticationResponse";
import api_config from "../../../configs/api_config.json";
import {LoginAccount} from "../../types/common/authentication/LoginAccount";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _controllerPath: string = "Authentication/";

  constructor(private http: HttpClient, private tokenService: TokenService)
  {
    this.scheduleTokenRefresh();
  }

  register(account: RegisterAccount): Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`${api_config.baseHttpsUrl}${this._controllerPath}Register`, account);
  }

  login(loginRequest: LoginAccount) : Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`${api_config.baseHttpsUrl}${this._controllerPath}Login`, loginRequest)
      .pipe(
        tap((response: AuthenticationResponse) => {
          this.tokenService.setTokens(response);
          this.scheduleTokenRefresh();
        })
      );
  }

  logout() : Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(`${api_config.baseHttpsUrl}${this._controllerPath}Logout`)
      .pipe(
        tap(() => {
          this.tokenService.clearTokens()
        })
      );
  }

  refreshTokens(): Observable<void> {
    const refreshToken = this.tokenService.getRefreshToken();

    if (refreshToken) {
      return this.http.post<AuthenticationResponse>(`${api_config.baseHttpsUrl}${this._controllerPath}Refresh`, { refreshToken })
        .pipe(
          tap(response => {
            this.tokenService.setTokens(response);
          }),
          // switchMap для преобразования в Observable<void>
          switchMap(() => of(undefined))
        );
    } else {
      // Возвращаем Observable с undefined, если refreshToken отсутствует
      return of(undefined);
    }
  }

  private scheduleTokenRefresh() {
    const refreshTokenExpiry = this.tokenService.getRefreshTokenExpiry();
    if (refreshTokenExpiry) {
      const expiryInMilliseconds = (refreshTokenExpiry - new Date().getTime() / 1000) * 1000;
      const refreshInterval = expiryInMilliseconds - 60000; // Обновление за минуту до истечения

      interval(refreshInterval)
        .pipe(
          switchMap(() => this.refreshTokens())
        ).subscribe();
    }
  }
}
