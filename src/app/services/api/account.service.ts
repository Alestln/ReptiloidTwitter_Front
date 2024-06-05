import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import api_config from "../../../configs/api_config.json"

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _controllerPath: string = 'Account/'

  constructor() { }

}
