import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterAccount} from "../../../types/domain/account/RegisterAccount";
import {AuthenticationService} from "../../../services/common/authentication.service";
import {AuthenticationResponse} from "../../../types/common/authentication/AuthenticationResponse";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{
  private _entity: RegisterAccount | null;
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
        this.authenticationService.register(this._entity).subscribe({
          next: (response) => {
            console.log('Account created successfully:', response);
            this._authenticationResponse = response;
          },
          error: (error) => {
            console.error('Error creating account:', error);
          }
        })
      }
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    })
  }
}
