import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterAccount} from "../../../types/domain/account/RegisterAccount";
import {AuthenticationService} from "../../../services/common/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  private _entity: RegisterAccount | null;
  form: FormGroup;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) {
    this._entity = null;

    this.form = formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this._entity = this.form.value;
    if (this._entity !== null) {
      this.authenticationService.register(this._entity).subscribe({
        next: () => {
          this.router.navigate(['sign-in']);
        },
        error: err => {
          this.error = 'Ошибка регистрации. Попробуйте еще раз.';
        }
      })
    }
  }
}
