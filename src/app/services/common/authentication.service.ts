import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterAccount} from "../../types/domain/account/RegisterAccount";
import {Observable} from "rxjs";
import {AuthenticationResponse} from "../../types/common/authentication/AuthenticationResponse";
import api_config from "../../../configs/api_config.json";
import {LoginAccount} from "../../types/domain/account/LoginAccount";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _controllerPath: string = "Authentication/";

  constructor(private http: HttpClient) { }

  register(account: RegisterAccount): Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`${api_config.baseHttpsUrl}${this._controllerPath}Register`, account);
  }

  login(loginRequest: LoginAccount) : Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`${api_config.baseHttpsUrl}${this._controllerPath}Login`, loginRequest);
  }
}
