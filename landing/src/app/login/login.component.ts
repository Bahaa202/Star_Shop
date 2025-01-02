import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  })

  login(formData: FormGroup) {
    this._authService.login(formData.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this._authService.saveLogin();
        this._router.navigate(['/home'])
      },
      error: err => {
        alert(err.error.message);
      }
    })
  }

}
