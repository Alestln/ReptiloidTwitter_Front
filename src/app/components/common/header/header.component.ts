import {Component} from '@angular/core';
import {AuthenticationService} from "../../../services/common/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{

  isLoggedIn: boolean = false;
  username: string = "alex";
  accountId: string = "sdfjsdfsgjf";

  constructor(private authenticationService: AuthenticationService) {

  }

  logout() {
    this.authenticationService.logout().subscribe(() => {
      console.log("Logged out");
    })
  }
}
