import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  role: string = '';
  loggedUser: any;

  constructor(private _router: Router, private _authService: AuthService) {
    this.loggedUser = _authService.loggedUser.getValue();
    this.role = this.loggedUser.role;
  }

  logout() {
    this._authService.logout();
  }

}
