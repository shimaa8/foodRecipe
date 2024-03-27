import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  userName = localStorage.getItem('userName');
  constructor(private _AuthService: AuthService) { }

  myLogout() {
    this._AuthService.logout()
  }
}
