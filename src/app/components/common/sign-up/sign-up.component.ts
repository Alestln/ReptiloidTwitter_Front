import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterAccount} from "../../../types/domain/account/RegisterAccount";
import {AccountService} from "../../../services/api/account.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{
  private _entity: RegisterAccount | null;
  form: FormGroup | null;

  constructor(private accountService: AccountService) {
    this._entity = null;
    this.form = null;
  }

  onSubmit(): void {
    if (this.form && this.form.valid) {
      this._entity = this.form.value;
      if (this._entity !== null) {
        this.accountService.create(this._entity).subscribe({
          next: (response) => {
            console.log('Account created successfully:', response);
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
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }
}
