import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/common/authentication.service";
import {AuthenticationResponse} from "../../../types/common/authentication/AuthenticationResponse";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginAccount} from "../../../types/domain/account/LoginAccount";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{
  private _entity: LoginAccount | null;
  private _authenticationResponse: AuthenticationResponse | null;
  form: FormGroup | null;

  constructor(private authenticationService: AuthenticationService) {
    this._entity = null;
    this.form = null;
    this._authenticationResponse = null;
  }

  onSubmit(): void {
    if (this.form && this.form.valid) {
      this._entity = this.form.value;
      if (this._entity !== null) {
        this.authenticationService.login(this._entity).subscribe({
          next: (response) => {
            console.log("Login successfully\n", response)
          },
          error: (error) => {
            console.error("Error while login: ", error)
          }
        })
      }
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
}
