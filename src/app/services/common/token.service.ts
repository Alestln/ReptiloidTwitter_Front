import { Injectable } from '@angular/core';
import {AuthenticationResponse} from "../../types/common/authentication/AuthenticationResponse";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private refreshTokenExpiryKey = 'refresh_token_expiry';

  constructor() { }

  setTokens(tokens: AuthenticationResponse) {
    localStorage.setItem(this.accessTokenKey, tokens.accessToken);
    localStorage.setItem(this.refreshTokenKey, tokens.refreshToken);
    localStorage.setItem(this.refreshTokenExpiryKey, tokens.refreshTokenExpiration.toString());
  }

  getAccessToken() : string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken() : string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  getRefreshTokenExpiry(): number | null {
    const expiry = localStorage.getItem(this.refreshTokenExpiryKey);
    return expiry ? parseInt(expiry, 10) : null;
  }

  clearTokens() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.refreshTokenExpiryKey);
  }

  isRefreshTokenExpired(): boolean {
    const expiry = this.getRefreshTokenExpiry();
    return expiry ? new Date().getTime() / 1000 > expiry : true;
  }
}
