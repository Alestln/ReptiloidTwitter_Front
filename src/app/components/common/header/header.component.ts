import {Component} from '@angular/core';
import {AuthenticationService} from "../../../services/common/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public username: string | null;
  public accountId: string | null;

  // TODO: Remove saving username from constructor
  constructor(private authenticationService: AuthenticationService) {
    //this.userService.saveUsername('Alestln');
    this.username = "alestln";
    this.username = null;
    this.accountId = "7c0096cb-d315-4b02-978b-ac43b49a99ff";
  }

  logout() {
    this.authenticationService.logout().subscribe((response) => {
      console.log("Logout successful")
    })
  }
}
