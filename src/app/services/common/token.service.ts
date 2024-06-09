import {Injectable} from '@angular/core';
import {AuthenticationResponse} from "../../types/common/authentication/AuthenticationResponse";
import {Token} from "../../types/common/authentication/Token";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private userIdClaimCode = 'sub';
  private usernameClaimCode = 'unique_name';

  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private accessTokenExpiryKey = 'access_token_expiry';
  private refreshTokenExpiryKey = 'refresh_token_expiry';

  constructor() { }

  setTokens(tokens: AuthenticationResponse) {
    localStorage.setItem(this.accessTokenKey, tokens.accessToken);
    localStorage.setItem(this.refreshTokenKey, tokens.refreshToken);
    localStorage.setItem(this.accessTokenExpiryKey, tokens.accessTokenExpiration.toString());
    localStorage.setItem(this.refreshTokenExpiryKey, tokens.refreshTokenExpiration.toString());
  }

  getAccessToken() : string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken() : string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  getAccessTokenExpiry(): number | null {
    const expiry = localStorage.getItem(this.accessTokenExpiryKey);
    return expiry ? parseInt(expiry, 10) : null;
  }

  getRefreshTokenExpiry(): number | null {
    const expiry = localStorage.getItem(this.refreshTokenExpiryKey);
    return expiry ? parseInt(expiry, 10) : null;
  }

  updateAccessToken(token: Token) {
    localStorage.setItem(this.accessTokenKey, token.token);
    localStorage.setItem(this.accessTokenExpiryKey, token.expires.toString());
  }

  clearTokens() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.accessTokenExpiryKey);
    localStorage.removeItem(this.refreshTokenExpiryKey);

    window.location.reload();
  }

  getUsername(): string | null {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      return null;
    }

    const payloadBase64 = accessToken.split('.')[1];
    const payloadJson = JSON.parse(atob(payloadBase64));

    return payloadJson[this.usernameClaimCode];
  }

  getUserId(): string | null {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      return null;
    }

    const payloadBase64 = accessToken.split('.')[1];
    const payloadJson = JSON.parse(atob(payloadBase64));

    return payloadJson[this.userIdClaimCode];
  }
}
