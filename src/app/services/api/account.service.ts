import { Injectable } from '@angular/core';
import api_config from "../../../configs/api_config.json"
import {RegisterAccount} from "../../types/domain/account/RegisterAccount";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationResponse} from "../../types/common/authentication/AuthenticationResponse";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _controllerPath: string = "Account/";

  constructor(private http: HttpClient) { }

  create(account: RegisterAccount): Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`${api_config.baseHttpsUrl}${this._controllerPath}Create`, account);
  }
}
