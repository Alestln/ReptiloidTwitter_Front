import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import api_config from "../../../configs/api_config.json"
import {UserProfileInfo} from "../../types/domain/user-profile/UserProfileInfo";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private _controllerPath: string = 'UserProfile/'

  constructor(private http: HttpClient) { }

  getUserProfileInfo(id: string): Observable<UserProfileInfo>{
    return this.http.get<UserProfileInfo>(`${api_config.baseHttpsUrl}${this._controllerPath}GetInfo/${id}`);
  }
}
