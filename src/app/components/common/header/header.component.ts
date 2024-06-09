import {Component} from '@angular/core';
import {AuthenticationService} from "../../../services/common/authentication.service";
import {TokenService} from "../../../services/common/token.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public username: string | null;
  public accountId: string | null;

  constructor(private authenticationService: AuthenticationService, private tokenService: TokenService) {
    this.username = tokenService.getUsername();
    this.accountId = tokenService.getUserId();
  }

  logout() {
    this.authenticationService.logout().subscribe(() => {
      window.location.reload();
    })
  }
}
