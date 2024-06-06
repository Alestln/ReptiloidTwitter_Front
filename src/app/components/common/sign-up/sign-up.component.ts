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
  private readonly _entity: RegisterAccount | null;
  form: FormGroup | null;

  constructor(private accountService: AccountService) {
    this._entity = null;
    this.form = null;
  }

  onSubmit(): void {
    if (this._entity && this.form) {
      this._entity.username = this.form.get('username')?.value;
      this._entity.password = this.form.get('password')?.value;
      this._entity.email = this.form.get('email')?.value;

      const a = this.accountService.create(this._entity);
      console.log(a);
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(this._entity?.username, [Validators.required]),
      password: new FormControl(this._entity?.password, [Validators.required]),
      email: new FormControl(this._entity?.email, [Validators.required, Validators.email])
    })
  }
}
