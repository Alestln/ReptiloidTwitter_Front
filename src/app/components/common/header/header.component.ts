import {Component} from '@angular/core';
import {UserService} from "../../../services/common/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public username: string | null;

  // TODO: Remove saving username from constructor
  constructor(private userService: UserService) {
    //this.userService.saveUsername('Alestln');
    this.username = this.userService.getUsername();
  }
}
