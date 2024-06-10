import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/common/authentication.service";
import {Router} from "@angular/router";
import {TokenService} from "../../../services/common/token.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  isLoggedIn: boolean = false;
  username: string | null = null;
  accountId: string | null = null;

  constructor(
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.updateLoggedInStatus();
  }

  updateLoggedInStatus(): void {
    this.authenticationService.isLoggedIn$.subscribe((value: boolean) => {
      this.isLoggedIn = value;
      this.getUsernameAndAccountId();
      return;
    });

    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    if (this.isLoggedIn) {
      this.getUsernameAndAccountId();
    }
  }

  getUsernameAndAccountId(): void {
    const username = this.tokenService.getUsername();
    const accountId = this.tokenService.getUserId();

    if (username && accountId){
      this.username = username;
      this.accountId = accountId;
    }
  }

  logout() {
    this.authenticationService.logout().subscribe(() => {
      this.router.navigate(['tape']);
    });
  }
}
