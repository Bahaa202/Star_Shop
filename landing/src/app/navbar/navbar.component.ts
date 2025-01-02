import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLogin: boolean = false;

  constructor(private _authService: AuthService) {
    _authService.loggedUser.subscribe({
      next: token => {
        _authService.loggedUser.getValue() !== null ? this.isLogin = true : this.isLogin = false;
      }
    })
  }

  logout() {
    this._authService.logout()
  }

}
