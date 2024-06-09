import {Component} from '@angular/core';
import {AuthenticationService} from "../../../services/common/authentication.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginAccount} from "../../../types/common/authentication/LoginAccount";
import {Router} from "@angular/router";
import {TokenService} from "../../../services/common/token.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent{
  private _entity: LoginAccount | null;
  form: FormGroup;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private tokenService: TokenService) {
    this._entity = null;

    this.form = formBuilder.group({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.form?.invalid) {
      return;
    }

    this._entity = this.form.value;
    if (this._entity !== null) {
      this.authenticationService.login(this._entity).subscribe({
        next: () => {
          const userId = this.tokenService.getUserId();
          if (userId){
            this.router.navigate(['user-profile', 'details', userId]);
          } else {
            throw new Error('UserId not found.');
          }
        },
        error: err => {
          this.error = 'Ошибка входа. Проверьте имя пользователя и пароль.';
        }
      })
    }
  }
}
