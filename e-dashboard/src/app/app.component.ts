import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLogin = false;

  constructor(private _authService: AuthService) {
    this._authService.loggedUser.subscribe({
      next: res => {
        this._authService.loggedUser.getValue() !== null ? this.isLogin = true : this.isLogin = false;
      }
    });
  }

}
