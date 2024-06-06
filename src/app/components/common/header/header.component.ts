import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public username: string | null;

  // TODO: Remove saving username from constructor
  constructor() {
    //this.userService.saveUsername('Alestln');
    this.username = null;
  }
}
